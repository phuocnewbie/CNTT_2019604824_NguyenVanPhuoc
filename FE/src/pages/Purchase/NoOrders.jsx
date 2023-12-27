import React from "react";
import { Box } from "@mui/material";
const NoOrders = () => {
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
                    boxShadow:
                        "-1rem -1rem 4rem #edeff1, 1rem 1rem 4rem #edeff1",
                    "& .no-order-img": {
                        mt: "12rem",
                        width: "12rem",
                    },
                    "& .no-order-text": {
                        color: "#495057",
                        fontSize: "1.6rem",
                    },
                }}
            >
                <img
                    className='no-order-img'
                    alt=''
                    src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/5fafbb923393b712b96488590b8f781f.png'
                />
                <p className='no-order-text'>Chưa có đơn hàng</p>
            </Box>
        </>
    );
};

export default NoOrders;
