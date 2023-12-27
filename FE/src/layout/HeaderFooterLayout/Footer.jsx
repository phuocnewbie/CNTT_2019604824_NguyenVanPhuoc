import React from "react";
import { BsTelephoneFill, BsEnvelopeFill } from "react-icons/bs";
import { FaFacebookSquare, FaYoutube, FaInstagram, FaTiktok } from "react-icons/fa";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import { styled } from "@mui/material/styles";
import { Box, InputBase, Typography, Link } from "@mui/material";
const StyledBox = styled(Box)({
    color: "#fff",
    "& .heading": {
        fontWeight: 500,
        fontSize: "2rem",
        margin: "0 0 1.5rem",
    },
    "& .content": {
        display: "grid",
        gap: "1rem",
    },
});
const StyledTypography = styled(Typography)({
    color: "#a5a5a5",
    display: "flex",
    alignItems: "center",
    fontSize: "1.4rem",
    "& .text": {
        margin: 0,
        marginLeft: "1.2rem",
    },
});
const StyledLink = styled(Link)({
    color: "#a5a5a5",
    cursor: "pointer",
    fontSize: "1.4rem",
    textDecoration: "none",
    "&:hover": {
        color: "#fff",
    },
});
const Footer = () => {
    return (
        <>
            <Box
                sx={{
                    backgroundColor: "#333",
                    width: "100%",
                }}
            >
                <Box
                    className='whiteTextColor grid-wide'
                    sx={{
                        py: "2rem",
                        display: "grid",
                        gridTemplateColumns: "repeat(4, 1fr)",
                        gap: "3rem",
                    }}
                >
                    <Box
                        className='whiteTextColor'
                        sx={{
                            display: "grid",
                            gap: "1rem",
                        }}
                    >
                        <Typography
                            className='useFont-Nunito'
                            sx={{
                                fontSize: "2rem",
                                fontWeight: 500,
                            }}
                        >
                            Hoàn Mỹ Store
                        </Typography>
                        <StyledTypography className='useFont-Nunito'>
                            <LocationOnRoundedIcon />
                            <span className='text'>Q. Bắc Từ Liêm, Hà Nội</span>
                        </StyledTypography>
                        <StyledTypography className='useFont-Nunito'>
                            <BsTelephoneFill />
                            <span className='text'>0123 456 789</span>
                        </StyledTypography>
                        <StyledTypography className='useFont-Nunito'>
                            <BsEnvelopeFill />
                            <span className='text'>hoanmy.store@gmail.com</span>
                        </StyledTypography>
                        <Box>
                            <Typography
                                className='useFont-Nunito'
                                sx={{
                                    fontSize: "1.3rem",
                                    my: "1.5rem",
                                    color: "#a5a5a5",
                                }}
                            >
                                Đăng ký để được nhận thông tin khuyến mãi một cách nhanh chóng.
                            </Typography>
                            <Box
                                sx={{
                                    display: "flex",
                                    p: "0.2rem",
                                    mr: "3rem",
                                    borderRadius: "0.2rem",
                                    backgroundColor: "#fff",
                                    "& button": {
                                        color: "#fff",
                                        cursor: "pointer",
                                        border: "none",
                                        minWidth: "5rem",
                                        borderRadius: "0.2rem",
                                        backgroundColor: "#333",
                                    },
                                }}
                            >
                                <InputBase
                                    placeholder='Email của bạn'
                                    fullWidth
                                    sx={{
                                        px: "1.2rem",
                                        fontSize: "1.3rem",
                                    }}
                                />
                                <button>Gửi</button>
                            </Box>
                        </Box>
                    </Box>
                    <StyledBox>
                        <Typography className='useFont-Nunito heading'>Danh mục</Typography>
                        <Box className='content'>
                            <StyledLink className='useFont-Nunito'>Thời trang nam</StyledLink>
                            <StyledLink className='useFont-Nunito'>Thời trang nữ</StyledLink>
                            <StyledLink className='useFont-Nunito'>Phụ kiện</StyledLink>
                        </Box>
                    </StyledBox>
                    <StyledBox>
                        <Typography className='useFont-Nunito heading'>Góc Khách Hàng</Typography>
                        <Box className='content'>
                            <StyledLink className='useFont-Nunito'>Điều kiện & điều khoản</StyledLink>
                            <StyledLink className='useFont-Nunito'>Quyền riêng tư</StyledLink>
                            <StyledLink className='useFont-Nunito'>Chính sách bảo mật thông tin</StyledLink>
                            <StyledLink className='useFont-Nunito'>Ý kiến khách hàng</StyledLink>
                            <StyledLink className='useFont-Nunito'>Phương thức thanh toán</StyledLink>
                        </Box>
                    </StyledBox>
                    <StyledBox>
                        <Typography className='useFont-Nunito heading'>Theo dõi chúng tôi</Typography>
                        <Typography
                            className='useFont-Nunito'
                            sx={{
                                fontSize: "1.3rem",
                                my: "1.5rem",
                                color: "#a5a5a5",
                            }}
                        >
                            Theo dõi chúng tôi để cập nhật thông tin khuyến mãi một cách nhanh chóng nhất.
                        </Typography>
                        <Box
                            sx={{
                                "& a": {
                                    mr: "3rem",
                                    color: "#f1f1f1",
                                    fontSize: "3rem",
                                },
                            }}
                        >
                            <a href='http://facebook.com'>
                                <FaFacebookSquare />
                            </a>
                            <a href='http://youtube.com'>
                                <FaYoutube />
                            </a>
                            <a href='http://instagram.com'>
                                <FaInstagram />
                            </a>
                            <a href='http://tiktok.com'>
                                <FaTiktok />
                            </a>
                        </Box>
                    </StyledBox>
                </Box>
            </Box>
            <Typography
                className='useFont-Nunito'
                sx={{
                    width: "100%",
                    color: "#a5a5a5",
                    fontSize: "1.6rem",
                    textAlign: "center",
                    backgroundColor: "#000",
                    p: "2rem 0",
                }}
            >
                © All rights reserved. <strong>Hoàn Mỹ</strong>
            </Typography>
        </>
    );
};

export default Footer;
