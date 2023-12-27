import React from "react";
import { useForm, Controller } from "react-hook-form";
import { styled } from "@mui/material/styles";
import { Box, Typography, Link, Pagination, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, LinearProgress } from "@mui/material";

import axiosClient from "../../api/axiosClient";
import { useDebounce } from "../../hook";
import { Alert } from "../../components/Alert";
import { Button } from "../../components/Button";
import { TextField } from "../../components/TextField";
import "../../styles/DataTable/dataTable.scss";

const columns = [
    { field: "id", headerName: "Mã Danh Mục", width: 120 },
    { field: "name", headerName: "Tên Danh Mục", width: 160 },
    { field: "slug", headerName: "Slug", width: 120 },
];

const StyledButton = styled(Button)({
    textTransform: "none",
    padding: "0.2rem 1.2rem",
});
const TextFieldFull = styled(TextField)({
    width: "100%",
});
const StyledDialog = styled(Dialog)({
    "& .MuiTypography-root.MuiDialogTitle-root": {
        fontSize: "2rem",
    },
    "& .MuiTypography-root.MuiDialogContentText-root": {
        fontSize: "1.6rem",
    },
});

const CategoryManager = () => {
    document.title = "Danh mục | Hoàn Mỹ Store";
    const [totalPage, setTotalPage] = React.useState();
    const [page, setPage] = React.useState(1);
    const [search, setSearch] = React.useState("");
    const [data, setData] = React.useState([]);
    const [openAddForm, setOpenAddForm] = React.useState(false);
    const [openDelForm, setOpenDelForm] = React.useState(false);
    const [openUpdateForm, setOpenUpdateForm] = React.useState(false);
    const [delId, setDelId] = React.useState();
    const [updateId, setUpdateId] = React.useState();
    const debounceSearch = useDebounce(search, 500);
    const [isLoading, setIsLoading] = React.useState(false);
    const [callApi, setCallApi] = React.useState(Math.random());
    const [snackbar, setSnackbar] = React.useState({
        isOpen: false,
        type: "",
        message: "",
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
        setError,
        clearErrors,
    } = useForm();

    const {
        control: control2,
        handleSubmit: handleSubmit2,
        formState: { errors: errors2 },
        setValue: setValue2,
    } = useForm();

    React.useEffect(() => {
        async function getData() {
            setIsLoading(true);
            const res = await axiosClient.get(`/categories?keyword=${debounceSearch}&page=${page}`);
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
    const handleOpenAddForm = () => {
        setOpenAddForm(true);
        setValue("name", "");
        setValue("slug", "");
    };
    const handleCloseAddForm = () => {
        setOpenAddForm(false);
        clearErrors();
    };
    const handleOpenUpdateForm = (row) => {
        setUpdateId(row.id);
        setValue2("name", row.name);
        setValue2("slug", row.slug);
        setOpenUpdateForm(true);
    };
    const handleCloseUpdateForm = () => {
        setOpenUpdateForm(false);
        clearErrors();
    };
    const handleOpenDelForm = (value) => {
        setOpenDelForm(true);
        setDelId(value);
    };
    const onDel = () => {
        async function delCategory() {
            try {
                const res = await axiosClient.delete(`/categories/${delId}`);
                setSnackbar({
                    isOpen: true,
                    type: "success",
                    message: res.data.message,
                });
                setCallApi(Math.random());
                setOpenDelForm(false);
            } catch (err) {
                setSnackbar({
                    isOpen: true,
                    type: "error",
                    message: err.response.data.message,
                });
                setOpenDelForm(false);
                setCallApi(Math.random());
            }
        }
        delCategory();
    };

    const onUpdate = (data) => {
        async function updateCategory() {
            setOpenUpdateForm(false);
            try {
                const res = await axiosClient.put(`/categories/${updateId}`, {
                    ...data,
                });
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
            }
            setCallApi(Math.random());
        }
        updateCategory();
    };
    const onAdd = (data) => {
        async function createCategory() {
            try {
                const res = await axiosClient.post(`/categories`, {
                    ...data,
                });
                setSnackbar({
                    isOpen: true,
                    type: "success",
                    message: res.data.message,
                });
                setCallApi(Math.random());
                setOpenAddForm(false);
            } catch (err) {
                if (err.response.data.messageName) {
                    setError("name", {
                        type: "validate",
                        message: err.response.data.messageName,
                    });
                }
                if (err.response.data.messageSlug) {
                    setError("slug", {
                        type: "validate",
                        message: err.response.data.messageSlug,
                    });
                }
            }
        }
        createCategory();
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
            <Typography className='heading useFont-Nunito'>Danh mục</Typography>
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
                        justifyContent: "space-between",
                    }}
                >
                    <StyledButton
                        onClick={handleOpenAddForm}
                        sx={{
                            py: "0.4rem",
                            minWidth: "16rem",
                        }}
                    >
                        Thêm mới
                    </StyledButton>

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
                                        Không tìm thấy dữ liệu phù hợp!
                                    </td>
                                </tr>
                            ) : (
                                data.map((row, index) => (
                                    <tr key={index} className={index % 2 === 0 ? "even" : "odd"}>
                                        {Object.values(row).map((value, index) => (
                                            <td key={index}>{value}</td>
                                        ))}
                                        <td className='go-to-detail' align='center'>
                                            <Link
                                                underline='hover'
                                                sx={{
                                                    mr: "1rem",
                                                }}
                                                onClick={() => handleOpenUpdateForm(row)}
                                            >
                                                Sửa
                                            </Link>
                                            <Link underline='hover' onClick={() => handleOpenDelForm(row.id)}>
                                                Xóa
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
                <StyledDialog
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
                    <DialogTitle>Xóa danh mục</DialogTitle>
                    <DialogContent>
                        <p className='mess'>Hành động này không thể hoàn tác, vẫn tiếp tục xóa danh mục {delId} ?</p>
                    </DialogContent>
                    <DialogActions>
                        <StyledButton variant='text' onClick={onDel}>
                            Đồng ý
                        </StyledButton>
                        <StyledButton variant='text' onClick={() => setOpenDelForm(false)}>
                            Hủy
                        </StyledButton>
                    </DialogActions>
                </StyledDialog>
                <StyledDialog className='update-form' open={openUpdateForm} onClose={handleCloseUpdateForm}>
                    <Box component='form' onSubmit={handleSubmit2(onUpdate)} noValidate>
                        <DialogTitle>Cập nhật danh mục</DialogTitle>
                        <DialogContent
                            sx={{
                                pt: "2rem!important",
                                flexDirection: "column",
                            }}
                        >
                            <Controller
                                name='name'
                                control={control2}
                                rules={{
                                    required: "Vui lòng nhập trường này!",
                                }}
                                render={({ field }) => <TextFieldFull label='Tên danh mục' error={Boolean(errors2.name)} helperText={errors2?.name ? errors2.name.message : ""} {...field} />}
                            />
                            <Controller
                                name='slug'
                                control={control2}
                                rules={{
                                    required: "Vui lòng nhập trường này!",
                                    pattern: {
                                        value: /^[a-z-]+$/u,
                                        message: "Slug chỉ chứa chữ cái thường và dấu (-)",
                                    },
                                }}
                                render={({ field }) => {
                                    return (
                                        <TextFieldFull
                                            label='Slug'
                                            sx={{
                                                mt: "1.5rem",
                                            }}
                                            error={Boolean(errors2.slug)}
                                            helperText={errors2?.slug ? errors2.slug.message : ""}
                                            {...field}
                                        />
                                    );
                                }}
                            />
                        </DialogContent>
                        <DialogActions
                            sx={{
                                px: "2.4rem",
                            }}
                        >
                            <StyledButton variant='text' type='submit'>
                                Cập nhật
                            </StyledButton>
                            <StyledButton variant='text' onClick={handleCloseUpdateForm}>
                                Hủy
                            </StyledButton>
                        </DialogActions>
                    </Box>
                </StyledDialog>
                <StyledDialog className='add-form' open={openAddForm} onClose={handleCloseAddForm}>
                    <Box component='form' onSubmit={handleSubmit(onAdd)} noValidate>
                        <DialogTitle>Thêm danh mục</DialogTitle>
                        <DialogContent
                            sx={{
                                pt: "2rem!important",
                                flexDirection: "column",
                            }}
                        >
                            <Controller
                                name='name'
                                control={control}
                                rules={{
                                    required: "Vui lòng nhập trường này!",
                                }}
                                render={({ field }) => <TextFieldFull label='Tên danh mục' error={Boolean(errors.name)} helperText={errors?.name ? errors.name.message : ""} {...field} />}
                            />
                            <Controller
                                name='slug'
                                control={control}
                                rules={{
                                    required: "Vui lòng nhập trường này!",
                                    pattern: {
                                        value: /^[a-z-]+$/u,
                                        message: "Slug chỉ chứa chữ cái viết thường không dấu và dấu (-)",
                                    },
                                }}
                                render={({ field }) => {
                                    return (
                                        <TextFieldFull
                                            label='Slug'
                                            sx={{
                                                mt: "1.5rem",
                                            }}
                                            error={Boolean(errors.slug)}
                                            helperText={errors?.slug ? errors.slug.message : ""}
                                            {...field}
                                        />
                                    );
                                }}
                            />
                        </DialogContent>
                        <DialogActions
                            sx={{
                                px: "2.4rem",
                            }}
                        >
                            <StyledButton variant='text' type='submit'>
                                Thêm
                            </StyledButton>
                            <StyledButton variant='text' onClick={handleCloseAddForm}>
                                Hủy
                            </StyledButton>
                        </DialogActions>
                    </Box>
                </StyledDialog>
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

export default CategoryManager;
