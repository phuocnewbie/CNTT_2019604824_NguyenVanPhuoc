import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Rating } from "@mui/material";
import { currencyFormat } from "../../styles/GlobalStyles";
const ProductItem = ({ product }) => {
    const navigate = useNavigate();
    React.useEffect(() => {
        const img = document.querySelector(".product-img");
        img.style.height = img.clientWidth + "px";
    });
    const handleGetProductDetail = (e) => {
        navigate(`/product/detail/${product.id}`);
    };
    return (
        <Box
            onClick={handleGetProductDetail}
            sx={{
                width: "100%",
                cursor: "pointer",
                overflow: "hidden",
                backgroundColor: "#fff",
                position: "relative",
                boxShadow: "0 0 0.1rem 0 rgba(0, 0, 0, 0.1), 0 0 1rem 0 rgba(0, 0, 0, 0.1)",
                "& .product-img": {
                    width: "100%",
                    transition: "all 0.3s ease-in-out",
                },
                ":hover .product-img": {
                    transform: "scale(1.1)",
                },
                "& .productDiscount": {
                    m: 0,
                    right: 0,
                    zIndex: 10,
                    color: "#fff",
                    height: "3.6rem",
                    width: "3.6rem",
                    display: "flex",
                    fontSize: "1.2rem",
                    position: "absolute",
                    alignItems: "center",
                    flexDirection: "column",
                    justifyContent: "center",
                    backgroundColor: "#F49D1A",
                    "&::after": {
                        content: "''",
                        display: "block",
                        position: "absolute",
                        bottom: "-0.6rem",
                        borderColor: "transparent #F49D1A",
                        borderWidth: "0 1.8rem 0.6rem",
                        borderStyle: "solid",
                        width: "100%",
                        boxSizing: "border-box",
                        zIndex: 10,
                    },
                },
            }}
        >
            {product.discount !== 0 && (
                <p className='productDiscount'>
                    {product.discount}%{" "}
                    <span
                        style={{
                            fontSize: "1rem",
                        }}
                    >
                        GIẢM
                    </span>
                </p>
            )}
            <Box
                sx={{
                    overflow: "hidden",
                }}
            >
                <img className='product-img' alt='' src={"http://localhost:8000/" + product.image} />
            </Box>
            <Box
                sx={{
                    p: "1.2rem",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    borderBottomLeftRadius: "0.4rem",
                    borderBottomRightRadius: "0.4rem",
                    "& .product-name": {
                        m: 0,
                        fontSize: "1.8rem",
                    },
                    "& .product-price": {
                        my: "0.4rem",
                        fontSize: "1.4rem",
                        "& .new-price": {
                            color: "#333",
                            fontWeight: 700,
                        },
                        "& .old-price": {
                            textDecoration: "line-through",
                            color: "#b2b2b2",
                            mr: "0.4rem",
                        },
                    },
                }}
            >
                <h4 className='product-name'>{product.name}</h4>
                <p className='product-price'>
                    {product.discount !== 0 && <span className='old-price'>{currencyFormat(product.price)}</span>}
                    <span className='new-price'>{product.discount !== 0 ? currencyFormat(Math.ceil((product.price * (100 - product.discount)) / 100)) : currencyFormat(product.price)}</span>
                </p>
                <Rating className='product-rating' value={product.rating || 0} precision={0.1} readOnly />
            </Box>
        </Box>
    );
};

export default ProductItem;
