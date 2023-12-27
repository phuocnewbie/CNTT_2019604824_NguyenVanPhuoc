import React from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

import logo from "../../assets/img/logo.jpg";
import bg from "../../assets/img/bg-loginlogout.jpg";
const LoginLogoutLayout = ({ children }) => {
    const navigate = useNavigate();
    const handleGoHome = () => {
        navigate("/");
    };

    return (
        <Box
            sx={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: "flex",
                backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${bg})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
            }}
        >
            <Box
                sx={{
                    alignSelf: "center",
                    width: "40rem",
                    mx: "auto",
                    px: "6rem",
                    pt: "3rem",
                    pb: "4rem",
                    borderRadius: "0.4rem",
                    backgroundColor: "#fff",
                    boxShadow: "0 0 10px 1px #888",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    position: "relative",
                }}
            >
                <img
                    alt=''
                    src={logo}
                    style={{
                        width: "16rem",
                        cursor: "pointer",
                    }}
                    onClick={handleGoHome}
                />
                {children}
            </Box>
        </Box>
    );
};

export default LoginLogoutLayout;
