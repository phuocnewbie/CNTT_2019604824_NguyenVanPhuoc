import React from "react";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import { Box, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Link, Pagination, Snackbar, LinearProgress } from "@mui/material";

import axiosClient from "../../api/axiosClient";
import { useDebounce } from "../../hook";
import { Button } from "../../components/Button";
import { Alert } from "../../components/Alert";
import { TextField } from "../../components/TextField";
import { Select } from "../../components/Select";
import "../../styles/DataTable/dataTable.scss";

const columns = [
    { field: "id", headerName: "Mã thành viên", width: 100 },
    { field: "full_name", headerName: "Họ tên", width: 200 },
    { field: "email", headerName: "Email", width: 160 },
    { field: "phone", headerName: "Số điện thoại", width: 160 },
    { field: "address", headerName: "Địa chỉ", width: 260 },
];
const StyledButton = styled(Button)({
    textTransform: "none",
    padding: "0.2rem 1.2rem",
    marginLeft: "2rem!important",
});
const StyledTextField = styled(TextField)({
    width: "100%",
    margin: "0.8rem 0",
});
const MemberManager = () => {
    document.title = "Thành viên | Hoàn Mỹ Store";
    const user = useSelector((state) => state.user);
    const [totalPage, setTotalPage] = React.useState();
    const [page, setPage] = React.useState(1);
    const [search, setSearch] = React.useState("");
    const [data, setData] = React.useState([]);
    const [roles, setRoles] = React.useState([]);
    const [openDetail, setOpenDetail] = React.useState(false);
    const [openDelForm, setOpenDelForm] = React.useState(false);
    const [memberInfor, setMemberInfor] = React.useState({});
    const [isLoading, setIsLoading] = React.useState(false);
    const debounceSearch = useDebounce(search, 500);
    const [callApi, setCallApi] = React.useState(Math.random());
    const [snackbar, setSnackbar] = React.useState({
        isOpen: false,
        type: "",
        message: "",
    });

    React.useEffect(() => {
        async function getData() {
            setIsLoading(true);
            const res = await Promise.all([axiosClient.get(`/members?keyword=${debounceSearch}&page=${page}`), axiosClient.get(`/roles`)]);
            setRoles(res[1].data.data);
            setData(res[0].data.data.data);
            setPage(res[0].data.data.current_page);
            setTotalPage(res[0].data.data.last_page);
            setIsLoading(false);
        }
        getData();
    }, [page, debounceSearch, callApi]);

    const handleCloseSnackbar = (e, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setSnackbar((prev) => ({ ...prev, isOpen: false }));
    };
    const handleChangePage = (e, value) => {
        setPage(value);
    };
    const handleOpenDetail = (row) => {
        setOpenDetail(true);
        setMemberInfor(row);
    };
    const handleCloseDetail = () => {
        setOpenDetail(false);
    };
    const handleUpdateRole = () => {
        async function updateRole() {
            try {
                const res = await axiosClient.post(`/members/role/${memberInfor.id}`, {
                    role_id: memberInfor.role_id,
                });
                setSnackbar({
                    isOpen: true,
                    type: "success",
                    message: res.data.message,
                });
                setOpenDetail(false);
                setCallApi(Math.random());
            } catch (err) {
                setSnackbar({
                    isOpen: true,
                    type: "error",
                    message: err.response.data.message,
                });
                setOpenDetail(false);
            }
        }
        updateRole();
    };
    const handleDeleteMember = () => {
        async function deleteMember() {
            try {
                const res = await axiosClient.delete(`/members/${memberInfor.id}?user_role=${user.role_id}`);
                setSnackbar({
                    isOpen: true,
                    type: "success",
                    message: res.data.message,
                });
                setOpenDetail(false);
                setOpenDelForm(false);
                setCallApi(Math.random());
            } catch (err) {
                setSnackbar({
                    isOpen: true,
                    type: "error",
                    message: err.response.data.message,
                });
                setOpenDetail(false);
                setOpenDelForm(false);
            }
        }
        deleteMember();
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
            <Typography className='heading useFont-Nunito'>Thành viên</Typography>
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
                                        Chưa có thành viên nào
                                    </td>
                                </tr>
                            ) : (
                                data.map((row, index) => (
                                    <tr key={index} className={index % 2 === 0 ? "even" : "odd"}>
                                        <td>{row.id}</td>
                                        <td>{row.full_name}</td>
                                        <td>{row.email}</td>
                                        <td>{row.phone}</td>
                                        <td>{row.address}</td>
                                        <td className='go-to-detail' align='center'>
                                            <Link
                                                underline='hover'
                                                sx={{
                                                    mr: "1rem",
                                                }}
                                                onClick={() => handleOpenDetail(row)}
                                            >
                                                Xem
                                            </Link>
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
            <Dialog
                className='detail-form'
                open={openDetail}
                onClose={handleCloseDetail}
                sx={{
                    "& .MuiPaper-root": {
                        width: "50rem",
                    },
                    "& .MuiTypography-root.MuiDialogTitle-root": {
                        fontSize: "2rem",
                    },
                    "& .MuiTypography-root.MuiDialogContentText-root": {
                        fontSize: "1.6rem",
                    },
                }}
            >
                <DialogTitle>Thông tin thành viên</DialogTitle>
                <DialogContent
                    sx={{
                        pt: "1rem!important",
                        flexDirection: "column",
                    }}
                >
                    <StyledTextField
                        label='Họ tên'
                        value={memberInfor.full_name}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <StyledTextField
                        label='Email'
                        value={memberInfor.email}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <StyledTextField
                        label='Số điện thoại'
                        value={memberInfor.phone}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <StyledTextField
                        label='Địa chỉ'
                        value={memberInfor.address}
                        multiline
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <StyledTextField
                        label='Tên đăng nhập'
                        value={memberInfor.username}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    {user.role_id === "r0" && (
                        <Select
                            label='Quyền'
                            options={roles}
                            value={memberInfor.role_id}
                            onChange={(e) =>
                                setMemberInfor((prev) => ({
                                    ...prev,
                                    role_id: e.target.value,
                                }))
                            }
                            disabledEmValue={true}
                            sx={{
                                mt: "0.8rem",
                            }}
                        />
                    )}
                </DialogContent>
                <DialogActions
                    sx={{
                        px: "2.4rem",
                    }}
                >
                    {user.role_id === "r0" && (
                        <StyledButton variant='text' onClick={handleUpdateRole}>
                            Cập nhật
                        </StyledButton>
                    )}
                    <StyledButton variant='text' onClick={() => setOpenDelForm(true)}>
                        Xóa
                    </StyledButton>
                    <StyledButton variant='text' onClick={handleCloseDetail}>
                        Đóng
                    </StyledButton>
                </DialogActions>
            </Dialog>
            <Dialog
                className='del-form'
                open={openDelForm}
                onClose={() => setOpenDelForm(false)}
                sx={{
                    "& .MuiPaper-root": {
                        maxWidth: "40rem",
                    },
                    "& .mess": {
                        m: 0,
                        fontSize: "1.6rem",
                        textAlign: "center",
                    },
                }}
            >
                <DialogTitle>Xóa thành viên</DialogTitle>
                <DialogContent>
                    <p className='mess'>Hành động này không thể hoàn tác, vẫn tiếp tục xóa thành viên {memberInfor.id} ?</p>
                </DialogContent>
                <DialogActions>
                    <StyledButton variant='text' onClick={handleDeleteMember}>
                        Đồng ý
                    </StyledButton>
                    <StyledButton variant='text' onClick={() => setOpenDelForm(false)}>
                        Hủy
                    </StyledButton>
                </DialogActions>
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
    );
};

export default MemberManager;
