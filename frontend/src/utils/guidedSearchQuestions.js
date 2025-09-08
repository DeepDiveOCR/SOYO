const questions = {
  "steps": {
    "1": {
      "id": "who",
      "text": "누구와 함께 가시나요?",
      "options": [
        { "value": "alone", "text": "혼자", "icon": "👤", "nextStep": 2 },
        { "value": "two", "text": "두명", "icon": "🧑‍🤝‍🧑", "nextStep": "1a" },
        { "value": "3-4", "text": "3~4명", "icon": "👨‍👩‍👧", "nextStep": "1b" },
        { "value": "group", "text": "단체", "icon": "🏢", "nextStep": "1c" }
      ]
    },
    "1a": {
      "id": "two_relation",
      "isDynamic": true,
      "text": "어떤 관계인가요?",
      "options": [
        { "value": "couple", "text": "연인", "icon": "❤️", "nextStep": 2 },
        { "value": "friend", "text": "친구", "icon": "😊", "nextStep": 2 },
        { "value": "child", "text": "자녀", "icon": "👶", "nextStep": 2 },
        { "value": "business", "text": "비즈니스", "icon": "💼", "nextStep": 2 }
      ]
    },
    "1b": {
      "id": "small_group_relation",
      "isDynamic": true,
      "text": "어떤 관계인가요?",
      "options": [
        { "value": "family", "text": "가족", "icon": "👨‍👩‍👧‍👦", "nextStep": 2 },
        { "value": "friends", "text": "친구", "icon": "😊", "nextStep": 2 },
        { "value": "business", "text": "비즈니스", "icon": "💼", "nextStep": 2 }
      ]
    },
    "1c": {
      "id": "group_type",
      "isDynamic": true,
      "text": "어떤 종류의 단체인가요?",
      "options": [
        { "value": "club", "text": "동호회/동아리", "icon": "🎨", "nextStep": 2 },
        { "value": "friends_gathering", "text": "친구모임", "icon": "🎉", "nextStep": 2 },
        { "value": "field_trip", "text": "현장학습", "icon": "🚌", "nextStep": 2 },
        { "value": "business_group", "text": "비즈니스", "icon": "💼", "nextStep": 2 }
      ]
    },
    "2": {
      "id": "category",
      "text": "무엇을 하시나요?",
      "options": [
        { "value": "food", "text": "음식", "icon": "🍔", "nextStep": 3 },
        { "value": "event", "text": "행사", "icon": "🎉", "nextStep": 100 },
        { "value": "tourist_spot", "text": "관광지", "icon": "🏞️", "nextStep": 200 }
      ]
    },
    "3": {
      "id": "food_consideration",
      "text": "가장 중요하게 생각하는 것은 무엇인가요?",
      "options": [
        { "value": "value_for_money", "text": "가성비", "icon": "💰", "nextStep": 4 },
        { "value": "guaranteed_taste", "text": "맛이 확실", "icon": "👍", "nextStep": 4 },
        { "value": "unique_menu", "text": "메뉴가 특이", "icon": "✨", "nextStep": 4 }
      ]
    },
    "4": {
      "id": "food_type",
      "text": "어떤 종류의 음식을 원하시나요?",
      "options": [
        { "value": "meal", "text": "식사", "icon": "🍚", "nextStep": 5 },
        { "value": "cafe", "text": "카페/디저트", "icon": "☕", "nextStep": 20 },
        { "value": "pub", "text": "요리주점", "icon": "🍻", "nextStep": 30 }
      ]
    },
    "5": {
      "id": "meal_cuisine",
      "text": "어떤 나라의 요리를 원하세요?",
      "options": [
        { "value": "korean", "text": "한식", "nextStep": 6 },
        { "value": "japanese", "text": "일식", "nextStep": 6 },
        { "value": "chinese", "text": "중식", "nextStep": 6 },
        { "value": "western", "text": "양식", "nextStep": 6 },
        { "value": "asian", "text": "아시안", "nextStep": 6 },
        { "value": "other_cuisine", "text": "기타", "nextStep": 6 }
      ]
    },
    "6": {
      "id": "meal_dish_type",
      "text": "어떤 종류의 요리를 원하세요?",
      "options": [
        { "value": "meat", "text": "육류/고기 요리", "nextStep": 7 },
        { "value": "seafood", "text": "해물/생선 요리", "nextStep": 7 },
        { "value": "soup", "text": "국물/전골 요리", "nextStep": 7 },
        { "value": "noodles", "text": "면 요리", "nextStep": 7 },
        { "value": "vegetarian", "text": "채식/비건/샐러드", "nextStep": 7 }
      ]
    },
    "7": {
      "id": "meal_time",
      "text": "식사 시간은 언젠가요?",
      "options": [
        { "value": "breakfast", "text": "아침", "nextStep": 8 },
        { "value": "lunch", "text": "점심", "nextStep": 8 },
        { "value": "dinner", "text": "저녁", "nextStep": 8 },
        { "value": "late_night", "text": "야식", "nextStep": 8 }
      ]
    },
    "20": {
      "id": "cafe_type",
      "text": "어떤 종류의 카페를 찾으세요?",
      "options": [
        { "value": "coffee_specialist", "text": "커피 맛집", "nextStep": 21 },
        { "value": "dessert_specialist", "text": "디저트 전문", "nextStep": 21 },
        { "value": "bakery_cafe", "text": "베이커리 카페", "nextStep": 21 },
        { "value": "tea_house", "text": "전통 찻집", "nextStep": 21 }
      ]
    },
    "21": {
      "id": "cafe_atmosphere",
      "text": "선호하는 분위기나 특별한 기준이 있나요?",
      "options": [
        { "value": "photo_worthy", "text": "감성/사진 찍기 좋은 곳", "nextStep": 999 },
        { "value": "good_view", "text": "야외/뷰가 좋은 곳", "nextStep": 999 },
        { "value": "good_music", "text": "음악이 좋은 곳", "nextStep": 999 },
        { "value": "private_room", "text": "룸/프라이빗한 공간", "nextStep": 999 }
      ]
    },
    "30": {
      "id": "pub_type",
      "text": "어떤 종류의 주점을 찾으세요?",
      "options": [
        { "value": "traditional_pub", "text": "전통주/막걸리", "nextStep": 31 },
        { "value": "craft_beer", "text": "수제 맥주/펍", "nextStep": 31 },
        { "value": "wine_bar", "text": "와인바", "nextStep": 31 },
        { "value": "cocktail_bar", "text": "칵테일/위스키바", "nextStep": 31 },
        { "value": "izakaya", "text": "사케/이자카야", "nextStep": 31 },
        { "value": "hof_soju", "text": "일반 호프/소주", "nextStep": 31 }
      ]
    },
    "31": {
      "id": "pub_food",
      "text": "어떤 종류의 안주를 선호하세요?",
      "options": [
        { "value": "western_food", "text": "양식 기반", "nextStep": 32 },
        { "value": "korean_food", "text": "한식 기반", "nextStep": 32 },
        { "value": "japanese_food", "text": "일식 기반", "nextStep": 32 },
        { "value": "simple_anju", "text": "간단한 안주", "nextStep": 32 },
        { "value": "fusion_anju", "text": "퓨전/창작 요리", "nextStep": 32 }
      ]
    },
    "32": {
      "id": "pub_atmosphere",
      "text": "선호하는 분위기나 특별한 기준이 있나요?",
      "options": [
        { "value": "photo_worthy", "text": "감성/사진 찍기 좋은 곳", "nextStep": 999 },
        { "value": "good_view", "text": "야외/뷰가 좋은 곳", "nextStep": 999 },
        { "value": "good_music", "text": "음악이 좋은 곳", "nextStep": 999 },
        { "value": "private_room", "text": "룸/프라이빗한 공간", "nextStep": 999 }
      ]
    },
    "100": {
      "id": "event_location",
      "text": "실내 활동과 야외 활동 중 무엇을 선호하세요?",
      "options": [
        { "value": "indoor", "text": "실내", "nextStep": 101 },
        { "value": "outdoor", "text": "야외", "nextStep": 101 }
      ]
    },
    "101": {
      "id": "event_type",
      "text": "어떤 종류의 행사를 찾으시나요?",
      "options": [
        { "value": "performance", "text": "단일 공연", "nextStep": 102 },
        { "value": "festival", "text": "복합 축제", "nextStep": 102 },
        { "value": "exhibition", "text": "전시 / 박람회", "nextStep": 102 },
        { "value": "tour", "text": "투어 / 탐방", "nextStep": 102 },
        { "value": "class", "text": "클래스 / 체험", "nextStep": 102 }
      ]
    },
    "102": {
      "id": "event_atmosphere",
      "text": "어떤 분위기의 행사를 선호하세요?",
      "options": [
        { "value": "crowded", "text": "군중 밀도 높고 축제감성", "nextStep": 999 },
        { "value": "calm", "text": "차분·힐링형", "nextStep": 999 },
        { "value": "photo_worthy", "text": "감성/사진 촬영", "nextStep": 999 },
        { "value": "any", "text": "상관없음", "nextStep": 999 }
      ]
    },
    "200": {
      "id": "spot_type",
      "text": "어떤 종류의 관광지를 원하세요?",
      "options": [
        { "value": "nature", "text": "자연 / 경관 / 힐링", "nextStep": 201 },
        { "value": "exhibition", "text": "전시 / 관람", "nextStep": 210 },
        { "value": "leports", "text": "레포츠 / 액티비티", "nextStep": 220 },
        { "value": "themepark", "text": "테마파크 / 엔터테인먼트", "nextStep": 230 }
      ]
    },
    "201": {
      "id": "nature_type",
      "text": "어떤 자연 환경을 선호하세요?",
      "options": [
        { "value": "mountain", "text": "산 / 숲 / 공원", "nextStep": 202 },
        { "value": "sea", "text": "바다 / 해변", "nextStep": 203 },
        { "value": "camping", "text": "캠핑", "nextStep": 204 },
        { "value": "river", "text": "강 / 호수", "nextStep": 205 }
      ]
    },
    "202": {
      "id": "mountain_activity",
      "text": "어떤 경험을 원하시나요?",
      "options": [
        { "value": "hiking", "text": "등산·트레킹", "nextStep": 999 },
        { "value": "park_viewing", "text": "국립공원·수목원 관람", "nextStep": 999 },
        { "value": "city_park", "text": "도시공원 산책·운동", "nextStep": 999 },
        { "value": "valley", "text": "계곡·폭포 감상", "nextStep": 999 }
      ]
    },
    "203": {
      "id": "sea_activity",
      "text": "해변에서 어떤 활동을 즐기고 싶으신가요?",
      "options": [
        { "value": "walk_drive", "text": "산책·드라이브·경치 감상", "nextStep": 999 },
        { "value": "marine_sports", "text": "수영·서핑 등 해양 스포츠", "nextStep": 999 },
        { "value": "sunrise_night", "text": "일출·야경 감상", "nextStep": 999 }
      ]
    },
    "204": {
      "id": "camping_style",
      "text": "어떤 스타일의 캠핑을 원하시나요?",
      "options": [
        { "value": "campground", "text": "캠핑장·휴양림 야영", "nextStep": 999 },
        { "value": "glamping", "text": "불멍·별보기 감성 캠핑", "nextStep": 999 }
      ]
    },
    "205": {
      "id": "river_activity",
      "text": "강/호수에서 무엇을 하고 싶으신가요?",
      "options": [
        { "value": "water_play", "text": "물놀이·수상 레저", "nextStep": 999 },
        { "value": "walk_bike", "text": "강변 산책·자전거", "nextStep": 999 },
        { "value": "scenery", "text": "경치 감상", "nextStep": 999 }
      ]
    },
    "210": {
      "id": "exhibition_type",
      "text": "어떤 종류의 장소를 찾으세요?",
      "options": [
        { "value": "museum", "text": "박물관 / 기념관", "nextStep": 211 },
        { "value": "art_gallery", "text": "미술관 / 갤러리", "nextStep": 212 },
        { "value": "palace", "text": "고궁 / 성곽 / 유적지", "nextStep": 999 },
        { "value": "hanok_village", "text": "한옥마을 / 민속촌", "nextStep": 999 }
      ]
    },
    "211": {
      "id": "museum_subject",
      "text": "어떤 주제의 박물관을 원하세요?",
      "options": [
        { "value": "history", "text": "역사", "nextStep": 999 },
        { "value": "science", "text": "과학", "nextStep": 999 },
        { "value": "person", "text": "인물", "nextStep": 999 },
        { "value": "art_culture", "text": "예술/문화", "nextStep": 999 }
      ]
    },
    "212": {
      "id": "gallery_type",
      "text": "어떤 종류의 예술을 선호하세요?",
      "options": [
        { "value": "classic_art", "text": "고전/근대 미술", "nextStep": 999 },
        { "value": "modern_art", "text": "현대 미술", "nextStep": 999 },
        { "value": "photo_design", "text": "사진/디자인", "nextStep": 999 }
      ]
    },
    "220": {
      "id": "leports_type",
      "text": "어떤 종류의 레포츠/액티비티를 원하세요?",
      "options": [
        { "value": "water", "text": "수상 레포츠", "nextStep": 999 },
        { "value": "land", "text": "육상 레포츠", "nextStep": 999 },
        { "value": "winter", "text": "겨울 레포츠", "nextStep": 999 },
        { "value": "air", "text": "항공 레포츠", "nextStep": 999 }
      ]
    },
    "230": {
      "id": "themepark_location",
      "text": "실내와 실외 중 어디를 선호하세요?",
      "options": [
        { "value": "indoor", "text": "실내", "nextStep": 231 },
        { "value": "outdoor", "text": "실외", "nextStep": 231 }
      ]
    },
    "231": {
      "id": "themepark_type",
      "text": "어떤 종류의 장소를 찾으세요?",
      "options": [
        { "value": "themepark_amusement", "text": "테마파크 / 놀이공원", "nextStep": 999 },
        { "value": "aquarium_zoo", "text": "아쿠아리움 / 동물원", "nextStep": 999 },
        { "value": "observatory", "text": "전망대 / 타워", "nextStep": 999 },
        { "value": "shopping_mall", "text": "대형 쇼핑몰 / 복합 문화 공간", "nextStep": 232 },
        { "value": "waterpark", "text": "워터파크", "nextStep": 999 }
      ]
    },
    "232": {
      "id": "mall_purpose",
      "text": "주요 목적은 무엇인가요?",
      "options": [
        { "value": "shopping", "text": "쇼핑", "nextStep": 999 },
        { "value": "food", "text": "맛집 / 카페", "nextStep": 999 },
        { "value": "events", "text": "전시 / 이벤트", "nextStep": 999 }
      ]
    },
    "999": {
      "id": "region",
      "text": "어느 지역에서 찾으시나요?",
      "isRegion": true,
      "options": []
    }
  }
}