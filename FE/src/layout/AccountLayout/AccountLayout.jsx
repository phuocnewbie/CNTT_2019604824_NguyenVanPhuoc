import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Box, Divider, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
const AccountLayout = ({ children }) => {
    const user = useSelector((state) => state.user);
    const isLogin = useSelector((state) => state.token.isLogin);
    const location = useLocation();
    const navigate = useNavigate();
    if (!isLogin) navigate("/login");
    return (
        <Box
            className='grid-wide'
            sx={{
                flexGrow: 1,
                display: "flex",
            }}
        >
            <Box
                sx={{
                    mx: "2rem",
                    mt: "1.2rem",
                    minWidth: "20rem",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        mb: "1rem",
                        "& img": {
                            width: "6.8rem",
                            height: "6.8rem",
                            borderRadius: "50%",
                            objectFit: "cover",
                        },
                        "& p": {
                            fontSize: "1.8rem",
                            fontWeight: 500,
                        },
                    }}
                >
                    <img src={`http://localhost:8000/${user.avatar}`} alt='' />
                    <Typography className='useFont-Nunito'>{user.name}</Typography>
                </Box>
                <Divider
                    sx={{
                        borderColor: "rgba(0, 0, 0, 0.05)",
                    }}
                />
                <Box
                    sx={{
                        mt: "1rem",
                        "& a": {
                            fontSize: "1.4rem",
                            color: "#a5a5a5",
                            textDecoration: "none",
                            display: "block",
                            p: "0.4rem 1.2rem",
                            fontWeight: 500,
                        },
                        "& a:hover": {
                            color: "#495057",
                        },
                        "& a.active": {
                            color: "#495057",
                        },
                    }}
                >
                    <Link to='/user/profile' className={location.pathname === "/user/profile" ? "active" : ""}>
                        Tài Khoản Của Tôi
                    </Link>
                    <Link to='/user/purchase' className={location.pathname === "/user/purchase" ? "active" : ""}>
                        Đơn Mua
                    </Link>
                </Box>
            </Box>
            <Box
                sx={{
                    flexGrow: 1,
                }}
            >
                {children}
                <Outlet />
            </Box>
        </Box>
    );
};

export default React.memo(AccountLayout);
