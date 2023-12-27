import React from "react";
import { Box, Grid } from "@mui/material";
import { ProductItem } from "../ProductItem";

const Recommend = ({ title, products }) => {
    return (
        <Box
            className='grid-wide'
            sx={{
                my: "6rem",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                "& h6": {
                    m: 0,
                    fontSize: "2rem",
                    fontWeight: "500",
                },
                "& h3": {
                    mt: "1rem",
                    mb: "5rem",
                    fontSize: "2.8rem",
                },
            }}
        >
            <h6 className='grayTextColor'>Gợi ý cho bạn</h6>
            <h3 className='textColor'>{title}</h3>
            <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
            >
                {products.map((product) => (
                    <Grid xs={2} sm={3} key={product.id} item>
                        <ProductItem product={product} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Recommend;
