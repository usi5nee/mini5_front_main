
// src/pages/MainPage.jsx

export default function MainPage({ posts }) {
    // posts가 잘 들어왔는지 확인용
    console.log("✅ MainPage posts:", posts);

    const list = posts.map((post) => (
            <div>
                <h3>
                    {post.id} : {post.title}
                </h3>
                <p>저자 : {post.author}</p>
            </div>
    ));

    return (
        <div style={{ padding: "20px" }}>
            <h1>도서 목록</h1>
            {posts.length === 0 ? <p>등록된 도서가 없습니다.</p> : list}
        </div>
    );
}
