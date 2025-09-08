from fastapi import APIRouter, HTTPException
import httpx
import os
from firebase_admin import firestore

router = APIRouter(prefix="/api/translate", tags=["translate"])

@router.post("/")
async def translate_text(request: dict):
    """
    텍스트를 번역하는 API
    """
    try:
        text = request.get("text", "")
        target_language = request.get("target_language", "ko")
        uid = request.get("uid", "system")
        
        # 프론트엔드에서 source_lang을 직접 주는 경우 그 값을 사용하고,
        # 그렇지 않으면 Firestore에서 조회합니다.
        source_language = request.get("source_lang")
        if not source_language and uid != "system":
            try:
                db = firestore.client()
                user_doc = db.collection('users').document(uid).get()
                if user_doc.exists:
                    source_language = user_doc.to_dict().get('lang', 'ko')
                else:
                    source_language = 'ko' # DB에 사용자 정보가 없으면 기본값 사용
            except Exception as e:
                print(f"Warning: Firestore에서 사용자 언어 조회 실패 - {str(e)}")
                source_language = 'ko' # 오류 발생 시 기본값 사용
        elif not source_language:
            source_language = 'ko' # uid가 없을 경우 기본값

        # 번역 서비스 API 호출
        async with httpx.AsyncClient() as client:
            response = await client.post(
                "http://localhost:5001/translate",
                json={
                    "uid": uid,
                    "text": text,
                    "source_lang": source_language,
                    "target_lang": target_language
                },
                timeout=30.0
            )
            
            result = response.json()
            if response.status_code == 200:
                return {
                    "success": True,
                    "translated_text": result.get("translate", text)
                }
            else:
                error_detail = result.get("error", f"번역 서비스 오류: {response.status_code}")
                raise HTTPException(
                    status_code=response.status_code, 
                    detail=error_detail
                )
                
    except httpx.TimeoutException:
        raise HTTPException(status_code=504, detail="번역 서비스 응답 시간 초과")
    except httpx.ConnectError:
        raise HTTPException(status_code=503, detail="번역 서비스에 연결할 수 없습니다")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"번역 중 오류 발생: {str(e)}")

from services.gemini_service import translate_place_name_with_gemini

@router.post("/place-name")
async def translate_place_name_endpoint(request: dict):
    """
    장소명을 공식 외국어 명칭으로 번역하는 API
    """
    try:
        place_name = request.get("place_name")
        target_language = request.get("target_language") # e.g., 'en', 'jp', 'zh'

        if not all([place_name, target_language]):
            raise HTTPException(status_code=400, detail="place_name과 target_language가 필요합니다")

        print(f"LOG: [TRANSLATE_API] Received request to translate '{place_name}' to '{target_language}'")

        translated_name = await translate_place_name_with_gemini(place_name, target_language)

        print(f"LOG: [TRANSLATE_API] Translation result: '{translated_name}'")

        return {
            "success": True,
            "original_name": place_name,
            "translated_name": translated_name
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"장소명 번역 중 오류 발생: {str(e)}")
