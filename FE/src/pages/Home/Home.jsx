import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import { Box, Skeleton, Stack } from "@mui/material";

import axiosClient from "../../api/axiosClient";
import { Recommend } from "../../components/Recommend";
import "swiper/css";
import "swiper/css/pagination";
import "./slider.scss";
const Home = () => {
    document.title = "Hoàn Mỹ Store";
    const [slides, setSlides] = React.useState([]);
    const [ctimes, setCtimes] = React.useState([]);
    const [ratings, setRatings] = React.useState([]);
    const [discounts, setDiscounts] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        async function getData() {
            setIsLoading(true);
            const res = await Promise.all([
                axiosClient.get(`/carousels/all`),
                axiosClient.get(`/products/get-limit/ctime`),
                axiosClient.get(`/products/get-limit/rating`),
                axiosClient.get(`/products/get-limit/discount`),
            ]);
            setSlides(res[0].data.data);
            setCtimes(res[1].data.data);
            setRatings(res[2].data.data);
            setDiscounts(res[3].data.data);
            setIsLoading(false);
        }
        getData();
    }, []);

    React.useEffect(() => {
        const slideImgs = document.querySelectorAll(".swiper-slide-img");
        Array.from(slideImgs).forEach((slideImg) => (slideImg.style.height = slideImg.clientWidth * 0.4 + "px"));
    });

    return (
        <Box>
            <Box
                sx={{
                    width: "100%",
                    boxSizing: "border-box",
                    "& .slick-dots": {
                        bottom: "1.6rem",
                        "li button:before": {
                            fontSize: "1.4rem",
                        },
                    },
                }}
            >
                <Swiper
                    slidesPerView={1}
                    spaceBetween={30}
                    autoplay={{
                        delay: 10000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Autoplay, Pagination]}
                    className='mySwiper2'
                >
                    {isLoading ? (
                        <Skeleton
                            variant='rectangular'
                            sx={{
                                width: "100%",
                                height: "76rem",
                            }}
                        />
                    ) : (
                        slides.map((img) => (
                            <SwiperSlide key={img.id}>
                                <img className='swiper-slide-img' alt='' src={"http://localhost:8000/" + img.image} />
                            </SwiperSlide>
                        ))
                    )}
                </Swiper>
            </Box>
            {isLoading ? (
                <Box
                    sx={{
                        mt: "4rem",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Skeleton
                        variant='text'
                        sx={{
                            fontSize: "2.4rem",
                            width: "20%",
                        }}
                    />
                    <Skeleton
                        variant='text'
                        sx={{
                            fontSize: "4rem",
                            width: "30%",
                        }}
                    />
                    <Stack
                        className='grid-wide'
                        direction={{
                            xs: "column",
                            sm: "row",
                        }}
                        spacing={{ xs: 1, sm: 2, md: 4 }}
                        sx={{
                            mt: "4rem",
                            "& > span": {
                                flexGrow: 1,
                            },
                        }}
                    >
                        <Skeleton
                            variant='rounded'
                            sx={{
                                height: "30rem",
                            }}
                        />
                        <Skeleton
                            variant='rounded'
                            sx={{
                                height: "30rem",
                            }}
                        />
                        <Skeleton
                            variant='rounded'
                            sx={{
                                height: "30rem",
                            }}
                        />
                        <Skeleton
                            variant='rounded'
                            sx={{
                                height: "30rem",
                            }}
                        />
                    </Stack>
                </Box>
            ) : (
                <Recommend title='Sản phẩm mới' products={ctimes} />
            )}
            {isLoading ? (
                <Box
                    sx={{
                        mt: "4rem",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Skeleton
                        variant='text'
                        sx={{
                            fontSize: "2.4rem",
                            width: "20%",
                        }}
                    />
                    <Skeleton
                        variant='text'
                        sx={{
                            fontSize: "4rem",
                            width: "30%",
                        }}
                    />
                    <Stack
                        className='grid-wide'
                        direction={{
                            xs: "column",
                            sm: "row",
                        }}
                        spacing={{ xs: 1, sm: 2, md: 4 }}
                        sx={{
                            mt: "4rem",
                            "& > span": {
                                flexGrow: 1,
                            },
                        }}
                    >
                        <Skeleton
                            variant='rounded'
                            sx={{
                                height: "30rem",
                            }}
                        />
                        <Skeleton
                            variant='rounded'
                            sx={{
                                height: "30rem",
                            }}
                        />
                        <Skeleton
                            variant='rounded'
                            sx={{
                                height: "30rem",
                            }}
                        />
                        <Skeleton
                            variant='rounded'
                            sx={{
                                height: "30rem",
                            }}
                        />
                    </Stack>
                </Box>
            ) : (
                <Recommend title='Sản phẩm bán chạy' products={ratings} />
            )}
            {isLoading ? (
                <Box
                    sx={{
                        mt: "4rem",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Skeleton
                        variant='text'
                        sx={{
                            fontSize: "2.4rem",
                            width: "20%",
                        }}
                    />
                    <Skeleton
                        variant='text'
                        sx={{
                            fontSize: "4rem",
                            width: "30%",
                        }}
                    />
                    <Stack
                        className='grid-wide'
                        direction={{
                            xs: "column",
                            sm: "row",
                        }}
                        spacing={{ xs: 1, sm: 2, md: 4 }}
                        sx={{
                            my: "4rem",
                            "& > span": {
                                flexGrow: 1,
                            },
                        }}
                    >
                        <Skeleton
                            variant='rounded'
                            sx={{
                                height: "30rem",
                            }}
                        />
                        <Skeleton
                            variant='rounded'
                            sx={{
                                height: "30rem",
                            }}
                        />
                        <Skeleton
                            variant='rounded'
                            sx={{
                                height: "30rem",
                            }}
                        />
                        <Skeleton
                            variant='rounded'
                            sx={{
                                height: "30rem",
                            }}
                        />
                    </Stack>
                </Box>
            ) : (
                <Recommend title='Đang giảm giá' products={discounts} />
            )}
        </Box>
    );
};

export default Home;
