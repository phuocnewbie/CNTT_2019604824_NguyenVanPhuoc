import React from "react";
import { styled } from "@mui/material/styles";
import { Box, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Link, Pagination, Snackbar, LinearProgress } from "@mui/material";

import axiosClient from "../../api/axiosClient";
import { useDebounce } from "../../hook";
import { Alert } from "../../components/Alert";
import { Button } from "../../components/Button";
import { TextField } from "../../components/TextField";
import "../../styles/DataTable/dataTable.scss";
import styles from "./contactManager.module.scss";

const columns = [
    { field: "id", headerName: "Mã liên hệ", width: 100 },
    { field: "name", headerName: "Danh xưng", width: 160 },
    { field: "email", headerName: "Email", width: 160 },
    { field: "phone", headerName: "Số điện thoại", width: 160 },
    { field: "content", headerName: "Nội dung", width: 280 },
];
const StyledButton = styled(Button)({
    textTransform: "none",
    padding: "0.2rem 1.2rem",
});
const StyledDialog = styled(Dialog)({
    "& .MuiTypography-root.MuiDialogTitle-root": {
        fontSize: "2rem",
    },
    "& .MuiTypography-root.MuiDialogContentText-root": {
        fontSize: "1.6rem",
    },
});
const CarouselManager = () => {
    document.title = "Liên hệ | Hoàn Mỹ Store";
    const [totalPage, setTotalPage] = React.useState();
    const [page, setPage] = React.useState(1);
    const [search, setSearch] = React.useState("");
    const [data, setData] = React.useState([]);
    const [openFeedbackForm, setOpenFeedbackForm] = React.useState(false);
    const [feedbackId, setFeedbackId] = React.useState();
    const debounceSearch = useDebounce(search, 500);
    const [isLoading, setIsLoading] = React.useState(false);
    const [btnLoading, setBtnLoading] = React.useState(false);
    const [callApi, setCallApi] = React.useState(Math.random());
    const [snackbar, setSnackbar] = React.useState({
        isOpen: false,
        type: "",
        message: "",
    });

    React.useEffect(() => {
        async function getData() {
            setIsLoading(true);
            const res = await axiosClient.get(`/contacts?keyword=${debounceSearch}&page=${page}`);
            setData(res.data.data.data);
            setPage(res.data.data.current_page);
            setTotalPage(res.data.data.last_page);
            setIsLoading(false);
        }
        getData();
    }, [page, debounceSearch, callApi]);

    const handleChangePage = (e, value) => {
        setPage(value);
    };
    const handleCloseSnackbar = (e, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setSnackbar((prev) => ({ ...prev, isOpen: false }));
    };
    const handleOpenFeedbackForm = (row) => {
        setOpenFeedbackForm(true);
        setFeedbackId(row.id);
    };
    const handleCloseFeedbackForm = () => {
        setOpenFeedbackForm(false);
    };
    const onSubmit = () => {
        async function sendMail() {
            setBtnLoading(true);
            try {
                const res = await axiosClient.put(`/contacts/${feedbackId}`, {
                    is_feedback: true,
                });
                setOpenFeedbackForm(false);
                setSnackbar({
                    isOpen: true,
                    type: "success",
                    message: res.data.message,
                });
            } catch (err) {
                setSnackbar({
                    isOpen: true,
                    type: "error",
                    message: err.response.data.message,
                });
                setOpenFeedbackForm(false);
            }
            setCallApi(Math.random());
            setBtnLoading(false);
        }
        sendMail();
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                ".heading": {
                    color: "#495057",
                    fontSize: "2.8rem",
                },
            }}
        >
            <Typography className='heading useFont-Nunito'>Liên hệ</Typography>
            <Box
                sx={{
                    p: "2rem",
                    mt: "2rem",
                    flexGrow: 1,
                    display: "flex",
                    borderRadius: "0.4rem",
                    backgroundColor: "#fff",
                    flexDirection: "column",
                    border: "1px solid #eaeaea",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                    }}
                >
                    <TextField
                        label='Tìm kiếm'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        sx={{
                            minWidth: "28rem",
                        }}
                    />
                </Box>
                <Box
                    sx={{
                        mt: "2rem",
                        flexGrow: 1,
                        width: "100%",
                    }}
                >
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
                                <th
                                    style={{
                                        width: "10%",
                                    }}
                                ></th>
                            </tr>
                        </thead>
                        <tbody className='table-body'>
                            {isLoading ? (
                                <tr>
                                    <td colSpan={Object.keys(columns).length + 1} align='center'>
                                        <LinearProgress color='inherit' />
                                    </td>
                                </tr>
                            ) : data.length === 0 ? (
                                <tr>
                                    <td colSpan={Object.keys(columns).length + 1} align='center'>
                                        Chưa có liên hệ nào
                                    </td>
                                </tr>
                            ) : (
                                data.map((row, index) => (
                                    <tr key={index} className={index % 2 === 0 ? "even" : "odd"}>
                                        <td>{row.id}</td>
                                        <td>{row.full_name}</td>
                                        <td>{row.email}</td>
                                        <td>{row.phone}</td>
                                        <td>{row.content}</td>
                                        <td className='go-to-detail' align='center'>
                                            {!row.is_feedback && (
                                                <Link
                                                    underline='hover'
                                                    sx={{
                                                        mr: "1rem",
                                                    }}
                                                    onClick={() => handleOpenFeedbackForm(row)}
                                                >
                                                    Phản hồi
                                                </Link>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={Object.keys(columns).length + 1}>
                                    <Pagination count={totalPage} variant='outlined' shape='rounded' page={page} onChange={handleChangePage} />
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </Box>
            </Box>
            <StyledDialog
                className='feedback-form'
                open={openFeedbackForm}
                onClose={handleCloseFeedbackForm}
                sx={{
                    "& .MuiPaper-root": {
                        width: "50rem",
                    },
                    "& .mess": {
                        m: 0,
                        fontSize: "1.6rem",
                        textAlign: "center",
                    },
                }}
            >
                <DialogTitle>Phản hồi khách hàng</DialogTitle>
                <DialogContent>
                    <p className='mess'>Xác nhận gửi phản hồi đến khách hàng này ?</p>
                </DialogContent>

                <DialogActions
                    sx={{
                        px: "2.4rem",
                    }}
                >
                    <StyledButton variant='text' onClick={onSubmit}>
                        {btnLoading ? (
                            <div className={styles.spinner}>
                                <span>Đ</span>
                                <span>A</span>
                                <span>N</span>
                                <span>G</span>
                                <span>G</span>
                                <span>Ử</span>
                                <span>I</span>
                            </div>
                        ) : (
                            "Gửi"
                        )}
                    </StyledButton>
                    <StyledButton variant='text' onClick={handleCloseFeedbackForm}>
                        Hủy
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
        </Box>
    );
};

export default CarouselManager;
