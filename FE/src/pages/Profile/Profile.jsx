import React from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Box, Typography, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar } from "@mui/material";

import axiosClient from "../../api/axiosClient";
import { Button } from "../../components/Button";
import { Alert } from "../../components/Alert";
import { userUpdateProfile } from "../../redux/store/userSlice";
const StyledBox = styled(Box)({
    display: "grid",
    gap: "1.5rem",
});

const StyledButton = styled(Button)({
    minWidth: "10rem",
    textTransform: "none",
    padding: "0.2rem 1.2rem",
});
const Profile = () => {
    document.title = "Hồ sơ của tôi | Hoàn Mỹ Store";
    const user = useSelector((state) => state.user);
    const [image, setImage] = React.useState();
    const [preview, setPreview] = React.useState();
    const [openChangePass, setOpenChangePass] = React.useState(false);
    const [snackbar, setSnackbar] = React.useState({
        isOpen: false,
        type: "",
        message: "",
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        setError,
    } = useForm({
        defaultValues: {
            full_name: user.full_name,
            email: user.email,
            phone: user.phone,
            address: user.address,
            avatar: user.avatar,
            date_of_birth: user.date_of_birth,
            gender: user.gender,
        },
    });
    const {
        register: register2,
        formState: { errors: errors2 },
        handleSubmit: handleSubmit2,
        setValue: setValue2,
        setError: setError2,
        clearErrors,
    } = useForm();

    const avatarRef = React.useRef();

    const dispatch = useDispatch();
    React.useEffect(() => {
        if (image) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(image);
        } else {
            setPreview(`http://localhost:8000/${user.avatar}`);
        }
    }, [image, user]);
    const handleCloseSnackbar = (e, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setSnackbar((prev) => ({ ...prev, isOpen: false }));
    };
    const handleOpenChangePassForm = () => {
        setOpenChangePass(true);
        setValue2("old_password", "");
        setValue2("new_password", "");
    };
    const handleCloseChangePassForm = () => {
        setOpenChangePass(false);
        clearErrors();
    };

    const onSubmit = (data) => {
        async function updateProfile() {
            try {
                const formData = new FormData();

                Object.keys(data).forEach((item) => {
                    formData.append(item, data[item]);
                });
                if (data.image) formData.append("image", data.image);
                const res = await axiosClient.post(`/members/${user.id}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                setSnackbar({
                    isOpen: true,
                    type: "success",
                    message: res.data.message,
                });
                dispatch(userUpdateProfile(res.data.data));
            } catch (err) {
                setError("username", {
                    type: "validate",
                    message: err.response.data.message,
                });
            }
        }
        updateProfile();
    };
    const onChangePass = (data) => {
        async function updatePassword() {
            try {
                const res = await axiosClient.post(`/members/password/${user.id}`, {
                    ...data,
                });
                setSnackbar({
                    isOpen: true,
                    type: "success",
                    message: res.data.message,
                });
                setOpenChangePass(false);
            } catch (err) {
                setError2("old_password", {
                    type: "validate",
                    message: err.response.data.message,
                });
            }
        }
        updatePassword();
    };
    return (
        <Box
            sx={{
                px: "2.4rem",
                py: "4rem",
            }}
        >
            <Box
                sx={{
                    position: "relative",
                    color: "#495057",
                    borderBottom: "2px solid #e5e5e5",
                    "& h3": {
                        fontSize: "3rem",
                        fontWeight: 500,
                    },
                    "& p": {
                        fontSize: "1.8rem",
                        my: "0.8rem",
                    },
                    "& a": {
                        fontSize: "1.6rem",
                        position: "absolute",
                        right: "2rem",
                        bottom: "2rem",
                    },
                }}
            >
                <Typography variant='h3' className='useFont-Nunito'>
                    Hồ Sơ Của Tôi
                </Typography>
                <Typography className='useFont-Nunito'>Quản lý thông tin hồ sơ để bảo mật tài khoản</Typography>
                <Link onClick={handleOpenChangePassForm}>Đổi mật khẩu</Link>
            </Box>
            <Dialog
                open={openChangePass}
                onClose={handleCloseChangePassForm}
                sx={{
                    "& .MuiPaper-root": {
                        minWidth: "40rem",
                    },
                }}
            >
                <Box
                    component='form'
                    noValidate
                    onSubmit={handleSubmit2(onChangePass)}
                    sx={{
                        "& .form-group": {
                            display: "flex",
                            my: "1rem",
                            "& .form-label": {
                                mr: "3rem",
                                textAlign: "end",
                                color: "#495057",
                                minWidth: "12rem",
                                fontSize: "1.6rem",
                                lineHeight: "3.2rem",
                            },
                            "& .form-input": {
                                outline: "none",
                                color: "#495057",
                                p: "0.8rem 1.2rem",
                                fontSize: "1.6rem",
                                borderRadius: "0.3rem",
                                border: "1px solid #ccc",
                            },
                            "&.error .form-input": {
                                borderColor: "#d32f2f",
                                borderWidth: "2px",
                                "::placeholder": {
                                    color: "#d32f2f",
                                    opacity: 1,
                                },
                            },
                            "& .form-message": {
                                mt: "0.2rem",
                                ml: "1rem",
                                color: "#d32f2f",
                                fontSize: "1.4rem",
                            },
                        },
                    }}
                >
                    <DialogTitle
                        sx={{
                            color: "#495057",
                            fontSize: "2.4rem",
                            fontFamily: "Nunito",
                        }}
                    >
                        Thay đổi mật khẩu
                    </DialogTitle>
                    <DialogContent
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            pb: "1rem",
                        }}
                    >
                        <div className={`form-group ${errors2.old_password ? "error" : ""}`}>
                            <div
                                style={{
                                    flexGrow: 1,
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <input
                                    className='form-input'
                                    placeholder='Mật khẩu cũ'
                                    {...register2("old_password", {
                                        required: true,
                                    })}
                                />
                                {errors2.old_password?.type === "required" && <span className='form-message'>Vui lòng nhập vào mật khẩu cũ</span>}
                                {errors2.old_password?.type === "validate" && <span className='form-message'>{errors2.old_password?.message}</span>}
                            </div>
                        </div>
                        <div className={`form-group ${errors2.new_password ? "error" : ""}`}>
                            <div
                                style={{
                                    flexGrow: 1,
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <input
                                    className='form-input'
                                    placeholder='Mật khẩu mới'
                                    defaultValue=''
                                    {...register2("new_password", {
                                        required: true,
                                        pattern: /^(?=.*[a-zA-Z])(?=.*[@$!%*#?&])(?=.*[0-9])[A-Za-z0-9@$!%*#?&]{8,}$/,
                                        minLength: 8,
                                    })}
                                />
                                {errors2.new_password?.type === "required" && <span className='form-message'>Vui lòng nhập vào mật khẩu mới</span>}
                                {errors2.new_password?.type === "pattern" && <span className='form-message'>Mật khẩu phải bao gồm chữ cái, chữ số và ký tự đặc biệt</span>}
                                {errors2.new_password?.type === "minLength" && <span className='form-message'>Mật khẩu phải có tối thiểu 8 ký tự</span>}
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions
                        sx={{
                            pb: "2rem",
                            px: "2.4rem",
                            "& button:not(:first-of-type)": {
                                ml: "2rem",
                            },
                        }}
                    >
                        <StyledButton type='submit'>Lưu</StyledButton>
                        <StyledButton onClick={handleCloseChangePassForm}>Hủy</StyledButton>
                    </DialogActions>
                </Box>
            </Dialog>
            <Box
                component='form'
                sx={{
                    display: "flex",
                    position: "relative",
                    pb: "2rem",
                }}
                noValidate
                onSubmit={handleSubmit(onSubmit)}
            >
                <Box
                    sx={{
                        flexGrow: 1,
                        display: "flex",
                        borderRight: "1px solid #e5e5e5",
                        m: "2.4rem",
                    }}
                >
                    <StyledBox
                        sx={{
                            flexGrow: 1,
                            "& .form-group": {
                                display: "flex",
                                p: "0 2.4rem 0 1.2rem",
                                "& .form-label": {
                                    mr: "3rem",
                                    textAlign: "end",
                                    color: "#495057",
                                    minWidth: "12rem",
                                    fontSize: "1.6rem",
                                    lineHeight: "3.2rem",
                                },
                                "& .form-input": {
                                    outline: "none",
                                    color: "#495057",
                                    p: "0.6rem 1rem",
                                    fontSize: "1.6rem",
                                    borderRadius: "0.3rem",
                                    border: "1px solid #ccc",
                                },
                                "&.error .form-input": {
                                    borderColor: "#d32f2f",
                                    borderWidth: "2px",
                                    "::placeholder": {
                                        color: "#d32f2f",
                                        opacity: 1,
                                    },
                                },
                                "& .form-message": {
                                    mt: "0.2rem",
                                    ml: "1rem",
                                    color: "#d32f2f",
                                    fontSize: "1.4rem",
                                },
                            },
                        }}
                    >
                        <div className={`form-group ${errors.username ? "error" : ""}`}>
                            <label className='form-label'>Tên đăng nhập</label>
                            {user.username ? (
                                <Typography
                                    className='useFont-Nunito'
                                    sx={{
                                        px: "1.2rem",
                                        color: "#495057",
                                        fontSize: "1.6rem",
                                        lineHeight: "3.2rem",
                                    }}
                                >
                                    {user.username}
                                </Typography>
                            ) : (
                                <div
                                    style={{
                                        flexGrow: 1,
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <input
                                        className='form-input'
                                        placeholder='Tên đăng nhập'
                                        defaultValue=''
                                        {...register("username", {
                                            pattern: /^[a-zA-Z0-9]([a-zA-Z0-9]){1,14}[a-zA-Z0-9]$/,
                                            minLength: 3,
                                            maxLength: 16,
                                        })}
                                    />

                                    {errors?.username?.type === "pattern" && <span className='form-message'>Tên đăng nhập viết thường không dấu bao gồm chữ cái thường hoặc số</span>}
                                    {errors?.username?.type === "validate" && <span className='form-message'>Tên đăng nhập đã tồn tại</span>}
                                    {(errors?.username?.type === "minLength" || errors?.username?.type === "maxLength") && (
                                        <span className='form-message'>Tên đăng nhập có độ dài từ 3 đến 16 ký tự</span>
                                    )}
                                </div>
                            )}
                        </div>
                        <div className={`form-group ${errors.full_name ? "error" : ""}`}>
                            <label className='form-label'>Họ tên</label>
                            <div
                                style={{
                                    flexGrow: 1,
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <input
                                    className='form-input'
                                    placeholder='Họ tên'
                                    {...register("full_name", {
                                        required: true,
                                    })}
                                />
                                {errors?.full_name?.type === "required" && <span className='form-message'>Vui lòng nhập vào họ tên của bạn</span>}
                            </div>
                        </div>
                        <div className={`form-group ${errors.email ? "error" : ""}`}>
                            <label className='form-label'>Email</label>
                            <div
                                style={{
                                    flexGrow: 1,
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <input
                                    className='form-input'
                                    placeholder='Email'
                                    {...register("email", {
                                        required: true,
                                        pattern: /^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/,
                                    })}
                                />
                                {errors?.email?.type === "required" && <span className='form-message'>Vui lòng nhập vào email của bạn</span>}
                                {errors?.email?.type === "pattern" && <span className='form-message'>Vui lòng nhập đúng định dạng email</span>}
                            </div>
                        </div>
                        <div className={`form-group ${errors.phone ? "error" : ""}`}>
                            <label className='form-label'>Số điện thoại</label>
                            <div
                                style={{
                                    flexGrow: 1,
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <input
                                    className='form-input'
                                    placeholder='Số điện thoại'
                                    {...register("phone", {
                                        required: true,
                                        pattern: /^\d+$/,
                                        minLength: 10,
                                        maxLength: 10,
                                    })}
                                />
                                {errors?.phone?.type === "required" && <span className='form-message'>Vui lòng nhập vào số điện thoại của bạn</span>}
                                {(errors?.phone?.type === "pattern" || errors?.phone?.type === "maxLength" || errors?.phone?.type === "minLength") && (
                                    <span className='form-message'>Vui lòng nhập đúng số điện thoại của bạn để chúng tôi có thể liên hệ khi nhận hàng</span>
                                )}
                            </div>
                        </div>
                        <div className={`form-group ${errors.address ? "error" : ""}`}>
                            <label className='form-label'>Địa chỉ</label>
                            <div
                                style={{
                                    flexGrow: 1,
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <input
                                    className='form-input'
                                    placeholder='Địa chỉ'
                                    {...register("address", {
                                        required: true,
                                    })}
                                />
                                {errors?.address?.type === "required" && <span className='form-message'>Vui lòng nhập vào địa chỉ của bạn để chúng tôi có thể giao đến cho bạn</span>}
                            </div>
                        </div>
                        <div className='form-group'>
                            <label className='form-label'>Giới tính</label>
                            <div
                                style={{
                                    flexGrow: 1,
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <div>
                                    <label className='form-label'>
                                        <input {...register("gender")} type='radio' value='Nam' /> Nam
                                    </label>
                                    <label className='form-label'>
                                        <input {...register("gender")} type='radio' value='Nữ' /> Nữ
                                    </label>
                                    <label className='form-label'>
                                        <input {...register("gender")} type='radio' value='Khác' /> Khác
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className='form-group'>
                            <label className='form-label'>Ngày sinh</label>
                            <div
                                style={{
                                    flexGrow: 1,
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <input className='form-input' type='date' placeholder='Ngày sinh' defaultValue={user.date_of_birth} {...register("date_of_birth")} />
                            </div>
                        </div>
                    </StyledBox>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                        width: "20rem",
                        "& input[type='file']": {
                            display: "none",
                        },
                        "& button": {
                            mt: "1rem",
                            cursor: "pointer",
                            p: "0.8rem 1.6rem",
                            backgroundColor: "#fff",
                            borderRadius: "0.4rem",
                            border: "1px solid #ccc",
                        },
                        "& img": {
                            mt: "4rem",
                            width: "12rem",
                            height: "12rem",
                            borderRadius: "50%",
                            objectFit: "cover",
                        },
                    }}
                >
                    <img src={preview} alt='' />
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            avatarRef.current.click();
                        }}
                    >
                        Chọn Ảnh
                    </button>
                    <input
                        type='file'
                        ref={avatarRef}
                        accept='image/*'
                        onChange={(e) => {
                            const newAvatar = e.target.files[0];
                            if (newAvatar) {
                                setImage(newAvatar);
                                setValue("avatar", newAvatar);
                            }
                        }}
                    />
                </Box>
                <Button
                    sx={{
                        ml: "15rem",
                        py: "0.2rem",
                        minWidth: "10rem",
                        textTransform: "none",
                        position: "absolute",
                        bottom: -10,
                    }}
                    type='submit'
                >
                    Lưu
                </Button>
            </Box>
            <Snackbar open={snackbar.isOpen} autoHideDuration={5000} onClose={handleCloseSnackbar}>
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbar.type}
                    sx={{
                        width: "100%",
                        fontSize: "1.6rem",
                    }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Profile;
