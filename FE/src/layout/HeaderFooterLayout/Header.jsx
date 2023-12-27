import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, Link, createSearchParams, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import { styled } from "@mui/material/styles";
import { Box, IconButton, Menu, MenuItem, Badge } from "@mui/material";
import { clearToken } from "../../redux/store/tokenSlice";
import { userLogout } from "../../redux/store/userSlice";
import logo from "../../assets/img/logo.jpg";
import "./header.scss";
import { clearCart } from "../../pages/Cart/cartSlice";
const StyledLink = styled(Link)({
    color: "#495057",
    fontSize: "1.6rem",
    textDecoration: "none",
});
const Header = () => {
    const isLogin = useSelector((state) => state.token.isLogin);
    const user = useSelector((state) => state.user);
    const cart = useSelector((state) => state.cart.carts);

    const [checked, setChecked] = React.useState(false);
    const [search, setSearch] = React.useState("");
    const [anchorEl, setAnchorEl] = React.useState(null);

    const dispatch = useDispatch();
    const reactLocation = useLocation();
    const navigate = useNavigate();

    React.useEffect(() => {
        const handleListenKeyPress = (e) => {
            if (e.key === "Enter") {
                navigate({
                    pathname: "search",
                    search: createSearchParams({
                        keyword: search,
                    }).toString(),
                });
                setSearch("");
                setChecked(false);
            }
        };
        if (checked && search !== "") window.addEventListener("keypress", handleListenKeyPress);

        return () => {
            window.removeEventListener("keypress", handleListenKeyPress);
        };
    }, [search, checked, navigate]);
    const handleClickUser = (e) => {
        setAnchorEl(e.target);
    };
    const handleLogout = () => {
        setAnchorEl(null);
        dispatch(clearToken());
        dispatch(userLogout());
        dispatch(clearCart());
    };
    const handleCloseMenuUser = () => {
        setAnchorEl(null);
    };
    return (
        <Box
            sx={{
                p: "1rem 6rem",
                display: "flex",
                alignItems: "center",
                boxShadow: "0 0 1rem #e5e5e5",
            }}
        >
            <Link to='/'>
                <img
                    src={logo}
                    alt='logo'
                    style={{
                        width: "8rem",
                    }}
                />
            </Link>
            <Box
                sx={{
                    display: "flex",
                    flexGrow: 1,
                    ml: "20rem",
                    "& a": {
                        display: "block",
                        color: "#495057",
                        p: "1.5rem 3rem",
                        minWidth: "14rem",
                        fontWeight: 700,
                        fontSize: "1.8rem",
                        textAlign: "center",
                        textDecoration: "none",
                        boxSizing: "border-box",
                        borderRadius: "0.2rem",
                        "&:hover": {
                            color: "#f1f1f1",
                            backgroundColor: "#333",
                        },
                    },
                }}
            >
                <Link to='/'>Trang chủ</Link>
                <Link to='/categories/men'>Nam</Link>
                <Link to='/categories/women'>Nữ</Link>
                <Link to='/categories/accessory'>Phụ Kiện</Link>
                <Link to='/contact'>Liên Hệ</Link>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <input type='checkbox' id='checkbox' checked={checked} readOnly />
                <Box className='search-box search'>
                    <label className='search-label' onClick={() => setChecked((prevState) => !prevState)}>
                        <BsSearch />
                    </label>
                    <input className='search-input' placeholder='Tìm kiếm...' value={search} onChange={(e) => setSearch(e.target.value)} />
                </Box>
                <StyledLink
                    to='/user/cart'
                    sx={{
                        ml: "1.4rem",
                        color: "#666",
                        fontSize: "2.4rem",
                    }}
                >
                    {cart.length !== 0 ? (
                        <Badge
                            badgeContent={cart.length}
                            color='primary'
                            sx={{
                                "& .MuiBadge-badge": {
                                    color: "#fff",
                                    fontSize: "1.2rem",
                                    backgroundColor: "#333",
                                },
                            }}
                        >
                            <FaShoppingCart />
                        </Badge>
                    ) : (
                        <FaShoppingCart />
                    )}
                </StyledLink>
                <IconButton
                    onClick={handleClickUser}
                    sx={{
                        ml: "2rem",
                        mt: "-0.6rem",
                        color: "#666",
                        fontSize: "2.4rem",
                        "&:hover": {
                            backgroundColor: "inherit",
                        },
                    }}
                >
                    <img
                        src={`http://localhost:8000/${user.avatar}`}
                        alt='user'
                        style={{
                            width: "3.2rem",
                            height: "3.2rem",
                            borderRadius: "50%",
                            objectFit: "cover",
                        }}
                    />
                </IconButton>
                {!isLogin ? (
                    <Menu
                        open={Boolean(anchorEl)}
                        anchorEl={anchorEl}
                        onClose={() => setAnchorEl(null)}
                        sx={{
                            ml: "-2rem",
                            mt: "1rem",
                            "& li": {
                                minWidth: "14rem",
                            },
                        }}
                    >
                        <MenuItem>
                            <StyledLink to='/login'>Đăng nhập</StyledLink>
                        </MenuItem>
                        <MenuItem>
                            <StyledLink to='/register'>Đăng ký</StyledLink>
                        </MenuItem>
                    </Menu>
                ) : (
                    <Menu
                        open={Boolean(anchorEl)}
                        anchorEl={anchorEl}
                        onClose={() => setAnchorEl(null)}
                        sx={{
                            ml: "-2rem",
                            mt: "1rem",
                            "& li": {
                                minWidth: "14rem",
                            },
                        }}
                    >
                        <MenuItem>
                            <StyledLink to='/user/profile' onClick={handleCloseMenuUser}>
                                Tài khoản của tôi
                            </StyledLink>
                        </MenuItem>
                        <MenuItem>
                            <StyledLink to='/user/purchase' onClick={handleCloseMenuUser}>
                                Đơn mua
                            </StyledLink>
                        </MenuItem>
                        <MenuItem>
                            <StyledLink to={reactLocation.pathname.includes("user") || reactLocation.pathname.includes("manager") ? "/login" : reactLocation.pathname} onClick={handleLogout}>
                                Đăng xuất
                            </StyledLink>
                        </MenuItem>
                    </Menu>
                )}
            </Box>
        </Box>
    );
};

export default Header;
