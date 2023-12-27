import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import {
    Box,
    Typography,
    Link,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    FormControl,
    InputLabel,
    Select as MuiSelect,
    OutlinedInput,
    MenuItem,
    Checkbox,
    ListItemText,
    FormHelperText,
    Pagination,
    Snackbar,
    LinearProgress,
} from "@mui/material";

import axiosClient from "../../api/axiosClient";
import { useDebounce } from "../../hook";
import { Alert } from "../../components/Alert";
import { Button } from "../../components/Button";
import { TextField } from "../../components/TextField";
import { Select } from "../../components/Select";
import { currencyFormat } from "../../styles/GlobalStyles";
import "../../styles/DataTable/dataTable.scss";
const columns = [
    { field: "id", headerName: "Mã sản phẩm", width: 100 },
    { field: "category", headerName: "Danh mục", width: 140 },
    { field: "name", headerName: "Tên sản phẩm", width: 200 },
    { field: "price", headerName: "Đơn giá", width: 140 },
    { field: "quantity", headerName: "Số lượng", width: 140 },
    { field: "discount", headerName: "Giảm giá", width: 100 },
];
const StyledButton = styled(Button)({
    textTransform: "none",
    padding: "0.2rem 1.2rem",
});
const ProductManager = () => {
    document.title = "Sản phẩm | Hoàn Mỹ Store";
    const [totalPage, setTotalPage] = React.useState();
    const [page, setPage] = React.useState(1);
    const [search, setSearch] = React.useState("");
    const [data, setData] = React.useState([]);
    const [categories, setCategories] = React.useState([]);
    const [sizes, setSizes] = React.useState([]);
    const [sizesSelected, setSizesSelected] = React.useState([]);
    const [openAddForm, setOpenAddForm] = React.useState(false);
    const debounceSearch = useDebounce(search, 500);
    const [isLoading, setIsLoading] = React.useState(false);
    const [callApi, setCallApi] = React.useState(Math.random());
    const [snackbar, setSnackbar] = React.useState({
        isOpen: false,
        type: "",
        message: "",
    });

    const { pathname } = useLocation();
    const navigate = useNavigate();
    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
        clearErrors,
        setValue,
    } = useForm();
    React.useEffect(() => {
        async function getData() {
            setIsLoading(true);
            const res = await Promise.all([axiosClient.get(`/categories/all`), axiosClient.get("/sizes"), axiosClient.get(`/products?keyword=${debounceSearch}&page=${page}`)]);
            setCategories(res[0].data.data);
            setSizes(res[1].data.data);
            setData(res[2].data.data.data);
            setPage(res[2].data.data.current_page);
            setTotalPage(res[2].data.data.last_page);
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
        setValue("category_id", "");
        setValue("price", "");
        setValue("quantity", "");
        setValue("discount", 0);
        setValue("description", "");
        setSizesSelected([]);
    };
    const handleCloseAddForm = () => {
        setOpenAddForm(false);
        setSizesSelected([]);
        clearErrors();
    };
    const handleSelectSize = (event) => {
        const {
            target: { value },
        } = event;
        setSizesSelected(typeof value === "string" ? value.split(",") : value);
        if (sizesSelected.length !== 0) clearErrors("size");
    };
    const handleGoToDetail = (id) => {
        navigate(`${pathname}/${id}`);
    };
    const onAdd = (data) => {
        if (sizes.length !== 0) data.size = sizes.filter((size) => sizesSelected.includes(size.description)).map((size) => size.id);

        async function createProduct() {
            try {
                const formData = new FormData();

                Object.keys(data).forEach((item) => {
                    formData.append(item, data[item]);
                });
                if (data.image) Array.from(data.image).forEach((img) => formData.append("image[]", img));
                if (data.color) Array.from(data.color).forEach((value) => formData.append("color[]", value));
                if (data.size) Array.from(data.size).forEach((value) => formData.append("size[]", value));
                const res = await axiosClient.post(`/products`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                setOpenAddForm(false);
                setSnackbar({
                    isOpen: true,
                    type: "success",
                    message: res.data.message,
                });
                setCallApi(Math.random());
            } catch (err) {
                console.log(err);
            }
        }
        createProduct();
        setSizesSelected([]);
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
            <Typography className='heading useFont-Nunito'>Sản phẩm</Typography>
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
                        sx={{
                            minWidth: "16rem",
                            p: "0.4rem 1.2rem",
                        }}
                        onClick={handleOpenAddForm}
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
                                        Chưa có sản phẩm nào
                                    </td>
                                </tr>
                            ) : (
                                data.map((row, index) => (
                                    <tr key={index} className={index % 2 === 0 ? "even" : "odd"}>
                                        <td>{row.id}</td>
                                        <td>{row.category.name}</td>
                                        <td>{row.name}</td>
                                        <td>{currencyFormat(row.price)}</td>
                                        <td>{row.quantity}</td>
                                        <td>{row.discount}</td>
                                        <td className='go-to-detail' align='center'>
                                            <Link
                                                underline='hover'
                                                sx={{
                                                    mr: "1rem",
                                                }}
                                                onClick={() => handleGoToDetail(row.id)}
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
                <Dialog
                    className='add-form'
                    open={openAddForm}
                    onClose={handleCloseAddForm}
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
                    <Box component='form' noValidate onSubmit={handleSubmit(onAdd)}>
                        <DialogTitle>Thêm sản phẩm</DialogTitle>
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
                                render={({ field }) => {
                                    return (
                                        <TextField
                                            label='Tên sản phẩm'
                                            sx={{
                                                mb: "1.5rem",
                                                width: "100%",
                                            }}
                                            error={Boolean(errors.name)}
                                            helperText={errors?.name ? errors.name.message : ""}
                                            {...field}
                                        />
                                    );
                                }}
                            />
                            <Controller
                                name='category_id'
                                control={control}
                                rules={{
                                    required: "Vui lòng chọn danh mục!",
                                }}
                                render={({ field }) => <Select label='Danh mục' options={categories} isError={Boolean(errors.category_id)} errorMessage={errors.category_id?.message} field={field} />}
                            />
                            <Controller
                                name='price'
                                control={control}
                                rules={{
                                    required: "Vui lòng nhập trường này!",
                                    pattern: {
                                        value: /^\d+$/u,
                                        message: "Đơn giá chỉ chứa số!",
                                    },
                                    min: {
                                        value: 1,
                                        message: "Đơn giá phải lớn hơn 0!",
                                    },
                                }}
                                render={({ field }) => {
                                    return (
                                        <TextField
                                            label='Đơn giá'
                                            sx={{
                                                mt: "1.5rem",
                                                width: "100%",
                                            }}
                                            error={Boolean(errors.price)}
                                            helperText={errors?.price ? errors.price.message : ""}
                                            {...field}
                                        />
                                    );
                                }}
                            />
                            <Controller
                                name='quantity'
                                control={control}
                                rules={{
                                    required: "Vui lòng nhập trường này!",
                                    pattern: {
                                        value: /^\d+$/u,
                                        message: "Số lượng chỉ chứa số!",
                                    },
                                    min: {
                                        value: 1,
                                        message: "Số lượng phải lớn hơn 0!",
                                    },
                                }}
                                render={({ field }) => {
                                    return (
                                        <TextField
                                            label='Số lượng'
                                            sx={{
                                                mt: "1.5rem",
                                                width: "100%",
                                            }}
                                            error={Boolean(errors.quantity)}
                                            helperText={errors?.quantity ? errors.quantity.message : ""}
                                            {...field}
                                        />
                                    );
                                }}
                            />
                            <Controller
                                name='discount'
                                control={control}
                                rules={{
                                    pattern: {
                                        value: /^[0-9.]+$/,
                                        message: "Nhập vào số phần trăm giảm giá là một số thực dương!",
                                    },
                                    min: {
                                        value: 0,
                                        message: "Không có giảm giá vui lòng bỏ qua!",
                                    },
                                    max: {
                                        value: 100,
                                        message: "Mức ưu đãi lớn nhất có thể là 100%!",
                                    },
                                }}
                                render={({ field }) => {
                                    return (
                                        <TextField
                                            label='Giảm giá'
                                            sx={{
                                                mt: "1.5rem",
                                                width: "100%",
                                            }}
                                            error={Boolean(errors.discount)}
                                            helperText={errors?.discount ? errors.discount.message : ""}
                                            {...field}
                                        />
                                    );
                                }}
                            />
                            <Controller
                                name='description'
                                control={control}
                                rules={{
                                    required: "Vui lòng nhập trường này!",
                                }}
                                render={({ field }) => {
                                    return (
                                        <TextField
                                            label='Mô tả'
                                            sx={{
                                                mt: "1.5rem",
                                                width: "100%",
                                            }}
                                            multiline
                                            error={Boolean(errors.description)}
                                            helperText={errors?.description ? errors.description.message : ""}
                                            {...field}
                                        />
                                    );
                                }}
                            />
                            <FormControl
                                error={errors.size}
                                sx={{
                                    mt: "1.5rem",
                                    width: "100%",
                                    "& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "#333",
                                    },
                                    "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root": {
                                        fontSize: "1.6rem",
                                        transform: "translate(1.2rem, 0.8rem)",
                                    },

                                    "& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input": {
                                        p: "1.2rem",
                                        fontSize: "1.4rem",
                                        minHeight: "0!important",
                                    },
                                    "& .css-1sumxir-MuiFormLabel-root-MuiInputLabel-root": {
                                        fontSize: "1.6rem",
                                        "&.Mui-focused": {
                                            color: "#333",
                                        },
                                    },
                                    "& .css-14lo706": {
                                        fontSize: "1.2rem",
                                    },
                                    "& .css-1wc848c-MuiFormHelperText-root": {
                                        fontSize: "1.2rem",
                                    },
                                }}
                            >
                                <InputLabel>Kích cỡ</InputLabel>
                                <MuiSelect multiple value={sizesSelected} onChange={handleSelectSize} input={<OutlinedInput label='Kích cỡ' />} renderValue={(selected) => selected.join(", ")}>
                                    {sizes.map((size) => (
                                        <MenuItem key={size.id} value={size.description}>
                                            <Checkbox checked={sizesSelected.indexOf(size.description) > -1} />
                                            <ListItemText
                                                primary={size.description}
                                                sx={{
                                                    "& .css-10hburv-MuiTypography-root": {
                                                        fontSize: "1.4rem",
                                                    },
                                                }}
                                            />
                                        </MenuItem>
                                    ))}
                                </MuiSelect>
                                {errors.size && <FormHelperText>{errors.size.message}</FormHelperText>}
                            </FormControl>
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
                                <input
                                    type='file'
                                    accept='image/*'
                                    multiple
                                    {...register("image", {
                                        required: {
                                            value: true,
                                            message: "Vui lòng thêm một hình ảnh!",
                                        },
                                    })}
                                />
                                {errors.image && <span className='error-message'>{errors.image.message}</span>}
                            </Box>
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
                                <p>Màu sắc</p>
                                <input
                                    type='file'
                                    accept='image/*'
                                    multiple
                                    {...register("color", {
                                        required: {
                                            value: true,
                                            message: "Vui lòng thêm một hình ảnh!",
                                        },
                                    })}
                                />
                                {errors.color && <span className='error-message'>{errors.color.message}</span>}
                            </Box>
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
        </Box>
    );
};

export default ProductManager;
