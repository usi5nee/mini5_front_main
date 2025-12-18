import Typography from "@mui/material/Typography";
import React from "react";
import Box from "@mui/material/Box";

import TextField from "@mui/material/TextField";
import TextareaAutosize from '@mui/material/TextareaAutosize';

import MenuBookIcon from '@mui/icons-material/MenuBook';
import BookIcon from '@mui/icons-material/Book';
import CreateIcon from '@mui/icons-material/Create';
import BorderColorIcon from '@mui/icons-material/BorderColor';

import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import {LoadingButton} from "@mui/lab"
import {useState} from "react";
import axios from "axios";


export default function Regist() {
    const [form, setForm] = useState({
        title: '',
        author: '',
        content: '',
    });
    const [saving, setSaving] = useState(false);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    //저장 버튼 누르면 실행
    const handleSave = async () => {
        // 간단한 유효성 검사
        if (!form.title.trim() || !form.author.trim()) {
            alert("제목과 저자는 필수입니다.");
            return;
        }

        try {
            setSaving(true);

            // await new Promise((resolve) => setTimeout(resolve, 4000));
            // const isSuccess = true; //false
            // if (isSuccess) {
            //     alert("도서가 성공적으로 저장되었습니다!");
            //
            //     setForm({
            //         title: "",
            //         author: "",
            //         content: "",
            //     });
            // } else {
            //     throw new Error();
            // }

            const res = await axios.post("http://localhost:8080/api/books", {
                title: form.title,
                author: form.author,
                content: form.content,
            });
            console.log(res)
            // 서버에서 status_code 200 아니면 전부 에러 던짐
            if (res.status === 201) {
                alert("도서가 성공적으로 저장되었습니다!");
            } else {
                throw new Error("저장 실패!");
            }
            // 저장 후 폼 초기화

            setForm({
                title: "",
                author: "",
                content: "",
            });
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

            return (
        <Box sx={{ backgroundColor: "#ffffff", padding: 3, borderRadius: 2 , paddingTop: 25}}>
            <Box sx={{position: 'static', textAlign: 'center', mb: 7}}>
                <Typography variant="h3" component="h3" sx={{color:"black"}}>
                    <MenuBookIcon sx={{color: "black", fontSize: '2rem', marginRight: '1rem' }} />
                    새 도서 등록
                </Typography>
            </Box>

            <Box sx={{position: 'static', textAlign: 'left', mb: 2}}>
                <Typography variant="h5" component="h5" sx={{color:"black"}}>
                    <BookIcon sx={{color:"black", fontSize: '2rem', mb: -1, marginLeft: '1rem', marginRight: '1rem' }} />
                    || 책 제목
                </Typography>
            </Box>

            <Box sx={{ width: 400, maxWidth: '100%', mb: 5, color: "white"}}>
                <TextField fullWidth label="제목을 입력하세요"
                           name="title"
                           value={form.title}
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
                <TextField fullWidth label="저자를 입력하세요"
                           name="author"
                           value={form.author}
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
                    value={form.content}
                    onChange={handleChange}
                    minRows={10}
                    placeholder="내용을 입력하세요"
                    style={{
                        width: '100%',
                        fontSize: '16px',
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
                            setForm({
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