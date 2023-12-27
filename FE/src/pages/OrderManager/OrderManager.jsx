import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Link, Pagination, LinearProgress } from "@mui/material";

import axiosClient from "../../api/axiosClient";
import { useDebounce } from "../../hook";
import { Select } from "../../components/Select";
import { TextField } from "../../components/TextField";
import "../../styles/DataTable/dataTable.scss";
import { formatDateTime } from "../../styles/GlobalStyles";

const columns = [
    { field: "id", headerName: "Mã đơn hàng", width: 120 },
    { field: "memberName", headerName: "Khách hàng", width: 200 },
    { field: "memberAddress", headerName: "Địa chỉ", width: 200 },
    { field: "date", headerName: "Ngày lập", width: 160 },
];
const statuses = [
    {
        id: "wait",
        name: "Chờ xác nhận",
    },
    {
        id: "prepare",
        name: "Chờ lấy hàng",
    },
    {
        id: "delivering",
        name: "Đang giao",
    },
    {
        id: "delivered",
        name: "Đã giao",
    },
    {
        id: "request cancel",
        name: "Yêu cầu hủy",
    },
];

const OrderManager = () => {
    document.title = "Đơn hàng | Hoàn Mỹ Store";
    const [totalPage, setTotalPage] = React.useState(1);
    const [page, setPage] = React.useState(1);
    const [search, setSearch] = React.useState("");
    const [filterStatus, setFilterStatus] = React.useState("wait");
    const [data, setData] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const debounceSearch = useDebounce(search, 500);
    const { pathname } = useLocation();
    const navigate = useNavigate();
    React.useEffect(() => {
        async function getData() {
            setIsLoading(true);
            const res = await axiosClient.get(`/orders?keyword=${debounceSearch}&status=${filterStatus}&page=${page}`);
            setData(res.data.data.data);
            setPage(res.data.data.current_page);
            setTotalPage(res.data.data.last_page);
            setIsLoading(false);
        }
        getData();
    }, [page, debounceSearch, filterStatus]);
    const handleChangePage = (e, value) => {
        setPage(value);
    };
    const handleGoToDetail = (id) => {
        navigate(`${pathname}/${id}`);
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                ".heading": {
                    color: "#495057",
                    fontSize: "2.8rem",
                },
            }}
        >
            <Typography className='heading useFont-Nunito'>Đơn hàng</Typography>
            <Box
                sx={{
                    p: "2rem",
                    mt: "2rem",
                    flexGrow: 1,
                    display: "flex",
                    borderRadius: "0.4rem",
                    backgroundColor: "#fff",
                    flexDirection: "column",
                    border: "1px solid #eaeaea",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Select
                        label='Trạng thái'
                        options={statuses}
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        disabledEmValue={true}
                        sx={{
                            width: "28rem",
                        }}
                    />
                    <TextField
                        label='Tìm kiếm'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        sx={{
                            minWidth: "28rem",
                        }}
                    />
                </Box>
                <Box
                    sx={{
                        mt: "2rem",
                        flexGrow: 1,
                        width: "100%",
                    }}
                >
                    <table className='table'>
                        <thead className='table-head'>
                            <tr>
                                {columns.map((column) => (
                                    <th
                                        key={column.field}
                                        style={{
                                            width: column.width || "100%",
                                        }}
                                    >
                                        {column.headerName}
                                    </th>
                                ))}
                                <th
                                    style={{
                                        width: "10%",
                                    }}
                                ></th>
                            </tr>
                        </thead>
                        <tbody className='table-body'>
                            {isLoading ? (
                                <tr>
                                    <td colSpan={Object.keys(columns).length + 1} align='center'>
                                        <LinearProgress color='inherit' />
                                    </td>
                                </tr>
                            ) : data.length === 0 ? (
                                <tr>
                                    <td colSpan={Object.keys(columns).length + 1} align='center'>
                                        Chưa có đơn hàng nào
                                    </td>
                                </tr>
                            ) : (
                                data.map((row, index) => (
                                    <tr key={index} className={index % 2 === 0 ? "even" : "odd"}>
                                        <td>{row.id}</td>
                                        <td>{row.member.full_name}</td>
                                        <td>{row.member.address}</td>
                                        <td>{formatDateTime(row.created_at)}</td>
                                        <td className='go-to-detail' align='center'>
                                            <Link
                                                underline='hover'
                                                sx={{
                                                    mr: "1rem",
                                                }}
                                                onClick={() => handleGoToDetail(row.id)}
                                            >
                                                Xem
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={Object.keys(columns).length + 1}>
                                    <Pagination count={totalPage} variant='outlined' shape='rounded' page={page} onChange={handleChangePage} />
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </Box>
            </Box>
        </Box>
    );
};

export default OrderManager;
