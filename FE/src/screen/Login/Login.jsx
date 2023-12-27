import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { styled } from "@mui/material/styles";
import { Box, FormControlLabel, Checkbox, Typography } from "@mui/material";

import axiosClient from "../../api/axiosClient";
import { Button } from "../../components/Button";
import { Loading } from "../../components/Loading";
import { TextField } from "../../components/TextField";
import { setToken } from "../../redux/store/tokenSlice";
import { userUpdateProfile } from "../../redux/store/userSlice";
import { managerChangeTab } from "../../layout/ManagerLayout/managerSlice";
import { setCart } from "../../pages/Cart/cartSlice";
import "../../styles/LoginLogoutStyles/LoginLogoutStyles.scss";
const StyledTextField = styled(TextField)({
    width: "100%",
    margin: "1rem 0",
});
const Login = () => {
    document.title = "Đăng nhập | Hoàn Mỹ Store";
    const isLogin = useSelector((state) => state.token.isLogin);
    const userRole = useSelector((state) => state.user.role_id);
    const [isLoading, setIsLoading] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (isLogin) {
            if (userRole !== "r2") {
                dispatch(managerChangeTab("dashboard"));
                navigate("/manager/dashboard");
            } else navigate(-1);
        }
    }, [isLogin, userRole, navigate, dispatch]);
    const {
        control,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();

    const onSubmit = (data) => {
        async function login() {
            setIsLoading(true);
            try {
                const res = await axiosClient.post(`/members/login`, {
                    ...data,
                });
                localStorage.setItem("authTokens", JSON.stringify(res.data.access_token));
                dispatch(setCart(res.data.cart));
                dispatch(
                    setToken({
                        isLogin: true,
                        authToken: res.data.access_token,
                    }),
                );
                dispatch(userUpdateProfile(res.data.data));
            } catch (err) {
                setErrorMessage(err.response.data.message);
                setError("username", {
                    type: "validate",
                });
                setError("password", {
                    type: "validate",
                });
            }
            setIsLoading(false);
        }
        login();
    };

    return (
        <Box
            component='form'
            sx={{
                flexGrow: 1,
                width: "100%",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
            }}
            noValidate
            onSubmit={handleSubmit(onSubmit)}
        >
            <h6 className='heading textColor useFont-Nunito'>Đăng nhập</h6>
            <Controller
                name='username'
                control={control}
                defaultValue=''
                rules={{
                    required: "Vui lòng nhập tên đăng nhâp/Email/SĐT",
                }}
                render={({ field }) => <StyledTextField label='Tên đăng nhập/Email/SĐT' error={Boolean(errors.username)} helperText={errors?.username ? errors.username.message : ""} {...field} />}
            />
            <Controller
                name='password'
                control={control}
                defaultValue=''
                rules={{
                    required: "Vui lòng nhập mật khẩu",
                }}
                render={({ field }) => <StyledTextField label='Mật khẩu' type='password' error={Boolean(errors.password)} helperText={errors?.password ? errors.password.message : ""} {...field} />}
            />
            <Typography
                sx={{
                    ml: "1.2rem",
                    color: "#d32f2f",
                    fontSize: "1.2rem",
                    alignSelf: "flex-start",
                }}
            >
                {errorMessage}
            </Typography>
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <FormControlLabel
                    className='textColor useFont-Nunito'
                    control={
                        <Checkbox
                            color='default'
                            sx={{
                                "& .MuiSvgIcon-root": {
                                    fontSize: "1.8rem",
                                },
                            }}
                        />
                    }
                    label='Ghi nhớ mật khẩu'
                    sx={{
                        alignSelf: "flex-start",
                        "& .MuiTypography-root": {
                            fontSize: "1.4rem",
                            fontFamily: "Nunito",
                        },
                    }}
                />
                <Link
                    to='/forgot-password'
                    className='linkUnderlineHover textColor'
                    style={{
                        fontSize: "1.4rem",
                    }}
                >
                    Quên mật khẩu ?
                </Link>
            </Box>
            <Button
                type='submit'
                sx={{
                    width: "100%",
                    mt: "1rem",
                }}
            >
                {isLoading ? <Loading /> : "Đăng nhập"}
            </Button>
            <h6 className='navLink textColor useFont-Nunito'>
                Bạn chưa có tài khoản ?{" "}
                <Link
                    className='linkNoneUnderline'
                    to='/register'
                    style={{
                        color: "#AF0171",
                    }}
                >
                    Đăng ký ngay
                </Link>
            </h6>
        </Box>
    );
};

export default Login;
