import React from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Box, Typography, Snackbar } from "@mui/material";

import axiosClient from "../../api/axiosClient";
import { Alert } from "../../components/Alert";
import { Button } from "../../components/Button";
import contactUs from "../../assets/img/contact_us.jpg";
import styles from "./contact.module.scss";

const Contact = () => {
    const userId = useSelector((state) => state.user.id);
    const [isLoading, setIsLoading] = React.useState(false);
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
    } = useForm();

    const onSubmit = (data) => {
        if (userId) data.member_id = userId;
        async function sendContact() {
            setIsLoading(true);
            try {
                const res = await axiosClient.post("/contacts", {
                    ...data,
                });
                if (res.status === 201) {
                    setValue("full_name", "");
                    setValue("email", "");
                    setValue("phone", "");
                    setValue("content", "");
                    setSnackbar({
                        isOpen: true,
                        type: "success",
                        message: res.data.message,
                    });
                }
            } catch (err) {
                console.log(err);
            }
            setIsLoading(false);
        }
        sendContact();
    };
    const handleCloseSnackbar = (e, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setSnackbar((prev) => ({ ...prev, isOpen: false }));
    };

    return (
        <>
            <iframe
                title='map'
                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.4737883168514!2d105.73291811485473!3d21.053730985984767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31345457e292d5bf%3A0x20ac91c94d74439a!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBDw7RuZyBuZ2hp4buHcCBIw6AgTuG7mWk!5e0!3m2!1svi!2s!4v1652166330367!5m2!1svi!2s'
                style={{
                    border: 0,
                    width: "100%",
                    height: "50vh",
                }}
                allowFullScreen=''
                loading='lazy'
                referrerPolicy='no-referrer-when-downgrade'
            ></iframe>
            <Box
                className='grid-wide'
                sx={{
                    my: "4rem",
                    display: "flex",
                    "& img": {
                        width: "50%",
                    },
                }}
            >
                <img alt='' src={contactUs} />
                <Box
                    component='form'
                    noValidate
                    onSubmit={handleSubmit(onSubmit)}
                    className={styles.form}
                    sx={{
                        p: "4rem 6rem",
                        ml: "3rem",
                        flexGrow: 1,
                        display: "flex",
                        borderRadius: "0.4rem",
                        flexDirection: "column",
                        "& .form-group": {
                            mb: "1rem",
                            display: "flex",
                            "& .form-label": {
                                mr: "3rem",
                                textAlign: "end",
                                color: "#495057",
                                minWidth: "12rem",
                                fontSize: "1.6rem",
                                lineHeight: "3.2rem",
                            },
                            "& .form-input": {
                                resize: "none",
                                outline: "none",
                                color: "#495057",
                                p: "0.8rem 1.2rem",
                                fontSize: "1.6rem",
                                fontFamily: "Nunito",
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
                    <Typography
                        sx={{
                            mb: "2rem",
                            color: "#495057",
                            fontWeight: 700,
                            fontSize: "2.8rem",
                            fontFamily: "Nunito",
                            textAlign: "center",
                        }}
                    >
                        Liên hệ
                    </Typography>

                    <div
                        className={`form-group ${
                            errors.full_name ? "error" : ""
                        }`}
                    >
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
                            {errors?.full_name?.type === "required" && (
                                <span className='form-message'>
                                    Vui lòng nhập vào họ tên của bạn
                                </span>
                            )}
                        </div>
                    </div>
                    <div
                        className={`form-group ${errors.email ? "error" : ""}`}
                    >
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
                                    pattern:
                                        /^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/,
                                })}
                            />
                            {errors?.email?.type === "required" && (
                                <span className='form-message'>
                                    Vui lòng nhập vào email của bạn
                                </span>
                            )}
                            {errors?.email?.type === "pattern" && (
                                <span className='form-message'>
                                    Vui lòng nhập đúng định dạng email
                                </span>
                            )}
                        </div>
                    </div>
                    <div
                        className={`form-group ${errors.phone ? "error" : ""}`}
                    >
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
                            {errors?.phone?.type === "required" && (
                                <span className='form-message'>
                                    Vui lòng nhập vào số điện thoại của bạn
                                </span>
                            )}
                            {(errors?.phone?.type === "pattern" ||
                                errors?.phone?.type === "maxLength" ||
                                errors?.phone?.type === "minLength") && (
                                <span className='form-message'>
                                    Vui lòng nhập đúng số điện thoại của bạn để
                                    chúng tôi có thể liên hệ khi nhận hàng
                                </span>
                            )}
                        </div>
                    </div>

                    <div
                        className={`form-group ${errors.phone ? "error" : ""}`}
                    >
                        <div
                            style={{
                                flexGrow: 1,
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <textarea
                                className='form-input'
                                placeholder='Nội dung'
                                rows={6}
                                {...register("content", {
                                    required: true,
                                })}
                            />
                            {errors?.content?.type === "required" && (
                                <span className='form-message'>
                                    Vui lòng nhập vào nội dung cần hỗ trợ
                                </span>
                            )}
                        </div>
                    </div>

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                        }}
                    >
                        <Button
                            type='submit'
                            sx={{
                                textTransform: "none",
                                minWidth: "12rem",
                            }}
                        >
                            {!isLoading ? (
                                "Gửi"
                            ) : (
                                <div className={styles.spinner}>
                                    <div className={styles.dot}></div>
                                    <div className={styles.dot}></div>
                                    <div className={styles.dot}></div>
                                    <div className={styles.dot}></div>
                                    <div className={styles.dot}></div>
                                </div>
                            )}
                        </Button>
                    </Box>
                </Box>
                <Snackbar
                    open={snackbar.isOpen}
                    autoHideDuration={5000}
                    onClose={handleCloseSnackbar}
                >
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
        </>
    );
};

export default Contact;
