import React from "react";
import { Controller, useForm } from "react-hook-form";
import { styled } from "@mui/material/styles";
import { Box, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Link, Pagination, Snackbar, LinearProgress } from "@mui/material";
import axiosClient from "../../api/axiosClient";
import { useDebounce } from "../../hook";
import { Button } from "../../components/Button";
import { TextField } from "../../components/TextField";
import { Select } from "../../components/Select";
import { Alert } from "../../components/Alert";
import { formatDate } from "../../styles/GlobalStyles";
import "../../styles/DataTable/dataTable.scss";

const columns = [
    { field: "carousel_id", headerName: "Mã slide", width: 130 },
    { field: "title", headerName: "Tiêu đề", width: 160 },
    { field: "category", headerName: "Danh mục", width: 160 },
    { field: "status", headerName: "Trạng thái", width: 160 },
    { field: "date", headerName: "Ngày tạo", width: 160 },
];

const statuses = [
    {
        name: "Đang hoạt động",
    },
    {
        name: "Đang tắt",
    },
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
const ContactManager = () => {
    document.title = "Carousel | Hoàn Mỹ Store";
    const [totalPage, setTotalPage] = React.useState();
    const [page, setPage] = React.useState(1);
    const [search, setSearch] = React.useState("");
    const [data, setData] = React.useState([]);
    const [categories, setCategories] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [image, setImage] = React.useState();
    const [preview, setPreview] = React.useState();
    const [openAddForm, setOpenAddForm] = React.useState(false);
    const [openDelForm, setOpenDelForm] = React.useState(false);
    const [openUpdateForm, setOpenUpdateForm] = React.useState(false);
    const [callApi, setCallApi] = React.useState(Math.random());
    const [delId, setDelId] = React.useState();
    const debounceSearch = useDebounce(search, 500);
    const [updateId, setUpdateId] = React.useState();
    const [snackbar, setSnackbar] = React.useState({
        isOpen: false,
        type: "",
        message: "",
    });

    const avatarRef = React.useRef();

    const {
        control,
        handleSubmit,
        formState: { errors },
        clearErrors,
        setError,
        setValue,
    } = useForm();

    const {
        control: control2,
        handleSubmit: handleSubmit2,
        formState: { errors: errors2 },
        clearErrors: clearErrors2,
        setValue: setValue2,
    } = useForm();

    React.useEffect(() => {
        async function getData() {
            setIsLoading(true);
            const res = await Promise.all([axiosClient.get(`/categories/all`), axiosClient.get(`/carousels?keyword=${debounceSearch}&page=${page}`)]);
            setCategories(res[0].data.data);
            setData(res[1].data.data.data);
            setPage(res[1].data.data.current_page);
            setTotalPage(res[1].data.data.last_page);
            setIsLoading(false);
        }
        getData();
    }, [page, debounceSearch, callApi]);

    React.useEffect(() => {
        if (image) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(image);
        } else {
            setPreview((prev) => prev);
        }
    }, [image]);

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
        setValue("title", "");
        setValue("category_id", "");
        setValue("status", "Đang hoạt động");
        setPreview(undefined);
        setImage(undefined);
    };
    const handleOpenUpdateForm = (row) => {
        setOpenUpdateForm(true);
        setUpdateId(row.id);
        setValue2("title", row.title);
        setValue2("category_id", row.category_id);
        setValue2("status", row.status);
        setPreview("http://localhost:8000/" + data.filter((carousel) => carousel.id === row.id)[0].image);
    };
    const handleOpenDelForm = (value) => {
        setOpenDelForm(true);
        setDelId(value);
    };

    const handleCloseAddForm = () => {
        setOpenAddForm(false);
        clearErrors();
        setPreview(undefined);
        setImage(undefined);
    };
    const handleCloseUpdateForm = () => {
        setOpenUpdateForm(false);
        clearErrors2();
        setPreview(undefined);
        setImage(undefined);
    };

    const onDel = () => {
        setOpenDelForm(false);
        async function delCategory() {
            try {
                const res = await axiosClient.delete(`/carousels/${delId}`);
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
    const onAdd = (data) => {
        setOpenAddForm(false);
        async function createCarousel() {
            try {
                const formData = new FormData();

                Object.keys(data).forEach((item) => {
                    formData.append(item, data[item]);
                });
                if (data.image) formData.append("image", data.image);
                const res = await axiosClient.post(`/carousels`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                setSnackbar({
                    isOpen: true,
                    type: "success",
                    message: res.data.message,
                });
                setCallApi(Math.random());
                setOpenAddForm(false);
            } catch (err) {
                console.log(err);
            }
        }
        createCarousel();
    };
    const onUpdate = (data) => {
        async function updateCarousel() {
            try {
                const formData = new FormData();
                Object.keys(data).forEach((item) => {
                    formData.append(item, data[item]);
                });
                if (data.image) formData.append("image", data.image);
                const res = await axiosClient.post(`/carousels/${updateId}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                console.log(res);
                setSnackbar({
                    isOpen: true,
                    type: "success",
                    message: res.data.message,
                });
                setOpenUpdateForm(false);
                setCallApi(Math.random());
            } catch (err) {
                setSnackbar({
                    isOpen: true,
                    type: "error",
                    message: err.response.data.message,
                });
                setOpenUpdateForm(false);
            }
        }
        updateCarousel();
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
            <Typography className='heading useFont-Nunito'>Carousel</Typography>
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
                                        <td>{row.id}</td>
                                        <td>{row.title}</td>
                                        <td>{row.category.name}</td>
                                        <td className={row.status === "Đang tắt" ? "error" : "success"}>{row.status}</td>
                                        <td>{formatDate(row.created_at)}</td>
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
                <DialogTitle>Xóa slide</DialogTitle>
                <DialogContent>
                    <p className='mess'>Hành động này không thể hoàn tác, vẫn tiếp tục xóa slide {delId} ?</p>
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
            <StyledDialog
                className='add-form'
                open={openAddForm}
                onClose={handleCloseAddForm}
                sx={{
                    "& .MuiPaper-root": {
                        width: "50rem",
                    },
                }}
            >
                <Box component='form' noValidate onSubmit={handleSubmit(onAdd)}>
                    <DialogTitle>Thêm slide</DialogTitle>
                    <DialogContent
                        sx={{
                            pt: "2rem!important",
                            flexDirection: "column",
                        }}
                    >
                        <Controller
                            name='title'
                            control={control}
                            rules={{
                                required: "Vui lòng nhập trường này",
                            }}
                            render={({ field }) => {
                                return (
                                    <TextField
                                        label='Tiêu đề'
                                        sx={{
                                            mb: "1.5rem",
                                            width: "100%",
                                        }}
                                        error={Boolean(errors.title)}
                                        helperText={errors?.title ? errors.title.message : ""}
                                        {...field}
                                    />
                                );
                            }}
                        />
                        <Controller
                            name='category_id'
                            control={control}
                            rules={{
                                required: "Vui lòng chọn danh mục",
                            }}
                            render={({ field }) => <Select label='Danh mục' options={categories} isError={Boolean(errors.category_id)} errorMessage={errors.category_id?.message} field={field} />}
                        />
                        <Box
                            sx={{
                                "& > p": {
                                    mb: "0.8rem",
                                    fontWeight: 500,
                                    fontSize: "1.6rem",
                                },
                                "& .error-message": {
                                    mt: "0.8rem",
                                    ml: "1.2rem",
                                    display: "block",
                                    color: "#d32f2f",
                                    fontSize: "1.3rem",
                                },
                            }}
                        >
                            <p>Hình ảnh</p>
                            {errors.image && <span className='error-message'>{errors.image.message}</span>}
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    flexDirection: "column",
                                    width: "100%",
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
                                        width: "100%",
                                        objectFit: "cover",
                                    },
                                }}
                            >
                                <img alt='' src={preview} />
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
                                        const newImage = e.target.files[0];
                                        if (newImage) {
                                            setImage(newImage);
                                            setValue("image", newImage);
                                            clearErrors("image");
                                        }
                                    }}
                                />
                            </Box>
                        </Box>
                    </DialogContent>
                    <DialogActions
                        sx={{
                            px: "2.4rem",
                        }}
                    >
                        <StyledButton
                            variant='text'
                            type='submit'
                            onClick={() => {
                                if (!image)
                                    setError("image", {
                                        type: "required",
                                        message: "Vui lòng chọn một hình ảnh",
                                    });
                            }}
                        >
                            Thêm
                        </StyledButton>
                        <StyledButton variant='text' onClick={handleCloseAddForm}>
                            Hủy
                        </StyledButton>
                    </DialogActions>
                </Box>
            </StyledDialog>
            <StyledDialog
                className='update-form'
                open={openUpdateForm}
                onClose={handleCloseUpdateForm}
                sx={{
                    "& .MuiPaper-root": {
                        width: "50rem",
                    },
                }}
            >
                <Box component='form' noValidate onSubmit={handleSubmit2(onUpdate)}>
                    <DialogTitle>Cập nhật slide</DialogTitle>
                    <DialogContent
                        sx={{
                            pt: "2rem!important",
                            flexDirection: "column",
                        }}
                    >
                        <Controller
                            name='title'
                            control={control2}
                            rules={{
                                required: "Vui lòng nhập trường này",
                            }}
                            render={({ field }) => {
                                return (
                                    <TextField
                                        label='Tiêu đề'
                                        sx={{
                                            mb: "1.5rem",
                                            width: "100%",
                                        }}
                                        error={Boolean(errors2.title)}
                                        helperText={errors2?.title ? errors2.title.message : ""}
                                        {...field}
                                    />
                                );
                            }}
                        />
                        <Controller
                            name='category_id'
                            control={control2}
                            rules={{
                                required: "Vui lòng chọn danh mục",
                            }}
                            render={({ field }) => <Select label='Danh mục' options={categories} isError={Boolean(errors2.category_id)} errorMessage={errors2.category_id?.message} field={field} />}
                        />
                        <Controller
                            name='status'
                            control={control2}
                            rules={{
                                required: "Vui lòng chọn trạng thái",
                            }}
                            render={({ field }) => (
                                <Select
                                    sx={{
                                        mt: "1.5rem",
                                    }}
                                    label='Trạng thái'
                                    options={statuses}
                                    disabledEmValue
                                    isError={Boolean(errors2.status)}
                                    errorMessage={errors2.status?.message}
                                    field={field}
                                />
                            )}
                        />
                        <Box
                            sx={{
                                "& > p": {
                                    mb: "0.8rem",
                                    fontWeight: 500,
                                    fontSize: "1.6rem",
                                },
                                "& > img": {
                                    width: "100%",
                                },
                            }}
                        >
                            <p>Hình ảnh</p>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    flexDirection: "column",
                                    width: "100%",
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
                                        width: "100%",
                                        objectFit: "cover",
                                    },
                                }}
                            >
                                <img alt='' src={preview} />
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
                                        const newImage = e.target.files[0];
                                        if (newImage) {
                                            setImage(newImage);
                                            setValue2("image", newImage);
                                        }
                                    }}
                                />
                            </Box>
                        </Box>
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

export default ContactManager;
