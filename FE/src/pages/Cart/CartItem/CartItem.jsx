import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import { BsDash, BsPlus } from "react-icons/bs";
import { Box, Button as MuiButton, Typography } from "@mui/material";

import axiosClient from "../../../api/axiosClient";
import { Button } from "../../../components/Button";
import { currencyFormat } from "../../../styles/GlobalStyles";
import { setCart as setCartStore, cartIncreaseQuantity, cartReducedQuantity } from "../cartSlice";
const StyledBox = styled(Box)({
    minWidth: "21rem",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
});
const StyledTypography = styled(Typography)({
    color: "#495057",
    fontSize: "1.6rem",
});
const StyledButton = styled(MuiButton)({
    padding: 0,
    minWidth: 0,
    border: "1px solid rgba(204,204,204, 0.5)",
    ":hover": {
        border: "1px solid #ccc",
    },
});
const CartItem = ({ value }) => {
    const [cart, setCart] = React.useState(value);
    const [quantity, setQuantity] = React.useState(value.quantity);

    const userId = useSelector((state) => state.user.id);

    const dispatch = useDispatch();

    const handleDelete = () => {
        async function delCart() {
            const res = await axiosClient.delete(`/carts/${cart.id}?member_id=${userId}`);
            dispatch(setCartStore(res.data.data));
        }
        delCart();
    };

    const handleIncrease = () => {
        setQuantity((prevState) => prevState + 1);
        dispatch(cartIncreaseQuantity(cart.id));
        async function increase() {
            const res = await axiosClient.put(`/carts/${cart.id}`, {
                quantity: quantity + 1,
            });
            setCart(res.data.data);
        }
        increase();
    };

    const handleReduced = () => {
        setQuantity((prevState) => prevState - 1);
        dispatch(cartReducedQuantity(cart.id));
        async function reduced() {
            const res = await axiosClient.put(`/carts/${cart.id}`, {
                quantity: quantity - 1,
            });
            setCart(res.data.data);
        }
        reduced();
    };
    return (
        <Box
            sx={{
                mt: "1.6rem",
                p: "1.6rem 2rem",
                borderRadius: "0.4rem",
                boxShadow: "0 0 2rem #e5e5e5",
                display: "flex",
            }}
        >
            <StyledBox
                className='productInfo'
                sx={{
                    flexGrow: 1,
                }}
            >
                <Box
                    sx={{
                        width: "8rem",
                        "& img": {
                            width: "100%",
                        },
                    }}
                >
                    <img alt='' src={"http://localhost:8000/" + cart.product.image[0].url} />
                </Box>
                <Box
                    sx={{
                        flexGrow: 1,
                        ml: "1.6rem",
                        textAlign: "left",
                        alignSelf: "flex-start",
                        "& > h3": {
                            m: 0,
                            color: "#495057",
                            fontSize: "1.8rem",
                        },
                        "& > h6": {
                            m: "1rem 0 0",
                            display: "flex",
                            color: "#999",
                            fontWeight: 500,
                            fontSize: "1.4rem",
                            "& .product-size": {
                                ml: "0.8rem",
                                mr: "0.4rem",
                                fontWeight: 700,
                                color: "#495057",
                            },
                            "& .product-color": {
                                ml: "0.8rem",
                                width: "1.6rem",
                                height: "1.6rem",
                                borderRadius: "50%",
                                display: "inline-block",
                                border: "1px solid #fff",
                                backgroundPosition: "center",
                                boxShadow: "#333f48 0 0 0 1px",
                                backgroundImage: `url(http://localhost:8000/${cart.color})`,
                            },
                        },
                    }}
                >
                    <h3>{cart.product.name}</h3>
                    <h6>
                        {cart.size && (
                            <>
                                Size:
                                <span className='product-size'>{cart.size}</span> /
                            </>
                        )}
                        Màu:<span className='product-color'></span>
                    </h6>
                </Box>
            </StyledBox>
            <StyledBox>
                <StyledTypography
                    sx={{
                        ".old-price": {
                            mr: "1rem",
                            color: "#b2b2b2",
                            textDecoration: "line-through",
                        },
                    }}
                >
                    {cart.product.discount !== 0 && <span className='old-price'>{currencyFormat(cart.product.price)}</span>}
                    <span className='new-price'>
                        {cart.product.discount !== 0 ? currencyFormat(Math.ceil((cart.product.price * (100 - cart.product.discount)) / 100)) : currencyFormat(cart.product.price)}
                    </span>
                </StyledTypography>
            </StyledBox>
            <StyledBox
                sx={{
                    position: "relative",
                    flexDirection: "column",
                    "& .quantityError": {
                        position: "absolute",
                        bottom: 0,
                        color: "#d32f2f",
                        fontSize: "1.4rem",
                        whiteSpace: "nowrap",
                    },
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        "& > button svg": {
                            fontSize: "2.8rem",
                            color: "#495057",
                        },
                        "& > button.Mui-disabled svg": {
                            fontSize: "2.8rem",
                            color: "#999",
                        },
                    }}
                >
                    <StyledButton variant='outlined' disabled={quantity === 1} onClick={handleReduced}>
                        <BsDash />
                    </StyledButton>
                    <StyledTypography
                        className='useFont-Nunito'
                        sx={{
                            mx: "1.2rem",
                            fontSize: "1.8rem",
                            alignSelf: "center",
                        }}
                    >
                        {quantity}
                    </StyledTypography>
                    <StyledButton variant='outlined' disabled={quantity === cart.product.quantity} onClick={handleIncrease}>
                        <BsPlus />
                    </StyledButton>
                </Box>
                {quantity === cart.product.quantity && <span className='quantityError'>Đã đạt đến giới hạn số lượng hàng có sẵn!</span>}
            </StyledBox>
            <StyledBox>
                <StyledTypography>{currencyFormat(Math.ceil((cart.product.price * (100 - cart.product.discount)) / 100) * quantity)}</StyledTypography>
            </StyledBox>
            <Box
                sx={{
                    width: "15rem",
                    textAlign: "center",
                    alignSelf: "center",
                }}
            >
                <Button
                    onClick={handleDelete}
                    variant='text'
                    sx={{
                        textTransform: "none",
                        p: "0 1.2rem",
                        "&.buttonText": {
                            color: "#d32f2f",
                            ":hover": {
                                color: "#fff",
                            },
                        },
                    }}
                >
                    Xóa
                </Button>
            </Box>
        </Box>
    );
};

export default React.memo(CartItem);
