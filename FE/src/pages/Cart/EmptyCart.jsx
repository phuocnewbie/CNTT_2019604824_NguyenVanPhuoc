import React from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
const EmptyCart = () => {
    const navigate = useNavigate();

    const handleContinue = () => {
        navigate("/");
    };
    return (
        <>
            <Box
                sx={{
                    p: "2rem",
                    mt: "2rem",
                    width: "100%",
                    minHeight: "45rem",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    borderRadius: "0.4rem",
                    boxSizing: "border-box",
                    "& .empty-cart-img": {
                        mt: "5rem",
                        width: "48rem",
                        height: "23rem",
                    },
                    "& .empty-cart-text": {
                        color: "#495057",
                        fontSize: "2rem",
                    },
                }}
            >
                <img className='empty-cart-img' alt='' src='http://localhost:8000/images/empty_cart.png' />
                <p className='empty-cart-text'>Chưa có sản phẩm</p>
            </Box>
            <Button variant='text' onClick={handleContinue}>
                Tiếp tục mua hàng
            </Button>
        </>
    );
};

export default EmptyCart;
