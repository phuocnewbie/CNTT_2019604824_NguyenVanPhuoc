import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BsArrowLeftShort } from "react-icons/bs";
import { useForm, Controller } from "react-hook-form";
import { Box } from "@mui/material";

import axiosClient from "../../api/axiosClient";
import { Button } from "../../components/Button";
import { Loading } from "../../components/Loading";
import { TextField } from "../../components/TextField";
import "../../styles/LoginLogoutStyles/LoginLogoutStyles.scss";
import { managerChangeTab } from "../../layout/ManagerLayout/managerSlice";

const ForgotPassword = () => {
    document.title = "Quên mật khẩu | Hoàn Mỹ Store";
    const isLogin = useSelector((state) => state.token.isLogin);
    const userRole = useSelector((state) => state.user.role_id);
    const [sended, setSended] = React.useState(false);
    const [notExist, setNotExist] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (isLogin) {
            if (userRole !== "r2") {
                dispatch(managerChangeTab("dashboard"));
                navigate("/manager/dashboard");
            } else navigate("/");
        }
    }, [isLogin, userRole, navigate, dispatch]);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();

    React.useEffect(() => {
        if (isLogin) navigate("/");
    }, [isLogin, navigate]);

    const randomPass = () => {
        let chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let passwordLength = 12;
        let password = "";
        for (var i = 0; i <= passwordLength; i++) {
            var randomNumber = Math.floor(Math.random() * chars.length);
            password += chars.substring(randomNumber, randomNumber + 1);
        }
        return password;
    };
    const onSubmit = (data) => {
        async function reset() {
            setIsLoading(true);
            try {
                await axiosClient.post(`/members/forgot-password`, {
                    email: data.email,
                    password: randomPass(),
                });
                setSended(true);
                setNotExist(false);
            } catch (err) {
                setNotExist(true);
                console.log(err);
            }
            setIsLoading(false);
        }
        reset();
    };
    const handleBackLoginForm = () => {
        setSended(false);
        setNotExist(false);
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
                mb: "3rem",
            }}
            noValidate
            onSubmit={handleSubmit(onSubmit)}
        >
            <Link to='/login' className='navLink-Icon navLink textColor linkNoneUnderline' onClick={handleBackLoginForm}>
                <BsArrowLeftShort />
            </Link>
            <h6 className='heading textColor useFont-Nunito'>Đặt lại mật khẩu</h6>
            <Box
                sx={{
                    width: "100%",
                }}
            >
                <p className={`notifyMessage ${notExist && "error"}`}>
                    {sended
                        ? "Kiểm tra Email của bạn và đặt lại mật khẩu."
                        : notExist
                        ? `Không tìm thấy tài khoản nào liên kết với email đã nhập!`
                        : "Nhập Email của bạn và chúng tôi sẽ cấp lại mật khẩu mới cho bạn!"}
                </p>
            </Box>
            <Controller
                name='email'
                control={control}
                defaultValue=''
                rules={{
                    required: "Vui lòng nhập trường này",
                    pattern: {
                        value: /^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/,
                        message: "Vui lòng nhập vào email của bạn",
                    },
                }}
                render={({ field }) => (
                    <TextField
                        label='Email'
                        error={Boolean(errors.email)}
                        helperText={errors?.email ? errors.email.message : ""}
                        {...field}
                        sx={{
                            width: "100%",
                            my: "1rem",
                        }}
                    />
                )}
            />
            <Button
                type='submit'
                sx={{
                    width: "100%",
                    mt: "1rem",
                }}
            >
                {isLoading ? <Loading /> : "Tiếp theo"}
            </Button>
        </Box>
    );
};

export default ForgotPassword;
