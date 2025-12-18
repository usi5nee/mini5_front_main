'use client'
import {useEffect, useState} from "react";
import axios from 'axios';
import Container from "@mui/material/Container";
import {Box, Button, TextField, Typography} from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';

export default function Login(){

    const [info, setInfo] = useState({id:'',pw:''});

    useEffect(()=>{
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("id");
    },[]);

    const inputChange = (e) => {
        setInfo({ ...info, [e.target.name]: e.target.value });
    };

    const login=async()=>{
        console.log(info);
        let {data} = await axios.post("http://localhost/login",info);
        //console.log(data);
        if(data.success){
            console.log(data.token);
            // 토큰값 저장
            // 브라우저 종료
            // SessionStorage에 id와 token을 저장
            sessionStorage.setItem("token",data.token);
            sessionStorage.setItem("id",info.id);
            location.href = "/list/1";
        }
    }

    return (
        <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
            <Typography variant="h3" gutterBottom align="center" style={{ color: '#FF6B99' }}>
                <LoginIcon sx={{ fontSize: '2rem', marginRight: 2 }} />
                로그인
            </Typography>
            <hr />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '8px',
                    padding: '2rem',
                    boxShadow: 3,
                }}
            >
                <TextField
                    label="아이디"
                    name="id"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    onChange={inputChange}
                />
                <TextField
                    label="비밀번호"
                    name="pw"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    onChange={inputChange}
                />
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={login}
                    sx={{
                        marginTop: '2rem',
                        height: '50px',
                        fontSize: '20px',
                        backgroundColor: '#FF6B99',
                        '&:hover': { backgroundColor: '#d06f8e', }
                    }}
                >
                    로그인
                </Button>
            </Box>
        </Container>
    );
}