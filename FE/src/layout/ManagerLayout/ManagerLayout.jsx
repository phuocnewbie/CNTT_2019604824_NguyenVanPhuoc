import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Avatar, Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { BsHouseDoor, BsListUl, BsCart3, BsEnvelope, BsGrid, BsPeople, BsBoxSeam, BsPerson, BsBoxArrowLeft } from "react-icons/bs";
import { managerChangeTab } from "./managerSlice";
import { clearToken } from "../../redux/store/tokenSlice";
import { userLogout } from "../../redux/store/userSlice";
import logo from "../../assets/img/logo.jpg";
import "./manager.scss";
import { clearCart } from "../../pages/Cart/cartSlice";

const tabs = [
    {
        text: "Trang chủ",
        slug: "dashboard",
        icon: <BsHouseDoor />,
    },
    {
        text: "Carousel",
        slug: "carousels",
        icon: <BsGrid />,
    },
    {
        text: "Danh mục",
        slug: "categories",
        icon: <BsListUl />,
    },
    {
        text: "Đơn hàng",
        slug: "orders",
        icon: <BsCart3 />,
    },
    {
        text: "Liên hệ",
        slug: "contacts",
        icon: <BsEnvelope />,
    },
    {
        text: "Thành viên",
        slug: "members",
        icon: <BsPeople />,
    },
    {
        text: "Sản phẩm",
        slug: "products",
        icon: <BsBoxSeam />,
    },
];
const ManagerLayout = ({ children }) => {
    const user = useSelector((state) => state.user);

    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    React.useEffect(() => {
        if (user.role_id === "r2") navigate("/");
    }, [pathname, user, navigate]);

    const handleChangeTab = (slug) => {
        navigate(`/manager/${slug}`);
        dispatch(managerChangeTab(slug));
    };
    const handleLogout = () => {
        dispatch(clearToken());
        dispatch(userLogout());
        dispatch(clearCart());
        navigate("/login");
    };
    return (
        <Box
            sx={{
                display: "flex",
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
            }}
        >
            <Box
                sx={{
                    minWidth: "28rem",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRight: "1px solid #e5e5e5",
                    "& .heading-box": {
                        m: "1rem 3rem",
                        height: "4.4rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxSizing: "border-box",
                        "& > img": {
                            width: "6.4rem",
                        },
                        "& > span": {
                            ml: "1rem",
                            mb: "-0.6rem",
                            fontWeight: 500,
                            fontSize: "3.2rem",
                        },
                    },
                    "& .my-account": {
                        fontSize: "2rem",
                        color: "#a5a5a5",
                        marginLeft: "1.2rem",
                        marginBottom: "1rem",
                    },
                }}
            >
                <div className='heading-box'>
                    <img alt='' src={logo} />
                </div>
                <Divider />
                <List>
                    {tabs.map((tab, index) => (
                        <ListItem key={index} disablePadding>
                            <ListItemButton className={`tab ${pathname.includes(tab.slug) ? "currentTab" : ""}`} onClick={() => handleChangeTab(tab.slug)}>
                                <ListItemIcon className='tab-icon'>{tab.icon}</ListItemIcon>
                                <ListItemText className='tab-text' primary={tab.text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <p className='my-account'>Tài khoản của tôi</p>
                <List>
                    <ListItem disablePadding>
                        <ListItemButton className={`tab ${pathname.includes("/profile") ? "currentTab" : ""}`} onClick={() => handleChangeTab("profile")}>
                            <ListItemIcon className='tab-icon'>
                                <BsPerson />
                            </ListItemIcon>
                            <ListItemText className='tab-text' primary='Hồ sơ' />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton className='tab' onClick={handleLogout}>
                            <ListItemIcon className='tab-icon'>
                                <BsBoxArrowLeft />
                            </ListItemIcon>
                            <ListItemText className='tab-text' primary='Đăng xuất' />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
            <Box
                sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Box
                    sx={{
                        px: "4rem",
                        display: "flex",
                        minHeight: "6.4rem",
                        alignItems: "center",
                        backgrounColor: "#fff",
                        justifyContent: "flex-end",
                    }}
                >
                    <Avatar alt='' src={`http://localhost:8000/${user.avatar}`} />
                    <Typography
                        sx={{
                            ml: "1.2rem",
                            fontSize: "2rem",
                            fontFamily: "Nunito",
                        }}
                    >
                        {user.name}
                    </Typography>
                </Box>
                <Divider />
                <Box
                    sx={{
                        flexGrow: 1,
                        backgroundColor: "#f5f7fb",
                        p: "1.6rem 4rem",
                    }}
                >
                    <Outlet />
                </Box>
                <Divider />
                <Typography
                    className='useFont-Nunito'
                    sx={{
                        p: "2rem 0",
                        width: "100%",
                        color: "#495057",
                        fontSize: "1.6rem",
                        textAlign: "center",
                        backgroundColor: "#fff",
                    }}
                >
                    Copyright © 2023 Designed by <strong>Hoàn Mỹ</strong>. All rights reserved.
                </Typography>
            </Box>
        </Box>
    );
};

export default ManagerLayout;
