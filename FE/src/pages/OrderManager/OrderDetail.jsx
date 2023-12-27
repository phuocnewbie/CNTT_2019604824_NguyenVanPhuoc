import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { styled } from "@mui/material/styles";
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar } from "@mui/material";
import { BsArrowLeftShort } from "react-icons/bs";

import axiosClient from "../../api/axiosClient";
import { Alert } from "../../components/Alert";
import styles from "./orderDetail.module.scss";
import "../../styles/DataTable/dataTable.scss";
import { currencyFormat, formatDateTime } from "../../styles/GlobalStyles";
import { TextField } from "../../components/TextField";
const columns = [
    { field: "id", headerName: "Mã sản phẩm", width: 100 },
    { field: "name", headerName: "Tên sản phẩm", width: 200 },
    { field: "color", headerName: "Màu sắc", width: 80 },
    { field: "size", headerName: "Kích thước", width: 80 },
    { field: "quantity", headerName: "Số lượng", width: 80 },
];
const StyledButton = styled(Button)({
    fontSize: "1.6rem",
    fontFamily: "Nunito",
    textTransform: "none",
    padding: "0.2rem 1.2rem",
    minWidth: "12rem",
});
const OrderDetail = () => {
    const { id } = useParams();
    const [data, setData] = React.useState();
    const [cancelForm, setCancelForm] = React.useState(false);
    const [snackbar, setSnackbar] = React.useState({
        isOpen: false,
        type: "",
        message: "",
    });

    const navigate = useNavigate();

    const {
        control,
        handleSubmit,
        formState: { errors },
        clearErrors,
        setValue,
    } = useForm();
    React.useEffect(() => {
        async function getData() {
            const res = await axiosClient.get(`/orders/${id}`);
            setData(res.data.data);
        }
        getData();
    }, [id]);
    const handleCloseSnackbar = (e, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setSnackbar((prev) => ({ ...prev, isOpen: false }));
    };
    const handleOpenCancelForm = () => {
        setCancelForm(true);
        setValue("reason", "");
    };
    const handleCloseCancelForm = () => {
        setCancelForm(false);
        clearErrors();
    };
    const handleUpdateStatus = () => {
        const newStatus = data.status === "wait" ? "prepare" : data.status === "request cancel" ? "canceled" : "delivering";
        async function updateStatus() {
            try {
                const res = await axiosClient.post(`/orders/status/${data.id}`, {
                    status: newStatus,
                });
                setSnackbar({
                    isOpen: true,
                    type: "success",
                    message: res.data.message,
                });
                navigate("/manager/orders");
            } catch (err) {
                setSnackbar({
                    isOpen: true,
                    type: "error",
                    message: err.response.data.message,
                });
            }
        }
        updateStatus();
    };
    const onCancel = (value) => {
        async function cancel() {
            try {
                const res = await axiosClient.post(`/orders/cancel/${data.id}`, {
                    reason: value.reason,
                });
                setSnackbar({
                    isOpen: true,
                    type: "success",
                    message: res.data.message,
                });
                navigate("/manager/orders");
                setCancelForm(false);
            } catch (err) {
                setSnackbar({
                    isOpen: true,
                    type: "error",
                    message: err.response.data.message,
                });
                setCancelForm(false);
            }
        }
        cancel();
    };
    return (
        data && (
            <Box
                sx={{
                    display: "flex",
                    position: "relative",
                    flexDirection: "column",
                    ".heading": {
                        color: "#495057",
                        fontSize: "2.8rem",
                        mb: "2rem",
                    },
                    ".prevButton": {
                        fontSize: "4rem",
                        position: "absolute",
                        top: "-3rem",
                        right: 0,
                        color: "#333",
                    },
                }}
            >
                <Link to='/manager/orders' className='prevButton navLink linkNoneUnderline'>
                    <BsArrowLeftShort />
                </Link>
                <Typography className='heading useFont-Nunito'>Chi tiết đơn hàng</Typography>
                <Box
                    sx={{
                        flexDirection: "column",
                    }}
                >
                    <div className={styles.infor}>
                        <Box
                            className={styles.container}
                            sx={{
                                flexDirection: "column",
                            }}
                        >
                            <div className={styles.group}>
                                <label className={styles.label}>Mã đơn hàng</label>
                                <p className={styles.text}>{data.id}</p>
                            </div>
                            <div className={styles.group}>
                                <label className={styles.label}>Ngày lập</label>
                                <p className={styles.text}>{formatDateTime(data.created_at)}</p>
                            </div>
                            <div className={styles.group}>
                                <label className={styles.label}>Khách hàng</label>
                                <p className={styles.text}>{data.member.full_name}</p>
                            </div>
                            <div className={styles.group}>
                                <label className={styles.label}>Địa chỉ</label>
                                <p className={styles.text}>{data.member.address}</p>
                            </div>
                            <div className={styles.group}>
                                <label className={styles.label}>Số điện thoại</label>
                                <p className={styles.text}>{data.member.phone}</p>
                            </div>
                            {data.note && (
                                <div className={styles.group}>
                                    <label className={styles.label}>Lý do hủy</label>
                                    <p className={styles.text}>{data.note}</p>
                                </div>
                            )}
                        </Box>

                        <div className={styles.container}>
                            <table className='table'>
                                <thead className='table-head'>
                                    <tr>
                                        {columns.map((column) => (
                                            <th
                                                key={column.field}
                                                style={{
                                                    width: column.width || "100%",
                                                }}
                                            >
                                                {column.headerName}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className='table-body'>
                                    {data.order_detail.map((orderDetail, index) => (
                                        <tr key={index} className={index % 2 === 0 ? "even" : "odd"}>
                                            <td>{orderDetail.product.id}</td>
                                            <td>{orderDetail.product.name}</td>
                                            <td align='center'>
                                                <span
                                                    className={styles.orderDetailColor}
                                                    style={{
                                                        backgroundImage: `url(http://localhost:8000/${orderDetail.color})`,
                                                    }}
                                                ></span>
                                            </td>
                                            <td align='center'>{orderDetail.size}</td>
                                            <td align='center'>{orderDetail.quantity}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot className='tfoot'>
                                    <tr>
                                        <th colSpan='2'>Tổng thanh toán:</th>
                                        <td colSpan='3'>{currencyFormat(data.order_detail.reduce((total, order) => total + order.total_price, 0))}</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                    <Box
                        sx={{
                            mt: "2rem",
                        }}
                    >
                        {(data.status === "wait" || data.status === "prepare" || data.status === "request cancel") && (
                            <StyledButton
                                variant='contained'
                                color='success'
                                disableElevation
                                sx={{
                                    mr: "4rem",
                                }}
                                onClick={handleUpdateStatus}
                            >
                                {data.status === "prepare" ? "Tiếp theo" : "Xác nhận"}
                            </StyledButton>
                        )}
                        {data.status === "wait" && (
                            <StyledButton variant='contained' color='error' disableElevation onClick={handleOpenCancelForm}>
                                Từ chối
                            </StyledButton>
                        )}
                    </Box>
                </Box>
                <Dialog
                    className='del-form'
                    open={cancelForm}
                    onClose={handleCloseCancelForm}
                    sx={{
                        "& .MuiPaper-root": {
                            width: "40rem",
                        },
                        "& .MuiTypography-root.MuiDialogTitle-root": {
                            fontSize: "2rem",
                        },
                        "& .MuiTypography-root.MuiDialogContentText-root": {
                            fontSize: "1.6rem",
                        },
                        "& .mess": {
                            m: 0,
                            fontSize: "1.6rem",
                            textAlign: "center",
                        },
                    }}
                >
                    <Box component='form' onSubmit={handleSubmit(onCancel)} noValidate>
                        <DialogTitle>Từ chối đơn hàng</DialogTitle>
                        <DialogContent
                            sx={{
                                flexDirection: "column",
                            }}
                        >
                            <Controller
                                name='reason'
                                control={control}
                                rules={{
                                    required: "Vui lòng đưa ra lý do từ chối!",
                                }}
                                render={({ field }) => (
                                    <TextField
                                        label='Lý do'
                                        sx={{
                                            mt: "1.5rem",
                                            width: "100%",
                                        }}
                                        multiline
                                        error={Boolean(errors.reason)}
                                        helperText={errors?.reason ? errors.reason.message : ""}
                                        {...field}
                                    />
                                )}
                            />
                        </DialogContent>
                        <DialogActions
                            sx={{
                                "& button": {
                                    color: "#495057",
                                },
                            }}
                        >
                            <StyledButton variant='text' type='submit'>
                                Đồng ý
                            </StyledButton>
                            <StyledButton variant='text' onClick={handleCloseCancelForm}>
                                Hủy
                            </StyledButton>
                        </DialogActions>
                    </Box>
                </Dialog>
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
        )
    );
};

export default OrderDetail;
