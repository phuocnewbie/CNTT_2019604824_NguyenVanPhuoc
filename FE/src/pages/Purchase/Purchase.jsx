import React from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";

import axiosClient from "../../api/axiosClient";
import NoOrders from "./NoOrders";
import { PurchaseOrder } from "./PurchaseOrder";
const tabs = [
    {
        value: "wait",
        label: "Chờ xác nhận",
    },
    {
        value: "prepare",
        label: "Chờ lấy hàng",
    },
    {
        value: "delivering",
        label: "Đang giao",
    },
    {
        value: "delivered",
        label: "Đã giao",
    },
    {
        value: "canceled",
        label: "Đã hủy",
    },
];
const Purchase = () => {
    document.title = "Đơn mua | Hoàn Mỹ Store";
    const user = useSelector((state) => state.user);
    const [currentTab, setCurrentTab] = React.useState("wait");
    const [data, setData] = React.useState();
    const [callApi, setCallApi] = React.useState(Math.random());

    React.useEffect(() => {
        async function getData() {
            const res = await axiosClient.get(`/orders/by-member-id/${user.id}?status=${currentTab}`);
            setData(res.data.data);
        }
        getData();
    }, [currentTab, user, callApi]);

    const handleChangeTab = (e) => {
        setCurrentTab(e.target.getAttribute("value"));
    };
    React.useEffect(() => {
        const tabActive = document.querySelector(".tab.active");
        const line = document.querySelector(".line");
        line.style.left = tabActive.offsetLeft + "px";
    }, [currentTab]);
    return (
        <Box
            sx={{
                p: "2.4rem",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Box
                sx={{
                    pb: "0.4rem",
                    width: "100%",
                    display: "flex",
                    overflow: "hiden",
                    position: "relative",
                    borderRadius: "0.4rem",
                    boxShadow: "-1rem -1rem 4rem #edeff1, 1rem 1rem 4rem #edeff1",
                    "& .line": {
                        width: "20%",
                        py: "0.2rem",
                        bottom: "0",
                        position: "absolute",
                        borderRadius: "0.4rem",
                        transition: "all 0.5s ease",
                        background: "linear-gradient(to right, #859398, #283048)",
                    },
                    "& .tab": {
                        m: 0,
                        py: "1.2rem",
                        width: "20%",
                        border: "none",
                        color: "#999",
                        fontWeight: 700,
                        cursor: "pointer",
                        fontSize: "1.6rem",
                        textAlign: "center",
                        textDecoration: "none",
                        borderRadius: "0.2rem",
                        "&:hover": {
                            color: "#495057",
                        },
                    },
                    "& .tab.active": {
                        color: "#495057",
                    },
                }}
            >
                {tabs.map((tab) => (
                    <label value={tab.value} key={tab.value} onClick={handleChangeTab} className={tab.value === currentTab ? "tab active" : "tab"}>
                        {tab.label}
                    </label>
                ))}
                <div className='line'></div>
            </Box>
            {data && (data.length === 0 ? <NoOrders /> : data.map((order) => <PurchaseOrder reCall={setCallApi} value={order} key={order.id} />))}
        </Box>
    );
};

export default Purchase;
