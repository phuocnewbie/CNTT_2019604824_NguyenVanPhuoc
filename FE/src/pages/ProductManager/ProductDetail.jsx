import React from "react";
import clsx from "clsx";
import { v4 as uuid } from "uuid";
import { useForm, Controller } from "react-hook-form";
import { useParams, Link, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Box, IconButton, Typography, Snackbar, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { FaTimes } from "react-icons/fa";
import { BsPlusLg, BsArrowLeftShort } from "react-icons/bs";

import axiosClient from "../../api/axiosClient";
import { Alert } from "../../components/Alert";
import { Button } from "../../components/Button";
import { TextField } from "../../components/TextField";
import styles from "./productDetail.module.scss";
const StyledButton = styled(Button)({
    textTransform: "none",
    minWidth: "12rem",
    marginRight: "2rem",
    padding: "0.4rem 1.2rem",
});
const ProductDetail = () => {
    const { id } = useParams();
    const [isEdit, setIsEdit] = React.useState(false);
    const [openDelForm, setOpenDelForm] = React.useState(false);
    const [openAddSize, setOpenAddSize] = React.useState(false);
    const [product, setProduct] = React.useState({});
    const [categories, setCategories] = React.useState([]);
    const [colors, setColors] = React.useState([]);
    const [images, setImages] = React.useState([]);
    const [allSize, setAllSize] = React.useState([]);
    const [sizes, setSizes] = React.useState([]);
    const [colorImg, setColorImg] = React.useState();
    const [productImg, setProductImg] = React.useState();
    const [callApi, setCallApi] = React.useState(Math.random());
    const [snackbar, setSnackbar] = React.useState({
        isOpen: false,
        type: "",
        message: "",
    });

    const colorRef = React.useRef();
    const imgRef = React.useRef();
    const navigate = useNavigate();

    React.useEffect(() => {
        async function getData() {
            const res = await Promise.all([axiosClient.get(`/sizes`), axiosClient.get(`/categories/all`), axiosClient.get(`/products/${id}`)]);
            setAllSize(res[0].data.data);
            setCategories(res[1].data.data);
            setProduct(res[2].data.data);
            setSizes(res[2].data.data.size);
            setImages(
                res[2].data.data.image.map((img) => ({
                    ...img,
                    url: "http://localhost:8000/" + img.url,
                })),
            );
            setColors(
                res[2].data.data.color.map((cr) => ({
                    ...cr,
                    url: "http://localhost:8000/" + cr.url,
                })),
            );
        }
        getData();
    }, [callApi, id]);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const {
        control,
        handleSubmit: handleSubmit2,
        formState: { errors: errors2 },
        setValue,
        clearErrors,
        setError,
    } = useForm();

    document.title = product.name;

    React.useEffect(() => {
        if (colorImg) {
            const reader = new FileReader();
            async function createColor() {
                try {
                    const formData = new FormData();
                    formData.append("url", colorImg);
                    formData.append("product_id", product.id);
                    axiosClient.post("/colors", formData, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    });
                    setCallApi(Math.random());
                } catch (err) {
                    console.log(err);
                }
            }
            createColor();
            reader.onloadend = () => {
                setColors((prevState) => [...prevState, { id: uuid(), url: reader.result }]);
            };
            reader.readAsDataURL(colorImg);
        }
        if (productImg) {
            const reader = new FileReader();
            async function createProductImg() {
                try {
                    const formData = new FormData();
                    formData.append("url", productImg);
                    formData.append("product_id", product.id);
                    axiosClient.post("/images", formData, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    });
                    setCallApi(Math.random());
                } catch (err) {
                    console.log(err);
                }
            }
            createProductImg();
            reader.onloadend = () => {
                setImages((prevState) => [...prevState, { id: uuid(), url: reader.result }]);
            };
            reader.readAsDataURL(productImg);
        }

        return () => {
            setColorImg(null);
            setProductImg(null);
        };
    }, [colorImg, productImg, product.id]);

    const handleCloseSnackbar = (e, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setSnackbar((prev) => ({ ...prev, isOpen: false }));
    };
    const handleOpenAddSize = () => {
        setOpenAddSize(true);
        setValue("product_id", product.id);
        setValue("description", "");
    };
    const handleCloseAddSize = () => {
        setOpenAddSize(false);
        clearErrors();
    };
    const handleDeleteProduct = (id) => {
        async function delProduct() {
            try {
                await axiosClient.delete(`/products/${product.id}`);
                setOpenDelForm(false);
                navigate("/manager/products");
            } catch (err) {
                setOpenDelForm(false);
                setSnackbar({
                    isOpen: true,
                    type: "error",
                    message: err.response.data.message,
                });
            }
        }
        delProduct();
    };
    const handleDeteleColor = (id) => {
        setColors((prevState) => prevState.filter((color) => color.id !== id));
        async function delColor() {
            try {
                await axiosClient.delete(`/colors/${id}`);
            } catch (err) {
                console.log(err);
            }
        }
        delColor();
    };
    const handleToggleSize = (value) => {
        if (isEdit === true)
            setSizes((prevState) => {
                if (prevState.filter((size) => size.size_id === value.id).length !== 0) {
                    async function delProductColor() {
                        try {
                            await axiosClient.post(`/product-sizes/delete`, {
                                product_id: product.id,
                                size_id: value.id,
                            });
                        } catch (err) {
                            console.log(err);
                        }
                    }
                    delProductColor();
                    return prevState.filter((size) => size.size_id !== value.id);
                } else {
                    async function addProductColor() {
                        try {
                            await axiosClient.post(`/product-sizes`, {
                                product_id: product.id,
                                size_id: value.id,
                            });
                        } catch (err) {
                            console.log(err);
                        }
                    }
                    addProductColor();
                    return [...prevState, { product_id: product.id, size_id: value.id }];
                }
            });
    };
    const handleDeteleProductImg = (id) => {
        setImages((prevState) => prevState.filter((image) => image.id !== id));
        async function delProductImg() {
            try {
                await axiosClient.delete(`/images/${id}`);
            } catch (err) {
                console.log(err);
            }
        }
        delProductImg();
    };
    const onAddSize = (data) => {
        const addSize = async () => {
            try {
                const res = await axiosClient.post("/sizes", {
                    ...data,
                });
                setCallApi(Math.random());
                setOpenAddSize(false);
                setSnackbar({
                    isOpen: true,
                    type: "success",
                    message: res.data.message,
                });
            } catch (err) {
                setError("description", {
                    type: "validate",
                    message: err.response.data.message,
                });
            }
        };
        addSize();
    };
    const onSubmit = (data) => {
        async function updateProduct() {
            try {
                const res = await axiosClient.put(`/products/${product.id}`, {
                    ...data,
                });
                setCallApi(Math.random());
                setSnackbar({
                    isOpen: true,
                    type: "success",
                    message: res.data.message,
                });
                setIsEdit(false);
            } catch (err) {
                setIsEdit(false);
                setSnackbar({
                    isOpen: true,
                    type: "error",
                    message: err.response.data.message,
                });
            }
        }
        updateProduct();
    };
    return (
        <Box
            sx={{
                display: "flex",
                position: "relative",
                flexDirection: "column",
                ".heading": {
                    color: "#495057",
                    fontSize: "2.8rem",
                    mb: "1rem",
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
            <Link to='/manager/products' className='prevButton navLink linkNoneUnderline'>
                <BsArrowLeftShort />
            </Link>
            <Typography className='heading useFont-Nunito'>Chi tiết sản phẩm</Typography>
            <Box
                sx={{
                    borderRadius: "0.4rem",
                    backgroundColor: "#fff",
                    p: "2rem",
                }}
            >
                <Box className={styles.infor}>
                    <Box
                        component={isEdit ? "form" : "div"}
                        noValidate
                        onSubmit={handleSubmit(onSubmit)}
                        sx={{
                            mr: "4rem",
                            "& .form-group": {
                                display: "flex",
                                "& .form-label": {
                                    mr: "3rem",
                                    fontWeight: 700,
                                    color: "#495057",
                                    minWidth: "12rem",
                                    fontSize: "1.6rem",
                                    lineHeight: "3.2rem",
                                },
                                "& .form-input": {
                                    resize: "none",
                                    outline: "none",
                                    color: "#495057",
                                    p: "0.4rem 1rem",
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
                        <div className={styles.group}>
                            <div className={`form-group ${errors.name ? "error" : ""}`}>
                                <label className='form-label'>Tên sản phẩm:</label>
                                <div
                                    style={{
                                        flexGrow: 1,
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    {isEdit === true ? (
                                        <input
                                            className='form-input'
                                            placeholder='Tên sản phẩm'
                                            defaultValue={product.name}
                                            {...register("name", {
                                                required: true,
                                            })}
                                        />
                                    ) : (
                                        <p className={styles.text}>{product.name}</p>
                                    )}
                                    {errors?.name?.type === "required" && <span className='form-message'>Vui lòng nhập vào tên sản phẩm</span>}
                                </div>
                            </div>
                        </div>
                        <div className={styles.group}>
                            <div className={`form-group ${errors.category_id ? "error" : ""}`}>
                                <label className='form-label'>Danh mục:</label>
                                <div
                                    style={{
                                        flexGrow: 1,
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    {isEdit === true ? (
                                        <select className='form-input' defaultValue={product.category_id} {...register("category_id")}>
                                            {categories.map((category) => (
                                                <option key={category.id} value={category.id}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        <p className={styles.text}>{product.category_name}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className={styles.group}>
                            <div className={`form-group ${errors.price ? "error" : ""}`}>
                                <label className='form-label'>Đơn giá</label>
                                <div
                                    style={{
                                        flexGrow: 1,
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    {isEdit === true ? (
                                        <input
                                            className='form-input'
                                            placeholder='Đơn giá'
                                            defaultValue={product.price}
                                            {...register("price", {
                                                required: true,
                                                pattern: /^\d+$/u,
                                            })}
                                        />
                                    ) : (
                                        <p className={styles.text}>{product.price}</p>
                                    )}

                                    {errors?.price?.type === "required" && <span className='form-message'>Vui lòng nhập vào đơn giá của sản phẩm</span>}
                                    {errors?.price?.type === "pattern" && <span className='form-message'>Đơn giá của sản phẩm chỉ chứa số</span>}
                                </div>
                            </div>
                        </div>
                        <div className={styles.group}>
                            <div className={`form-group ${errors.quantity ? "error" : ""}`}>
                                <label className='form-label'>Số lượng:</label>
                                <div
                                    style={{
                                        flexGrow: 1,
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    {isEdit === true ? (
                                        <input
                                            className='form-input'
                                            placeholder='Số lượng'
                                            defaultValue={product.quantity}
                                            {...register("quantity", {
                                                required: true,
                                                pattern: /^\d+$/u,
                                            })}
                                        />
                                    ) : (
                                        <p className={styles.text}>{product.quantity}</p>
                                    )}
                                    {errors?.quantity?.type === "required" && <span className='form-message'>Vui lòng nhập vào số lượng sản phẩm đang có</span>}
                                    {errors?.quantity?.type === "pattern" && <span className='form-message'>Số lượng hàng chỉ chứa số</span>}
                                </div>
                            </div>
                        </div>
                        <div className={styles.group}>
                            <div className={`form-group ${errors.discount ? "error" : ""}`}>
                                <label className='form-label'>Giảm giá:</label>
                                <div
                                    style={{
                                        flexGrow: 1,
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    {isEdit === true ? (
                                        <input
                                            className='form-input'
                                            placeholder='Giảm giá'
                                            defaultValue={product.discount}
                                            {...register("discount", {
                                                pattern: /^[0-9.]+$/,
                                                min: 0,
                                                max: 100,
                                            })}
                                        />
                                    ) : (
                                        <p className={styles.text}>{product.discount}%</p>
                                    )}
                                    {errors?.discount?.type === "min" && <span className='form-message'>Không có khuyến mãi vui lòng bỏ qua</span>}
                                    {errors?.discount?.type === "max" && <span className='form-message'>Mức ưu đãi lớn nhất có thể là 100%</span>}
                                    {errors?.discount?.type === "pattern" && <span className='form-message'>Nhập vào số phần trăm giảm giá là một số thực dương</span>}
                                </div>
                            </div>
                        </div>
                        <div className={styles.group}>
                            <div className={`form-group ${errors.description ? "error" : ""}`}>
                                <label className='form-label'>Mô tả:</label>
                                <div
                                    style={{
                                        flexGrow: 1,
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    {isEdit === true ? (
                                        <textarea
                                            className='form-input'
                                            placeholder='Mô tả'
                                            rows='4'
                                            defaultValue={product.description}
                                            {...register("description", {
                                                required: true,
                                            })}
                                        />
                                    ) : (
                                        <p
                                            className={styles.text}
                                            style={{
                                                overflowY: "scroll",
                                                height: "9rem",
                                            }}
                                        >
                                            {product.description}
                                        </p>
                                    )}

                                    {errors?.description?.type === "required" && <span className='form-message'>Vui lòng nhập vào mô tả sản phẩm</span>}
                                </div>
                            </div>
                        </div>
                        <Box
                            sx={{
                                mt: "2rem",
                                ml: "15rem",
                            }}
                        >
                            {isEdit && <StyledButton type='submit'>Cập nhật</StyledButton>}
                            {!isEdit && (
                                <>
                                    <StyledButton onClick={() => setIsEdit(true)}>Sửa</StyledButton>
                                    <StyledButton variant='text' onClick={() => setOpenDelForm(true)}>
                                        Xóa
                                    </StyledButton>
                                </>
                            )}
                        </Box>
                    </Box>
                    <div>
                        <div className={clsx(styles.group, styles.color)}>
                            <label className={styles.label}>Màu sắc</label>
                            <ul className={styles.colorList}>
                                {colors.map((color, index) => (
                                    <li key={index} className={styles.colorItem}>
                                        <span
                                            style={{
                                                backgroundImage: `url(${color.url})`,
                                            }}
                                        ></span>
                                        {isEdit && (
                                            <IconButton className={styles.delColor} onClick={() => handleDeteleColor(color.id)}>
                                                <FaTimes />
                                            </IconButton>
                                        )}
                                    </li>
                                ))}
                                {isEdit && (
                                    <Box
                                        className={styles.addContainer}
                                        sx={{
                                            "& input": {
                                                display: "none",
                                            },
                                        }}
                                    >
                                        <button
                                            className={styles.addBtn}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                colorRef.current.click();
                                            }}
                                        >
                                            <BsPlusLg />
                                        </button>
                                        <input
                                            type='file'
                                            ref={colorRef}
                                            accept='image/*'
                                            onChange={(e) => {
                                                const newImg = e.target.files[0];
                                                if (newImg) setColorImg(newImg);
                                            }}
                                        />
                                    </Box>
                                )}
                            </ul>
                        </div>
                        <div className={clsx(styles.group, styles.size)}>
                            <label className={styles.label}>Kích cỡ</label>
                            <ul className={styles.sizeList}>
                                {allSize.map((size, index) => (
                                    <li
                                        key={index}
                                        className={clsx(styles.sizeItem, {
                                            [styles.active]: sizes.filter((field) => field.size_id === size.id).length !== 0,
                                        })}
                                    >
                                        <button onClick={() => handleToggleSize(size)}>{size.description}</button>
                                    </li>
                                ))}
                                {isEdit && (
                                    <Box
                                        className={styles.addContainer}
                                        sx={{
                                            "& input": {
                                                display: "none",
                                            },
                                        }}
                                    >
                                        <button className={styles.addBtn} onClick={handleOpenAddSize}>
                                            <BsPlusLg />
                                        </button>
                                    </Box>
                                )}
                            </ul>
                        </div>
                        <div className={clsx(styles.group, styles.image)}>
                            <label className={styles.label}>Hình ảnh</label>
                            <ul className={styles.imgList}>
                                {images.map((img, index) => (
                                    <li key={index} className={styles.imgItem}>
                                        <img alt='' src={img.url} />
                                        {isEdit && (
                                            <IconButton className={styles.delProductImg} onClick={() => handleDeteleProductImg(img.id)}>
                                                <FaTimes />
                                            </IconButton>
                                        )}
                                    </li>
                                ))}
                                {isEdit && (
                                    <Box
                                        className={styles.addContainer}
                                        sx={{
                                            mt: "2.5rem",
                                            "& input": {
                                                display: "none",
                                            },
                                        }}
                                    >
                                        <button
                                            className={styles.addBtn}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                imgRef.current.click();
                                            }}
                                        >
                                            <BsPlusLg />
                                        </button>
                                        <input
                                            type='file'
                                            ref={imgRef}
                                            accept='image/*'
                                            onChange={(e) => {
                                                const newImg = e.target.files[0];
                                                if (newImg) setProductImg(newImg);
                                            }}
                                        />
                                    </Box>
                                )}
                            </ul>
                        </div>
                    </div>
                </Box>
            </Box>
            <Dialog
                className='del-form'
                open={openDelForm}
                onClose={() => setOpenDelForm(false)}
                sx={{
                    "& .MuiPaper-root": {
                        maxWidth: "40rem",
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
                <DialogTitle>Xóa sản phẩm</DialogTitle>
                <DialogContent>
                    <p className='mess'>
                        Hành động này không thể hoàn tác, vẫn tiếp tục xóa sản phẩm có mã <strong>{product.id}</strong> ?
                    </p>
                </DialogContent>
                <DialogActions>
                    <StyledButton variant='text' onClick={handleDeleteProduct}>
                        Đồng ý
                    </StyledButton>
                    <StyledButton variant='text' onClick={() => setOpenDelForm(false)}>
                        Hủy
                    </StyledButton>
                </DialogActions>
            </Dialog>
            <Dialog
                className='add-size-form'
                open={openAddSize}
                onClose={handleCloseAddSize}
                sx={{
                    "& .MuiPaper-root": {
                        width: "44rem",
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
                <Box component='form' onSubmit={handleSubmit2(onAddSize)} noValidate>
                    <DialogTitle>Thêm kích cỡ</DialogTitle>
                    <DialogContent
                        sx={{
                            pt: "2rem!important",
                            flexDirection: "column",
                        }}
                    >
                        <Controller
                            name='description'
                            control={control}
                            rules={{
                                required: "Vui lòng nhập trường này!",
                            }}
                            render={({ field }) => (
                                <TextField
                                    label='Mô tả'
                                    error={Boolean(errors2.description)}
                                    helperText={errors2?.description ? errors2.description.message : ""}
                                    {...field}
                                    sx={{
                                        width: "100%",
                                    }}
                                />
                            )}
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
                        <StyledButton variant='text' onClick={handleCloseAddSize}>
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
    );
};

export default ProductDetail;
