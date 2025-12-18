import React, { useEffect, useState} from 'react';
import {Box, Button, FormControl, InputLabel, MenuItem, Select, Typography} from "@mui/material";
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { Link } from "react-router-dom";
// import {mockData} from "../data/MockData.js";
import axios from "axios";
import {useParams, useNavigate} from "react-router-dom";

// function Data(title, author, category, description, cover_image, publisher, publish_date) {
//     return {title, author, category, description, cover_image, publisher, publish_date};
// }

export default function Detail() {
    // data = {
    //     "title": ,
    //     "content" : ,
    //     "author": ,
    //     "created_at": ,
    //     "image_url": ,
    // }
    const [mod, setMod] = React.useState('');
    const navigate = useNavigate();
    const handleChange = (event) => {
        setMod(event.target.value);
    };

    const {id} = useParams();
    const [data, setData] = useState(null);

    const handleGenerateImage=async () =>{
        try{
            const response= await axios.post("https://api.openai.com/v1/images/generations",
                {model:mod,
                prompt: `책의 일러스트를 만들어줘 책 제목은${data.title}이고 책 내용은 ${data.content}야`,
                },
                {
                    headers: {
                    "Content-Type": "application/json", Authorization: `Bearer `,
                    }
                }
                )
            console.log(response.data.data[0].url);
            const url = response.data.data[0].url
            setData(prev => ({
                ...prev,
                image_url: url
            }));

            const res = await axios.put(`http://localhost:8080/api/books/${id}`,
                {image_url: url}
                // {image_url: "https://oaidalleapiprodscus.blob.core.windows.net/private/org-EXBpCIPfzVXjdwSVcjsAQylD/user-4op0DxySo8G3BFmAmysjDfKS/img-WABXE9qZ1VlNdjXkKhbHPF7W.png?st=2025-12-08T15%3A07%3A25Z&se=2025-12-08T17%3A07%3A25Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=ed3ea2f9-5e38-44be-9a1b-7c1e65e4d54f&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-12-08T16%3A07%3A25Z&ske=2025-12-09T16%3A07%3A25Z&sks=b&skv=2024-08-04&sig=RqX0aZc8b6zawBhgXPJ0%2BO4VyX1EBBC1PIcMSpXN6N0%3D"}
                )


            console.log(res)
        }catch(error){
            console.log(error);
        }
    }

    const handleDelete=async () =>{
        try {
            const response= await axios.delete(`http://localhost:8080/api/books/${id}`);
            console.log(response);
            alert("삭제 완료");
            navigate("/books")
        }catch(error){
            console.log(error);
        }
    }

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

    return (
        <>
            <div style={{textAlign: 'center',color: "#333333", marginTop: '1rem', paddingTop: 100, background: "linear-gradient(90deg, #FCF6F8 0%, #FCF6F8 70%, #FCF6F8 100%)", }}>
                <h1> 세부 정보 </h1>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', marginTop: '3rem' }}>
                    <Box
                        component="img"
                        src= {data.image_url || "https://www.freeiconspng.com/uploads/no-image-icon-6.png"}
                        alt="cover_image"
                        sx={{ width: '500px', height: '500px', marginLeft: '2rem', }}
                    />
                    <table style={{borderCollapse: 'collapse', width: '80%', }}>
                        <tbody>
                        <tr>
                            <td style={{ border: '1px solid #ccc', padding: '0.5rem', textAlign: 'center', color: "#333333"}}>
                                제목</td>
                            <td style={{border: '1px solid #ccc', padding: '0.5rem', textAlign: 'left', color: "#333333"}}>
                                {data.title}</td>
                        </tr>
                        <tr>
                            <td style={{border: '1px solid #ccc', padding: '0.5rem', textAlign: 'center', color: "#333333"}}>
                                내용</td>
                            <td style={{border: '1px solid #ccc', padding: '0.5rem', textAlign: 'left', color: "#333333"}}>
                                {data.content.length > 100 ? data.content.substring(0, 100) + '...' : data.content}
                            </td>
                        </tr>
                        <tr>
                            <td style={{border: '1px solid #ccc', padding: '0.5rem', textAlign: 'center', color: "#333333"}}>
                                저자</td>
                            <td style={{border: '1px solid #ccc', padding: '0.5rem', textAlign: 'left', color: "#333333"}}>
                                {data.author}</td>
                        </tr>
                        <tr>
                            <td style={{border: '1px solid #ccc', padding: '0.5rem', textAlign: 'center', color: "#333333"}}>
                                출판일자</td>
                            <td style={{border: '1px solid #ccc', padding: '0.5rem', textAlign: 'left', color: "#333333"}}>
                                {data.created_at}</td>
                        </tr>
                        </tbody>
                    </table>
                </Box>

                <div style={{ position: "fixed",
                    bottom:'50px',
                    right:'40px',
                    textAlign:'right',}} >
                    <Button
                        component={Link}
                        to={`/edit/${id}`}
                        variant="contained"
                        color="primary"
                        // onClick={}
                        sx={{ width: '200px', backgroundColor: "#d06f8e" , height: '50px', fontSize: '18px', marginRight: '10px', color: "#9c3e55"}}
                    >
                        도서 수정하기
                    </Button>

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleDelete}
                        sx={{ width: '200px', height: '50px', fontSize: '18px', color: "#9c3e55", backgroundColor: "#d06f8e" }}
                    >
                        도서 삭제하기
                    </Button>
                </div>
            </div>

            <Box sx={{ minWidth: 120 ,background: "linear-gradient(90deg, #FCF6F8 0%, #FCF6F8 70%, #FCF6F8 100%)"}}>
                <Typography variant="body1" align="center" sx={{ fontSize: '22px', marginBottom: '1rem' ,color: "#333333"}}>
                    주어진 정보를 학습하여 AI 표지 생성이 가능합니다. 생성 모델을 선택하세요.
                </Typography>
                <FormControl fullWidth>
                    <InputLabel id="simple-select-label" shrink>
                        <SmartToyIcon sx={{marginTop: '0.2rem' }} />
                        생성 모델 선택
                    </InputLabel>
                    <Select
                        style={{textAlign: 'left'}}
                        labelId="simple-select-label"
                        id="simple-select"
                        value={mod}
                        label="생성 모델 선택"
                        onChange={handleChange}
                    >
                        <MenuItem value='dall-e-2'>DALL·E 2 (기본)</MenuItem>
                        <MenuItem value='dall-e-3'>DALL·E 3 (고품질)</MenuItem>
                        <MenuItem value='gpt-image-1'>GPT Image 1 (최신)</MenuItem>
                    </Select>
                </FormControl>

                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleGenerateImage} // 이미지 생성 함수 호출
                        sx={{ width: '200px', height: '50px', fontSize: '18px', marginTop: '2rem', backgroundColor: "#d06f8e",color: "#9c3e55" }}
                    >
                        AI 표지 생성하기
                    </Button>
                </Box>

            </Box>

            {/*<Box sx={{ display: 'flex', alignItems: 'flex-start',background: "linear-gradient(90deg, #FCF6F8 0%, #FCF6F8 70%, #FCF6F8 100%)" , padding: '1rem' }}>*/}
            {/*    <Box*/}
            {/*        component="img"*/}
            {/*        src="" // 책 표지 이미지 URL*/}
            {/*        alt=""*/}
            {/*        sx={{ width: '500px', height: 'auto', marginTop:'3rem', marginRight: '2rem' }}*/}
            {/*    />*/}
            {/*    <Box>*/}
            {/*        <Box sx={{fontSize: '40px', marginTop:'3rem', textAlign: 'center'}}> 내용 </Box>*/}
            {/*        <Box sx={{fontSize: '18px', marginBottom: '10rem'}}>{data.content}</Box>*/}
            {/*    </Box>*/}
            {/*</Box>*/}
        </>
    );
}