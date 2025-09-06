from fastapi import APIRouter, HTTPException, Request
import httpx
import hashlib
from config.database import get_db
from services.gemini_service import correct_text_with_gemini
from routes.firebase_routes import map_language_fields # 기존 매핑 함수 재사용

router = APIRouter(prefix="/api/recommend", tags=["recommend"])

@router.post("/search")
async def search_recommendations(request: Request):
    """
    시맨틱 검색, Firestore 조회, Gemini 검증을 통합한 추천 API
    """
    try:
        req_data = await request.json()
        uid = req_data.get("uid")
        query = req_data.get("query", "")
        region = req_data.get("region")
        category = req_data.get("category")
        user_language = req_data.get("userLanguage", "ko")

        if not all([uid, query, region, category]):
            raise HTTPException(status_code=400, detail="필수 파라미터가 누락되었습니다: uid, query, region, category")

        # 1. Pinecone 서비스 호출하여 ID 목록 가져오기
        async with httpx.AsyncClient() as client:
            pinecone_response = await client.post(
                "http://localhost:5002/search",
                json={"uid": uid, "query": query, "region": region, "category": category},
                timeout=30.0
            )
            pinecone_response.raise_for_status() # 오류 발생 시 예외 처리
            pinecone_results = pinecone_response.json().get("data", [])

        if not pinecone_results:
            return {"success": True, "data": []}

        # 2. ID 목록을 기반으로 Firestore에서 데이터 조회 및 검증
        db = get_db()
        processed_results = []

        for item in pinecone_results:
            content_id = item.get("id")
            item_region = item.get("region")
            item_category = item.get("category")

            if not all([content_id, item_region, item_category]):
                continue

            # Firestore에서 문서 조회 (언어 fallback 로직 포함)
            doc_ref = None
            doc = None
            search_langs = [user_language] if user_language == 'ko' else [user_language, 'ko']
            
            found_lang = None
            for lang in search_langs:
                collection_path = db.collection('api_data').document(lang).collection(item_region).document(item_category).collection('items')
                query_result = collection_path.where('contentid', '==', content_id).limit(1).get()
                if query_result:
                    doc = query_result[0]
                    doc_ref = doc.reference
                    found_lang = lang
                    break
            
            if not doc or not doc.exists:
                continue

            data = doc.to_dict()

            # 3. Gemini 텍스트 검증 (해시 비교)
            summary_field = 'overview' if found_lang == 'ko' else 'summary'
            hash_field = f"{summary_field}_hash"

            summary_text = data.get(summary_field, "")
            stored_hash = data.get(hash_field)
            current_hash = hashlib.sha256(summary_text.encode('utf-8')).hexdigest()

            if current_hash != stored_hash:
                print(f"LOG: [VERIFY_REVIEW] Hash mismatch for doc '{doc.id}'. Triggering Gemini verification.")
                corrected_text = await correct_text_with_gemini(summary_text)
                
                if corrected_text != summary_text:
                    new_hash = hashlib.sha256(corrected_text.encode('utf-8')).hexdigest()
                    # DB 업데이트
                    print(f"LOG: [VERIFY_REVIEW] Updating Firestore doc '{doc.id}' with corrected text.")
                    doc_ref.update({
                        summary_field: corrected_text,
                        hash_field: new_hash
                    })
                    data[summary_field] = corrected_text # 로컬 데이터도 업데이트

            # 4. 프론트엔드용 데이터로 최종 매핑
            db_path = doc_ref.path
            mapped_data = map_language_fields(data, found_lang, db_path)
            processed_results.append(mapped_data)

        return {"success": True, "data": processed_results}

    except httpx.TimeoutException:
        raise HTTPException(status_code=504, detail="추천 서비스(Pinecone) 응답 시간 초과")
    except httpx.ConnectError:
        raise HTTPException(status_code=503, detail="추천 서비스(Pinecone)에 연결할 수 없습니다")
    except httpx.HTTPStatusError as e:
        raise HTTPException(status_code=e.response.status_code, detail=f"추천 서비스(Pinecone) 오류: {e.response.text}")
    except Exception as e:
        # 로깅을 위해 실제 운영 환경에서는 print 대신 logging 라이브러리 사용을 권장합니다.
        print(f"An unexpected error occurred in /search: {e}")
        raise HTTPException(status_code=500, detail=f"요청 처리 중 서버에서 오류가 발생했습니다: {str(e)}")