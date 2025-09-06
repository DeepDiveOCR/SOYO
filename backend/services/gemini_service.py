import httpx
import os

async def correct_text_with_gemini(text_to_correct: str) -> str:
    """
    Gemini API를 사용하여 텍스트의 한자 지명을 교정하는 함수
    """
    if not text_to_correct:
        return ""

    gemini_api_key = os.getenv("GEMINI_API_KEY")
    if not gemini_api_key:
        print("LOG: [GEMINI_SERVICE] Warning: GEMINI_API_KEY is not set. Skipping text correction.")
        return text_to_correct

    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key={gemini_api_key}"
    
    prompt = f"""
    다음 텍스트에서, '한국의 지명이나 인명 등 고유 명사'에 해당하는 한자(漢字) 단어를 찾아, 해당 단어가 중국어나 일본어식 표기일 경우 한국에서 사용하는 공식 한자 표기법으로 수정해 주세요.
    - 만약 한국식 표기가 맞다면 절대 수정하지 마세요.
    - 고유 명사가 아닌 다른 내용은 절대 수정하지 마세요.
    - 수정할 한자 단어가 없다면, 원본 텍스트를 그대로 반환해야 합니다.
    - 최종 결과는 수정된 텍스트만 간결하게 반환해 주세요.

    텍스트: "{text_to_correct}"
    """

    payload = {
        "contents": [{
            "parts": [{
                "text": prompt
            }]
        }],
        "generationConfig": {
            "temperature": 0.2,
            "topP": 1,
            "topK": 32,
            "maxOutputTokens": 4096,
        }
    }

    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(url, json=payload, timeout=30.0)
            
            if response.status_code == 200:
                result = response.json()
                candidates = result.get('candidates', [])
                if candidates:
                    content = candidates[0].get('content', {})
                    parts = content.get('parts', [])
                    if parts:
                        corrected_text = parts[0].get('text', text_to_correct).strip()
                        if corrected_text != text_to_correct:
                            print(f"LOG: [GEMINI_SERVICE] Text corrected: '{text_to_correct[:30]}...' -> '{corrected_text[:30]}...'")
                        return corrected_text
                return text_to_correct
            else:
                print(f"LOG: [GEMINI_SERVICE] Error: Correction API failed with status {response.status_code}. Response: {response.text}")
                return text_to_correct

    except Exception as e:
        print(f"LOG: [GEMINI_SERVICE] Error: An unexpected error occurred during text correction: {e}")
        return text_to_correct


async def translate_place_name_with_gemini(place_name: str, target_language: str) -> str:
    """
    Gemini API를 사용하여 장소명을 공식 외국어 명칭으로 번역하는 함수
    """
    if not all([place_name, target_language]):
        return ""

    gemini_api_key = os.getenv("GEMINI_API_KEY")
    if not gemini_api_key:
        print("LOG: [GEMINI_SERVICE] Warning: GEMINI_API_KEY is not set. Skipping translation.")
        return place_name

    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key={gemini_api_key}"
    
    lang_map = {
        "en": "영어",
        "jp": "일본어",
        "zh": "중국어"
    }
    target_lang_ko = lang_map.get(target_language, target_language)

    prompt = f"""다음 한국의 장소명을 {target_lang_ko}의 공식 외국어 명칭으로 번역해줘. 다른 설명 없이 번역된 장소명만 정확하게 반환해줘. 장소명: {place_name}"""

    payload = {
        "contents": [{
            "parts": [{
                "text": prompt
            }]
        }],
        "generationConfig": {
            "temperature": 0.1,
            "topP": 1,
            "topK": 1,
            "maxOutputTokens": 100,
        }
    }

    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(url, json=payload, timeout=20.0)
            if response.status_code == 200:
                result = response.json()
                candidates = result.get('candidates', [])
                if candidates:
                    content = candidates[0].get('content', {})
                    parts = content.get('parts', [])
                    if parts:
                        translated_name = parts[0].get('text', place_name).strip()
                        print(f"LOG: [GEMINI_SERVICE] Translated '{place_name}' to '{target_lang_ko}': '{translated_name}'")
                        return translated_name
                return place_name
            else:
                print(f"LOG: [GEMINI_SERVICE] Error: Translation API failed with status {response.status_code}. Response: {response.text}")
                return place_name
    except Exception as e:
        print(f"LOG: [GEMINI_SERVICE] Error: An unexpected error occurred during translation: {e}")
        return place_name