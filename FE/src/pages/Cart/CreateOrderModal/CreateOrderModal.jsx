import React from "react";
import { Box, Dialog, DialogActions, DialogContent, Divider, Radio, Snackbar, FormControlLabel } from "@mui/material";
import RadioGroup, { useRadioGroup } from "@mui/material/RadioGroup";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";

import axiosClient from "../../../api/axiosClient";
import { Button } from "../../../components/Button";
import { currencyFormat } from "../../../styles/GlobalStyles";
import styles from "./createOrderModal.module.scss";

import { Alert } from "../../../components/Alert";

const StyledDialog = styled(Dialog)({
    "& .MuiPaper-root": {
        maxWidth: "unset",
    },
    "& .MuiTypography-root.MuiDialogTitle-root": {
        fontSize: "2rem",
    },
    "& .MuiTypography-root.MuiDialogContentText-root": {
        fontSize: "1.6rem",
    },
});

const StyledButton = styled(Button)({
    textTransform: "none",
    padding: "0.2rem 1.2rem",
});

const columns = [
    { field: "name", headerName: "Tên sản phẩm", width: 200 },
    { field: "color", headerName: "Màu sắc", width: 60 },
    { field: "size", headerName: "Kích thước", width: 66 },
    { field: "quantity", headerName: "Số lượng", width: 66 },
    { field: "total", headerName: "Thành tiền", width: 120 },
];

const StyledFormControlLabel = styled((props) => <FormControlLabel {...props} />)(({ theme, checked }) => ({
    ".MuiFormControlLabel-label": {
        fontSize: 17,
        color: checked && "black",
    },
}));

function MyFormControlLabel(props) {
    const radioGroup = useRadioGroup();

    let checked = false;

    if (radioGroup) {
        checked = radioGroup.value === props.value;
    }

    return <StyledFormControlLabel checked={checked} {...props} />;
}

export default function CreateOrderModal({ isOpen, onClose, products = [], updateCartsRedux = () => {} }) {
    const user = useSelector((state) => state.user);

    const [snackbar, setSnackbar] = React.useState({
        isOpen: false,
        type: "",
        message: "",
    });

    const handleSubmit = async () => {
        try {
            const body = {
                member_id: user.id,
                cart_items: products?.map((item) => ({
                    quantity: item.quantity,
                    total_price: Math.ceil((item.product.price * (100 - item.product.discount)) / 100) * item.quantity,
                    product_id: item.product_id,
                    color: item.color,
                    size: item.size,
                })),
            };

            const res = await axiosClient.post(`/orders`, body);

            axiosClient.delete(`/carts/delete-all?member_id=${user.id}`);

            setSnackbar({
                isOpen: true,
                type: "success",
                message: res.data.message,
            });
            onClose();

            setTimeout(() => {
                updateCartsRedux();
            }, 1500);
        } catch (error) {
            setSnackbar({
                isOpen: true,
                type: "success",
                message: "Có lỗi xảy ra",
            });
        }
    };

    const handleCloseSnackbar = (e, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setSnackbar((prev) => ({ ...prev, isOpen: false }));
    };

    return (
        <>
            <StyledDialog
                className='update-form'
                open={isOpen}
                onClose={onClose}
                sx={{
                    "& .MuiPaper-root": {
                        width: "100rem",
                        overflow: "hidden",
                    },
                }}
            >
                {/* <DialogTitle>Thông tin đơn hàng</DialogTitle> */}
                <DialogContent
                    sx={{
                        pt: "2rem!important",
                        flexDirection: "column",
                    }}
                >
                    <Box
                        sx={{
                            flexDirection: "column",
                        }}
                    >
                        <div className={styles.infor}>
                            <Box
                                sx={{
                                    fontSize: 20,
                                    mb: 2,
                                    fontWeight: 500,
                                    color: "black",
                                }}
                            >
                                Thông tin đơn hàng:
                            </Box>
                            <Box
                                className={styles.container}
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    padding: "0 12px",
                                }}
                            >
                                <div className={styles.group}>
                                    <label className={styles.label}>Khách hàng</label>
                                    <p className={styles.text}>{user?.full_name}</p>
                                </div>
                                <div className={styles.group}>
                                    <label className={styles.label}>Địa chỉ</label>
                                    <p className={styles.text}>{user?.address}</p>
                                </div>
                                <div className={styles.group}>
                                    <label className={styles.label}>Số điện thoại</label>
                                    <p className={styles.text}>{user?.phone}</p>
                                </div>
                            </Box>

                            <Divider sx={{ mb: 1 }} />
                            <Box display='flex' alignItems='center'>
                                <Box
                                    component='span'
                                    sx={{
                                        mr: 2,
                                        fontSize: 16,
                                        color: "black",
                                        fontWeight: 500,
                                    }}
                                >
                                    Hình thức thanh toán:
                                </Box>

                                <RadioGroup onChange={(e) => console.log(e.target.value)} name='use-radio-group' defaultValue='0'>
                                    <Box display='flex' alignItems='center'>
                                        <MyFormControlLabel value='0' label='Ship code' control={<Radio />} />
                                        {/* <MyFormControlLabel
										value="1"
										label="Card"
										control={<Radio />}
									/> */}
                                    </Box>
                                </RadioGroup>
                            </Box>
                            <Divider sx={{ my: 1 }} />

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
                                        {products?.map((orderDetail, index) => (
                                            <tr key={index} className={index % 2 === 0 ? "even" : "odd"}>
                                                <td>{orderDetail?.product.name}</td>
                                                <td>
                                                    <span
                                                        className={styles.orderDetailColor}
                                                        style={{
                                                            backgroundImage: `url(http://localhost:8000/${orderDetail?.color})`,
                                                        }}
                                                    ></span>
                                                </td>
                                                <td>{orderDetail?.size}</td>
                                                <td>{orderDetail?.quantity}</td>
                                                <td style={{ color: "red" }}>
                                                    {currencyFormat(Math.ceil((orderDetail.product.price * (100 - orderDetail.product.discount)) / 100) * orderDetail.quantity)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot className='tfoot'>
                                        <tr>
                                            <th colSpan='1'>Tổng thanh toán:</th>
                                            <td
                                                colSpan='3'
                                                style={{
                                                    fontSize: 20,
                                                    paddingTop: 18,
                                                }}
                                            >
                                                {currencyFormat(products.reduce((total, item) => total + Math.ceil((item.product.price * (100 - item.product.discount)) / 100) * item.quantity, 0))}
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </Box>
                </DialogContent>
                <DialogActions
                    sx={{
                        px: "2.4rem",
                    }}
                >
                    <StyledButton variant='text' onClick={handleSubmit}>
                        Xác nhận
                    </StyledButton>
                    <StyledButton variant='text' onClick={onClose}>
                        Thoát
                    </StyledButton>
                </DialogActions>
            </StyledDialog>

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
        </>
    );
}
