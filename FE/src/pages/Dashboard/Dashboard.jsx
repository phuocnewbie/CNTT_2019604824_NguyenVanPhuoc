import React from "react";
import { Box, Grid, Skeleton } from "@mui/material";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { BsCart3, BsEnvelope, BsPeople } from "react-icons/bs";
import axiosClient from "../../api/axiosClient";
import { currencyFormat } from "../../styles/GlobalStyles";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const optionsSold = {
    responsive: true,
    plugins: {
        legend: {
            position: "top",
        },
        title: {
            display: true,
            text: "Tổng số đơn hàng theo tháng",
        },
    },
};

const optionsCategory = {
    responsive: true,
    plugins: {
        legend: {
            position: "top",
        },
        title: {
            display: true,
            text: "Thống kê theo danh mục theo tháng",
        },
    },
};

const Dashboard = () => {
    document.title = "Trang chủ | Hoàn Mỹ Store";
    const [revenue, setRevenue] = React.useState();
    const [orderSold, setOrderSold] = React.useState();
    const [newContact, setNewContact] = React.useState();
    const [newMember, setNewMember] = React.useState();
    const [solds, setSolds] = React.useState();
    const [categories, setCategories] = React.useState();
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        async function getData() {
            setIsLoading(true);
            const res = await Promise.all([
                axiosClient.get(`/dashboard/sold`),
                axiosClient.get(`/dashboard/category`),
                axiosClient.get(`/dashboard/revenue`),
                axiosClient.get(`/dashboard/order`),
                axiosClient.get(`/dashboard/contact`),
                axiosClient.get(`/dashboard/member`),
            ]);

            setSolds(res[0].data);
            setCategories(res[1].data.data);
            setRevenue(res[2].data.data[0]);
            setOrderSold(res[3].data.data[0]);
            setNewContact(res[4].data.data[0]);
            setNewMember(res[5].data.data[0]);
            setIsLoading(false);
        }
        getData();
    }, []);
    return (
        <Box
            sx={{
                py: "1rem",
            }}
        >
            <Grid container spacing={4}>
                <Grid item xs={4} md={3}>
                    {isLoading ? (
                        <Skeleton
                            variant='rounded'
                            sx={{
                                height: "6rem",
                                width: "100%",
                            }}
                        />
                    ) : (
                        <Box
                            sx={{
                                p: "1rem",
                                position: "relative",
                                borderRadius: "0.4rem",
                                flexDirection: "column",
                                backgroundColor: "#fafafa",
                                borderLeft: "0.5rem solid #54B435",
                                boxShadow: "0rem 0rem 1rem #c5c4c3",
                                "& .title": {
                                    my: "0.5rem",
                                    ml: "1rem",
                                    fontSize: "2.4rem",
                                    color: "#495057",
                                },
                                "& .content": {
                                    my: 0,
                                    ml: "1rem",
                                    fontSize: "1.8rem",
                                    color: "#666",
                                },
                                "& .icon": {
                                    display: "inline-flex",
                                    alignItems: "center",
                                    fontSize: "4rem",
                                    position: "absolute",
                                    right: "2rem",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                },
                            }}
                        >
                            <h4 className='title'>Doanh thu</h4>
                            <p className='content'>{currencyFormat(revenue?.revenue || 0)}</p>
                            <span className='icon'>
                                <RiMoneyDollarCircleLine
                                    style={{
                                        color: "#54B435",
                                    }}
                                />
                            </span>
                        </Box>
                    )}
                </Grid>
                <Grid item xs={4} md={3}>
                    {isLoading ? (
                        <Skeleton
                            variant='rounded'
                            sx={{
                                height: "6rem",
                                width: "100%",
                            }}
                        />
                    ) : (
                        <Box
                            sx={{
                                p: "1rem",
                                position: "relative",
                                borderRadius: "0.4rem",
                                flexDirection: "column",
                                backgroundColor: "#fafafa",
                                borderLeft: "0.5rem solid #5DA7DB",
                                boxShadow: "0rem 0rem 1rem #c5c4c3",
                                "& .title": {
                                    my: "0.5rem",
                                    ml: "1rem",
                                    fontSize: "2.4rem",
                                    color: "#495057",
                                },
                                "& .content": {
                                    my: 0,
                                    ml: "1rem",
                                    fontSize: "1.8rem",
                                    color: "#666",
                                },
                                "& .icon": {
                                    display: "inline-flex",
                                    alignItems: "center",
                                    fontSize: "4rem",
                                    position: "absolute",
                                    right: "2rem",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                },
                            }}
                        >
                            <h4 className='title'>Đơn hàng</h4>
                            <p className='content'>{orderSold?.order_sold || 0}</p>
                            <span className='icon'>
                                <BsCart3
                                    style={{
                                        color: "#5DA7DB",
                                    }}
                                />
                            </span>
                        </Box>
                    )}
                </Grid>
                <Grid item xs={4} md={3}>
                    {isLoading ? (
                        <Skeleton
                            variant='rounded'
                            sx={{
                                height: "6rem",
                                width: "100%",
                            }}
                        />
                    ) : (
                        <Box
                            sx={{
                                p: "1rem",
                                position: "relative",
                                borderRadius: "0.4rem",
                                flexDirection: "column",
                                backgroundColor: "#fafafa",
                                borderLeft: "0.5rem solid #FF6464",
                                boxShadow: "0rem 0rem 1rem #c5c4c3",
                                "& .title": {
                                    my: "0.5rem",
                                    ml: "1rem",
                                    fontSize: "2.4rem",
                                    color: "#495057",
                                },
                                "& .content": {
                                    my: 0,
                                    ml: "1rem",
                                    fontSize: "1.8rem",
                                    color: "#666",
                                },
                                "& .icon": {
                                    display: "inline-flex",
                                    alignItems: "center",
                                    fontSize: "4rem",
                                    position: "absolute",
                                    right: "2rem",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                },
                            }}
                        >
                            <h4 className='title'>Liên hệ mới</h4>
                            <p className='content'>{newContact?.contact || 0}</p>
                            <span className='icon'>
                                <BsEnvelope
                                    style={{
                                        color: "#FF6464",
                                    }}
                                />
                            </span>
                        </Box>
                    )}
                </Grid>
                <Grid item xs={4} md={3}>
                    {isLoading ? (
                        <Skeleton
                            variant='rounded'
                            sx={{
                                height: "6rem",
                                width: "100%",
                            }}
                        />
                    ) : (
                        <Box
                            sx={{
                                p: "1rem",
                                position: "relative",
                                borderRadius: "0.4rem",
                                flexDirection: "column",
                                backgroundColor: "#fafafa",
                                borderLeft: "0.5rem solid #FFE15D",
                                boxShadow: "0rem 0rem 1rem #c5c4c3",
                                "& .title": {
                                    my: "0.5rem",
                                    ml: "1rem",
                                    fontSize: "2.4rem",
                                    color: "#495057",
                                },
                                "& .content": {
                                    my: 0,
                                    ml: "1rem",
                                    fontSize: "1.8rem",
                                    color: "#666",
                                },
                                "& .icon": {
                                    display: "inline-flex",
                                    alignItems: "center",
                                    fontSize: "4rem",
                                    position: "absolute",
                                    right: "2rem",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                },
                            }}
                        >
                            <h4 className='title'>Thành viên mới</h4>
                            <p className='content'>{newMember?.member || 0}</p>
                            <span className='icon'>
                                <BsPeople
                                    style={{
                                        color: "#FFE15D",
                                    }}
                                />
                            </span>
                        </Box>
                    )}
                </Grid>
            </Grid>
            <Grid
                container
                spacing={4}
                sx={{
                    mt: "1rem",
                }}
            >
                <Grid item xs={6}>
                    <Box
                        sx={{
                            p: "1rem",
                            boxShadow: "0rem 0rem 1rem #c5c4c3",
                            backgroundColor: "#fafafa",
                        }}
                    >
                        {isLoading ? (
                            <Skeleton
                                variant='rounded'
                                sx={{
                                    height: "20rem",
                                    width: "100%",
                                }}
                            />
                        ) : (
                            <Line
                                options={optionsSold}
                                data={{
                                    labels: solds?.order_solds?.map((value) => value.month),
                                    datasets: [
                                        {
                                            label: "Đơn hàng",
                                            data: solds?.order_solds?.map((value) => value.order_sold),
                                            borderColor: "rgb(255, 99, 132)",
                                            backgroundColor: "rgba(255, 99, 132, 0.5)",
                                        },
                                        {
                                            label: "Sản phẩm",
                                            data: solds?.product_solds?.map((value) => value.product_sold),
                                            borderColor: "rgb(53, 162, 235)",
                                            backgroundColor: "rgba(53, 162, 235, 0.5)",
                                        },
                                    ],
                                }}
                            />
                        )}
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box
                        sx={{
                            p: "1rem",
                            boxShadow: "0rem 0rem 1rem #c5c4c3",
                            backgroundColor: "#fafafa",
                        }}
                    >
                        {isLoading ? (
                            <Skeleton
                                variant='rounded'
                                sx={{
                                    height: "20rem",
                                    width: "100%",
                                }}
                            />
                        ) : (
                            <Bar
                                options={optionsCategory}
                                data={{
                                    labels: ["Thống kê số sản phẩm đã bán theo danh mục"],
                                    datasets: [
                                        {
                                            label: "Nam",
                                            data: categories?.filter((value) => value.name === "Nam")[0]?.product_sold || 0,
                                            backgroundColor: "rgba(255, 99, 132, 0.2)",
                                        },
                                        {
                                            label: "Nữ",
                                            data: categories?.filter((value) => value.name === "Nữ")[0]?.product_sold || 0,
                                            backgroundColor: "rgba(54, 162, 235, 0.2)",
                                        },
                                        {
                                            label: "Phụ Kiện",
                                            data: categories?.filter((value) => value.name === "Phụ Kiện")[0]?.product_sold || 0,
                                            backgroundColor: "rgba(255, 206, 86, 0.2)",
                                        },
                                    ],
                                }}
                            />
                        )}
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Dashboard;
