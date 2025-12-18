import React, { useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import {
    Typography,
    Box,
    TextField,
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    Grid,
    Button,
    Pagination,
    Stack
} from "@mui/material";

export default function BookList() {

    const [currentPosts, setCurrentPosts] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(1);    // 1페이지부터 시작
    const [searchTerm, setSearchTerm] = useState("");

    // 검색어로 필터링된 도서 목록
    const filteredPosts = currentPosts.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        async function load() {
            try {
                console.log("페이지: ",page)
                const res = await axios.get(`http://localhost:8080/api/books?page=${page-1}&size=5`);
                setCurrentPosts(res.data.data);        // 리스트
                setTotalPages(res.data.totalPages);    // 전체 페이지 수
            } catch (e) {
                console.error("res error", e);
                setCurrentPosts([]);
            }
        }
        load();
    }, [page]);     // page별로 목록 불러오기

    // 현재 페이지에 해당하는 목록만 자르기
    /*    const currentPosts = filteredPosts.slice(
            (page - 1) * pageSize,
            page * pageSize
        );
        // 총 페이지 수 계산
        const totalPages = Math.ceil(filteredPosts.length / pageSize) || 1;
    */

    const list = currentPosts.map((post) => (
        /* 책 목록 정렬*/
        <Grid item xs={12} sm={6} md={3} key={post.id}>
            <Card
                sx={{
                    backgroundColor: "#ffffff",
                    borderRadius: 3,
                    boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
                    height: 400,
                }}
            >
                {/* 도서 카드 */}
                <CardActionArea component={Link} to={`/details/${post.id}`}>
                    <CardMedia
                        component="img"
                        sx={{height: 260, width: 180, objectFit: "cover"}}
                        image={post.image_url || "https://www.freeiconspng.com/uploads/no-image-icon-6.png"}
                        alt={post.title}
                    />
                    <CardContent sx={{ padding: 2 }}>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: "bold",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis"
                            }}>
                            {/* 8자 이상이면 제목 자르기*/}
                            {post.title.length > 8 ? post.title.slice(0, 7) + "…" : post.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {post.author}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    ));

    return (
        <>
            <Box
                sx={{
                    width: "100%",
                    background: "#fff",
                    minHeight: "100vh",
                    padding: "40px 20px",
                    paddingTop: "300px"

                }}
            >
                {/* 제목 */}
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Typography
                        variant="h3"
                        component="h2"
                        sx={{
                            color: "#E67A8E",
                            fontWeight: "bold",
                            mb: 2,
                        }}
                    >도서 목록</Typography>
                </Box>

                {/* 검색창 */}
                <div style={{
                    width: '600px',
                    margin: '20px auto',
                    display: 'flex',
                    gap: '10px',
                    alignItems: 'center'
                }}>
                    <TextField
                        variant="outlined"
                        placeholder="책 제목을 검색하세요"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setPage(1); // 검색 시 1페이지로 이동
                        }}
                        sx={{
                            width: "100%",
                            backgroundColor: "#ffffff",
                            borderRadius: 2,
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                    borderColor: "#e67a8e",
                                },
                                "&:hover fieldset": {
                                    borderColor: "#d05d7f",
                                },
                            },
                        }}
                    />

                    {/* 검색 버튼 */}
                    <Button
                        variant="contained"
                        sx={{
                            height: "56px",
                            backgroundColor: "#e67a8e",
                            "&:hover": { backgroundColor: "#d05d7f" },
                        }}
                    >검색</Button>
                </div>

                <Box
                    sx={{
                        mt: 3,
                        px: 2,
                        maxWidth: "1200px",
                        mx: "auto",
                    }}
                >
                    {currentPosts.length === 0 ? (
                        // 데이터가 비어있는 경우
                        <Typography variant="h5" align="center">
                            도서 목록이 비어있습니다.
                        </Typography>
                    ) : filteredPosts.length === 0 ? (
                        // 검색 결과가 없는 경우
                        <Typography variant="h6" align="center">
                            검색 결과가 없습니다.
                        </Typography>
                    ) : (
                        <>
                            {/*목록*/}
                            <Grid
                                container
                                spacing={2}
                                justifyContent="center"
                            >
                                {list}
                            </Grid>

                            {/* 페이지네이션 */}
                            <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
                                <Stack spacing={2}>
                                    <Pagination
                                        count={totalPages}
                                        page={page}
                                        onChange={(e, v) => setPage(v)}
                                        variant="outlined"
                                        shape="rounded"
                                        sx={{
                                            "& .Mui-selected": {
                                                backgroundColor: "#e67a8e !important",
                                                color: "#fff",
                                            },
                                        }}
                                    />
                                </Stack>
                            </Box>
                        </>
                    )}
                </Box>
            </Box>
        </>
    );
}