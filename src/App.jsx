// src/App.jsx
import "./App.css";
import { mockData } from "./data/MockData";

import ResponsiveAppBar from "./mui/Toolbar.jsx";
import BookList from "./mui/BookList.jsx";
import Regist from "./mui/Regist.jsx";
import MainPage from "./mui/MainPage.jsx";  // 필요 없다면 지워도 됨
import Edit from "./mui/Edit.jsx";
import Detail from "./mui/Detail.jsx";
import Login from "./mui/Login.jsx";
import SignUp from "./mui/SignUp.jsx";

import { Routes, Route} from "react-router-dom";

function App() {
    return (
        <>
            {/* 상단 네비게이션 바 */}
            <ResponsiveAppBar/>

            {/* URL에 따라 여기 내용이 바뀜 */}
            <Routes>
                {/* 기본 메인 페이지 (원하면 BookList로 두거나 MainPage로 바꿔도 됨) */}
                <Route path="/" element={<MainPage/>} />

                {/* 도서 목록 페이지 */}
                <Route path="/books" element={<BookList posts={mockData} />} />

                {/* 새 도서 등록 페이지 */}
                <Route path="/register" element={<Regist/>} />

                {/* 도서 수정 페이지 */}
                <Route path="/edit/:id" element={<Edit book={mockData[0]}/>} />

                {/* 도서 세부 정보 페이지 */}
                <Route path="/details/:id" element={<Detail/>} />

                {/*로그인 페이지*/}
                <Route path="/login" element={<Login/>} />

                {/*회원가입 페이지*/}
                <Route path="/signup" element={<SignUp/>} />

            </Routes>
        </>
    );
}

export default App;
