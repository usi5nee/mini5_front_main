# 📚 도서 관리 웹 애플리케이션 (React + Vite + MUI)

React, Vite, Material UI 기반으로 구현한 도서 관리 웹 서비스입니다.  
도서 등록·조회·수정·삭제 기능을 제공하며 OpenAI 이미지 생성 API를 활용한 AI 도서 표지 생성 기능을 포함합니다.

---

## 🚀 주요 기능

### ✔ 도서 CRUD 기능
- 도서 목록 조회
- 도서 상세 정보 확인
- 도서 등록
- 도서 수정
- 도서 삭제

### ✔ AI 기반 도서 표지 자동 생성
- 사용자가 모델 선택 (dall-e-2 / dall-e-3)
- 도서 제목 + 내용을 기반으로 프롬프트 생성
- 생성된 이미지 URL을 도서 데이터에 저장

### ✔ MUI 기반 UI
- 상단 AppBar 네비게이션
- 카드형 도서 리스트
- 페이지네이션
- 반응형 UI

---

## 📂 프로젝트 구조
```
src/
│── App.jsx
│── App.css
│── index.css
│── main.jsx
│
├── mui/
│ ├── MainPage.jsx
│ ├── BookList.jsx
│ ├── Regist.jsx
│ ├── Edit.jsx
│ ├── Detail.jsx
│ └── toolbar.jsx
```


---

## 🔗 라우팅 구조

| 경로 | 컴포넌트 | 설명 |
|------|------------|--------|
| `/` | MainPage | 메인 페이지 |
| `/books` | BookList | 도서 목록 조회 |
| `/register` | Regist | 도서 등록 |
| `/edit/:id` | Edit | 도서 수정 |
| `/details/:id` | Detail | 도서 상세 + 표지 생성 |

---

## 🧩 기능 상세 설명

### 📌 메인 페이지 (MainPage)
- 간단한 소개 화면
- 도서 목록 및 도서 등록으로 이동하는 버튼 제공

---

### 📌 도서 목록 페이지 (BookList)
- 서버에서 도서 목록을 페이지 단위로 조회  
  GET http://localhost:8080/api/books?page={page}&size=5

- 제목 검색
- 페이지네이션
- 각 도서 카드를 클릭하면 상세 페이지로 이동

---

### 📌 도서 등록 페이지 (Regist)
- 제목 / 저자 / 내용 입력 후 등록
- 유효성 검사 및 로딩 표시 포함

요청 예시:

```
json
POST /api/books
{
    "title": "책 제목",
    "author": "저자",
    "content": "내용"
}
```

### 📌 도서 수정 페이지 (Edit)

- 기존 도서 정보를 가져와서 수정

- 수정 후 PUT 요청으로 저장

```
PUT /api/books/{id}
{
  "title": "",
  "author": "",
  "content": "",
  "image_url": ""
}
```

### 📌 도서 상세 페이지 + AI 표지 생성 (Detail)

- 도서 상세 정보 조회

- 삭제 기능 제공

- OpenAI 이미지 생성 API 활용

```
POST https://api.openai.com/v1/images/generations
{
  "model": "dall-e-2",
  "prompt": "책 제목과 내용 기반으로 일러스트 생성"
}
```
| 분류                 | 기술                  |
| ------------------ | ------------------- |
| Frontend Framework | React (Vite)        |
| UI 라이브러리           | Material UI (MUI)   |
| HTTP 통신            | Axios               |
| 스타일링               | CSS, MUI Components |
| AI 이미지             | OpenAI Images API   |
