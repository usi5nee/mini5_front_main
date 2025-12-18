import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Badge from '@mui/material/Badge';
import BookIcon from '@mui/icons-material/Book';
import LogoutIcon from '@mui/icons-material/Logout';
import {BrowserRouter, Link} from "react-router-dom";


const pages = [{
        text: '도서 목록',
        link: "/books",
    },
    {
        text: '새 도서 등록',
        link: "/register",
    },
    {
        text: "로그인",
        link: "/login",
    },
    {
        text: "회원가입",
        link: "/signup"
    }
];

function ResponsiveAppBar() {
    // const [anchorElNav, setAnchorElNav] = React.useState(null);
    // const [anchorElUser, setAnchorElUser] = React.useState(null);

    // const handleOpenNavMenu = (event) => {
    //     setAnchorElNav(event.currentTarget);
    // };

    // const handleCloseNavMenu = () => {
    //     setAnchorElNav(null);
    // };
    //
    // const handleOpenUserMenu = (event) => {
    //     setAnchorElUser(event.currentTarget);
    // };

    return (
        <AppBar position="fixed"  sx={{ backgroundColor: "#FFCAD4" }}>

            <Container maxWidth="xl" >
                <Toolbar disableGutters >
                    <BookIcon sx={{ display: { size:"flex" ,color: "#FF6B99"}, mr: 2 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component={Link}
                        to={"/"}
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 50,
                            display: "flex",
                            fontWeight: 500,
                            letterSpacing: '.3rem',
                            color: '#E64A7A',
                            textDecoration: 'none',
                            '&:hover': {
                                color: 'goldenrod',
                            },
                        }}
                    >
                        도서관리 홈페이지
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
                        {pages.map((page) => (
                            <Button
                                key={page.text}
                                component={Link}
                                to={page.link}
                                // onClick={handleCloseNavMenu}
                                sx={{
                                    my: 2, color: '#E64A7A', display: 'block', mr: 3,
                                    textDecoration: 'none',
                                    '&:hover': {
                                        textDecoration: 'underline',
                                    }
                                }}
                            >
                                {page.text}
                            </Button>
                        ))}
                    </Box>

                    {/*<Box sx={{ flexGrow: 0 }}>*/}
                    {/*    <Tooltip title="로그아웃">*/}
                    {/*        <IconButton onClick=/!*handleOpenUserMenu*!/ sx={{ p: 0 }}>*/}
                    {/*            <Badge*/}
                    {/*                color="secondary"*/}
                    {/*                sx={{*/}
                    {/*                    '& .MuiSvgIcon-root': {*/}
                    {/*                        fontSize: 30,*/}
                    {/*                    },*/}
                    {/*                }}*/}
                    {/*            >*/}
                    {/*                <LogoutIcon />*/}
                    {/*            </Badge>*/}
                    {/*        </IconButton>*/}
                    {/*    </Tooltip>*/}
                    {/*</Box>*/}
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default ResponsiveAppBar;
