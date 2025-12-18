import React, {useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, TextField
} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import BookIcon from "@mui/icons-material/Book";
import CreateIcon from "@mui/icons-material/Create";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import ButtonGroup from "@mui/material/ButtonGroup";
import {LoadingButton} from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";
import axios from "axios";


export default function Edit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/books/${id}`);
                setData(res.data);
            } catch (error) {
                console.error("Error fetching the book:", error);
            }
        };
        fetchBook();
    }, [id]);

    if (!data) {
        return <div style={{ paddingTop: 100, textAlign: "center" }}>로딩 중...</div>;
    }



    const handleSave = async () => {
        // 간단한 유효성 검사
        if (!data.title.trim() || !data.author.trim()) {
            alert("제목과 저자는 필수입니다.");
            return;
        }

        try {
            setSaving(true);

            // await new Promise((resolve) => setTimeout(resolve, 4000));
            // const isSuccess = true; //false
            // if (isSuccess) {
            //     alert("도서가 성공적으로 수정되었습니다!");
            //
            // } else {
            //     throw new Error();
            // }

            const res = await axios.put(`http://localhost:8080/api/books/${id}`, {
                title: data.title,
                author: data.author,
                content: data.content,
                image_url: data.image_url,
            });
            console.log(res.status);
            // 서버에서 status_code 200 아니면 전부 에러 던짐
            if (res.status === 200) {
                alert("도서가 성공적으로 저장되었습니다!");
                navigate(`/details/${id}`);
            } else {
                throw new Error("저장 실패!");
            }
            // 저장 후 폼 초기화

        } catch (error) {
            console.error(error);
            const msg =
                error.response?.data?.message ||
                "저장 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
            alert(msg);
        } finally {
            setSaving(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    return (
        <Box sx={{ backgroundColor: "#ffffff", padding: 3, borderRadius: 2 , paddingTop: 25}}>
            <Box sx={{position: 'static', textAlign: 'center', mb: 7}}>
                <Typography variant="h3" component="h3" sx={{color:"black"}}>
                    <MenuBookIcon sx={{color: "black", fontSize: '2rem', marginRight: '1rem' }} />
                    도서 수정
                </Typography>
            </Box>

            <Box sx={{position: 'static', textAlign: 'left', mb: 2}}>
                <Typography variant="h5" component="h5" sx={{color:"black"}}>
                    <BookIcon sx={{color:"black", fontSize: '2rem', mb: -1, marginLeft: '1rem', marginRight: '1rem' }} />
                    || 책 제목
                </Typography>
            </Box>

            <Box sx={{ width: 400, maxWidth: '100%', mb: 5, color: "white"}}>
                <TextField fullWidth
                           name="title"
                           value={data.title}
                           onChange={handleChange}
                />
            </Box>

            <Box sx={{position: 'static', textAlign: 'left', mb: 2}}>
                <Typography variant="h5" component="h5" sx={{color:"black"}}>
                    <CreateIcon sx={{color:"black", fontSize: '3rem', mb: -2, marginRight: '1rem' }} />
                    ||  책 저자
                </Typography>
            </Box>

            <Box sx={{ width: 800, maxWidth: '100%', mb: 5}}>
                <TextField fullWidth label={data.author}
                           name="author"
                           value={data.author}
                           onChange={handleChange}
                />
            </Box>

            <Box sx={{position: 'static', textAlign: 'left'}}>
                <Typography variant="h5" component="h5" sx={{color:"black"}}>
                    <BorderColorIcon sx={{color:"black" ,fontSize: '2rem', mb: -1, marginLeft: '1rem', marginRight: '1rem' }} />
                    || 내용
                </Typography>
            </Box>

            <Box sx={{position: 'static', textAlign: 'center', width: 800, maxWidth: '100%', mb: 5, mt: 3}}>
                <TextareaAutosize
                    aria-label="minimum height"
                    name="content"
                    value={data.content}
                    onChange={handleChange}
                    minRows={10}
                    placeholder="내용을 입력하세요"
                    style={{
                        width: '100%',
                        fontSize: '16px',
                        color: 'black',
                        padding: '10px',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                        boxSizing: 'border-box',
                        background: "white",
                    }}
                />
            </Box>

            <Box display="flex" justifyContent="flex-end">
                <ButtonGroup aria-label="Loading button group">
                    {/* 필요하면 취소/초기화 버튼 */}
                    <Button
                        variant="outlined"
                        disabled={saving}
                        onClick={() =>
                            setData({
                                title: "",
                                author: "",
                                content: "",
                            })
                        }
                    >
                        초기화
                    </Button>

                    {/* 저장 + 로딩 표시 버튼 */}
                    <LoadingButton
                        variant="contained"
                        loading={saving}
                        loadingPosition="start"
                        startIcon={<SaveIcon />}
                        onClick={handleSave}
                    >
                        {saving ? "저장 중..." : "저장"}
                    </LoadingButton>
                </ButtonGroup>
            </Box>
        </Box>
    );
}