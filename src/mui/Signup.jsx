'use client'
import {useState} from "react";
import axios from 'axios';
// import { useRouter } from 'next/router';
import {Box, Button, TextField, Typography} from "@mui/material";
import Container from "@mui/material/Container";
import NewLabelIcon from '@mui/icons-material/NewLabel';

export default function SignUp() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        id: '',
        pw: '',
    });

    // const router = useRouter();

    const inputChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const signUp = async () => {
        try {
            const {data} = await axios.post("http://localhost:8080/signup", formData);

            if (data.success) {
                alert("회원가입이 완료되었습니다.");
                // await router.push('/login');
            } else {
                alert("회원가입에 실패하였습니다: " + data.message);
            }
        } catch (error) {
            console.error("Error during sign up:", error);
        }
    };

    return (
        <Container maxWidth="sm" style={{marginTop: '2rem',backgroundColor: "white", color: "white"}}>
            <Typography variant="h3" component="h4" gutterBottom textAlign='center' style={{color: '#FF6B99'}}>
                <NewLabelIcon sx={{fontSize: '2rem', marginRight: 1}}/>
                회원가입
            </Typography>
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
                    label="이름을 입력하세요"
                    name="name"
                    variant="outlined"
                    fullWidth
                    onChange={inputChange}
                    margin="normal"
                />
                <TextField
                    label="이메일을 입력하세요"
                    name="email"
                    type="email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    onChange={inputChange}
                />
                <TextField
                    label="ID를 입력하세요"
                    name="id"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    onChange={inputChange}
                />
                <TextField
                    label="비밀번호를 입력하세요"
                    name="pw"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    onChange={inputChange}
                />
                <Box mt={3}>
                    <Button
                        variant="contained"
                        fullWidth
                        onClick={signUp}
                        sx={{
                            height: '50px',
                            fontSize: '20px',
                            backgroundColor: '#FF6B99',
                            '&:hover': {backgroundColor: '#d06f8e',}
                        }}
                    >
                        회원가입
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}
