import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { Link, useNavigate, createSearchParams } from "react-router-dom";

import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

import axiosClient from "../../api/axiosClient";
import { Button } from "../../components/Button";
import { Loading } from "../../components/Loading";
import { TextField } from "../../components/TextField";
import { managerChangeTab } from "../../layout/ManagerLayout/managerSlice";

const StyledTextField = styled(TextField)({
    width: "100%",
    margin: "1rem 0",
});
const VerifyEmail = () => {
    const isLogin = useSelector((state) => state.token.isLogin);
    const userRole = useSelector((state) => state.user.role_id);
    const [isSendCode, setIsSendCode] = React.useState(false);
    const [verifyCode, setVerifyCode] = React.useState();
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
        control: control2,
        handleSubmit: handleSubmit2,
        formState: { errors: errors2 },
        setError: setError2,
    } = useForm();

    const onVerifyEmail = (data) => {
        if (!isSendCode) {
            async function checkExist() {
                setIsLoading(true);
                try {
                    const res = await axiosClient.post(
                        `/members/verify-email/verify`,
                        {
                            ...data,
                            code: Math.floor(Math.random() * 1000000),
                        },
                    );
                    setIsSendCode(true);
                    setVerifyCode(res.data.code);
                    console.log(res.data.code);
                } catch (err) {
                    setError2("email", {
                        type: "validate",
                        message: err.response.data.message,
                    });
                }
                setIsLoading(false);
            }
            checkExist();
        } else {
            if (parseInt(data.code) === verifyCode) {
                navigate({
                    pathname: "create-infor",
                    search: createSearchParams({
                        email: data.email,
                    }).toString(),
                });
            } else
                setError2("code", {
                    type: "validate",
                    message: "Mã xác nhận không chính xác",
                });
        }
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
            onSubmit={handleSubmit2(onVerifyEmail)}
            noValidate
        >
            <h6 className='heading textColor useFont-Nunito'>
                Đăng ký thành viên
            </h6>
            <Box
                sx={{
                    width: "100%",
                }}
            >
                <p className={`notifyMessage`}>
                    {isSendCode
                        ? "Kiểm tra Email của bạn và nhập mã xác nhận được gửi về email."
                        : "Nhập Email của bạn để tiếp tục."}
                </p>
            </Box>
            <Controller
                name='email'
                control={control2}
                defaultValue=''
                rules={{
                    required: "Vui lòng nhập email để tiếp tục",
                    pattern: {
                        value: /^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/,
                        message: "Vui lòng nhập vào email của bạn",
                    },
                }}
                render={({ field }) => (
                    <StyledTextField
                        label='Email'
                        error={Boolean(errors2.email)}
                        helperText={errors2?.email ? errors2.email.message : ""}
                        {...field}
                    />
                )}
            />
            {isSendCode && (
                <Controller
                    name='code'
                    control={control2}
                    defaultValue=''
                    rules={{
                        required: "Vui lòng nhập mã xác nhận được gửi về email",
                    }}
                    render={({ field }) => (
                        <StyledTextField
                            placeholder='Mã xác nhận'
                            error={Boolean(errors2.code)}
                            helperText={
                                errors2?.code ? errors2.code.message : ""
                            }
                            {...field}
                        />
                    )}
                />
            )}

            <Button
                type='submit'
                sx={{
                    width: "100%",
                    mt: "1rem",
                }}
            >
                {isLoading ? <Loading /> : "Tiếp theo"}
            </Button>
            <h6 className='navLink textColor useFont-Nunito'>
                Bạn đã có tài khoản ?{" "}
                <Link
                    className='linkNoneUnderline'
                    to='/login'
                    style={{
                        color: "#AF0171",
                    }}
                >
                    Đăng nhập ngay
                </Link>
            </h6>
        </Box>
    );
};

export default VerifyEmail;
