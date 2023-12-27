import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import { Button } from "../../components/Button";
import { CartItem } from "./CartItem";
import { currencyFormat } from "../../styles/GlobalStyles";
import EmptyCart from "./EmptyCart";
import CreateOrderModal from "./CreateOrderModal/CreateOrderModal";
import { setCart as setCartStore } from "../Cart/cartSlice";

const StyledTypography = styled(Typography)({
    fontWeight: 700,
    color: "#495057",
    fontSize: "1.6rem",
    fontFamily: "Nunito",
});
const StyledBox = styled(Box)({
    minWidth: "21rem",
    textAlign: "center",
});
const StyledButton = styled(Button)({
    textTransform: "none",
    minWidth: "12rem",
});

const Cart = () => {
    const dispatch = useDispatch();
    const [openCreateOrder, setOpenCreateOrder] = React.useState(false);
    document.title = "Giỏ hàng | Hoàn Mỹ Store";
    const carts = useSelector((state) => state.cart.carts);
    return (
        <Box
            className='grid-wide'
            sx={{
                my: "6rem",
                flexGrow: 1,
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        fontSize: "3rem",
                        "& > h3": {
                            m: 0,
                        },
                    }}
                >
                    <h3 className='textColor'>Hoàn Mỹ Store</h3>
                    <Box
                        sx={{
                            mx: "3rem",
                            width: "0.4rem",
                            height: "3.6rem",
                            borderRadius: "0.4rem",
                            backgroundImage: "linear-gradient(45deg, #485563, #29323c)",
                        }}
                    ></Box>
                    <h3 className='textColor'>Cart</h3>
                </Box>
            </Box>
            {carts.length === 0 ? (
                <EmptyCart />
            ) : (
                <>
                    <Box
                        sx={{
                            mt: "4rem",
                            p: "1rem 2rem",
                            display: "flex",
                            borderRadius: "0.4rem",
                            boxShadow: "0 0 20px 1px #e5e5e5",
                        }}
                    >
                        <StyledBox
                            sx={{
                                flexGrow: 1,
                            }}
                        >
                            <StyledTypography
                                sx={{
                                    textAlign: "left",
                                }}
                            >
                                Sản phẩm
                            </StyledTypography>
                        </StyledBox>
                        <StyledBox>
                            <StyledTypography>Đơn giá</StyledTypography>
                        </StyledBox>
                        <StyledBox>
                            <StyledTypography>Số lượng</StyledTypography>
                        </StyledBox>
                        <StyledBox>
                            <StyledTypography>Số tiền</StyledTypography>
                        </StyledBox>
                        <Box
                            sx={{
                                width: "15rem",
                            }}
                        ></Box>
                    </Box>
                    {carts.map((cartItem) => (
                        <CartItem key={cartItem.id} value={cartItem} />
                    ))}
                    <Box
                        sx={{
                            p: "2rem 4rem",
                            mt: "1.6rem",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            boxShadow: "0 0 20px 1px #e5e5e5",
                        }}
                    >
                        <Typography
                            sx={{
                                color: "#495057",
                                fontSize: "2rem",
                                fontFamily: "Nunito",
                                "& .total-Count,& .total-Price": {
                                    fontWeight: 700,
                                },
                            }}
                        >
                            Tổng thanh toán(
                            <span className='total-Count'>{carts.reduce((total, cart) => total + cart.quantity, 0)}</span> sản phẩm):{" "}
                            <span className='total-Price'>
                                {currencyFormat(carts.reduce((total, cart) => total + Math.ceil((cart.product.price * (100 - cart.product.discount)) / 100) * cart.quantity, 0))}
                            </span>
                        </Typography>
                        <StyledButton onClick={() => setOpenCreateOrder(true)}>Đặt hàng</StyledButton>
                        <CreateOrderModal products={carts} isOpen={openCreateOrder} onClose={() => setOpenCreateOrder(false)} updateCartsRedux={() => dispatch(setCartStore([]))} />
                    </Box>
                </>
            )}
        </Box>
    );
};

export default Cart;
