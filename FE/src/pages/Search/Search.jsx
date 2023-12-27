import React from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Box, Grid, FormControlLabel, Checkbox, FormGroup, Button, Typography, Pagination, Stack, Skeleton } from "@mui/material";
import { NumericFormat } from "react-number-format";
import { BsCaretDownFill } from "react-icons/bs";
import axiosClient from "../../api/axiosClient";
import { ProductItem } from "../../components/ProductItem";
import { Input } from "../../components/Input";
const StyledFormControlLable = styled(FormControlLabel)({
    "& .css-ahj2mt-MuiTypography-root": {
        color: "#777",
        fontSize: "1.4rem",
        fontFamily: "Nunito",
        marginBottom: "-0.2rem",
    },
    "& .css-12wnr2w-MuiButtonBase-root-MuiCheckbox-root": {
        padding: "0.6rem",
        "& .css-i4bv87-MuiSvgIcon-root": {
            fontSize: "2rem",
        },
    },
});
const StyledButton = styled(Button)({
    fontWeight: 500,
    color: "#495057",
    fontSize: "1.4rem",
    fontFamily: "Nunito",
    marginLeft: "1.2rem",
    textTransform: "none",
    backgroundColor: "#fff",
    padding: "0.4rem 1.2rem",
    "&.active": {
        color: "#fff",
        backgroundImage: "linear-gradient(45deg, #485563, #29323c)",
    },
});
const StyledInput = styled(Input)({
    fontSize: "1.4rem",
    "& input": {
        padding: "0.4rem 0.8rem",
    },
});
const Search = ({ title }) => {
    const [searchParams] = useSearchParams();
    document.title = title || 'Kết quả tìm kiếm "' + searchParams.get("keyword") + '"';

    const [data, setData] = React.useState([]);
    const [filterPrice, setFilterPrice] = React.useState({});
    const [filterCategory, setFilterCategory] = React.useState([]);
    const [sorting, setSorting] = React.useState("Liên Quan");
    const [page, setPage] = React.useState(1);
    const [totalPage, setTotalPage] = React.useState();
    const [isLoading, setIsLoading] = React.useState(false);

    const { search } = useLocation();

    React.useEffect(() => {
        async function getData() {
            setIsLoading(true);
            const res = await axiosClient.post(`/products/get-by-keyword`, {
                keyword: searchParams.get("keyword"),
                order_by: sorting,
                category: filterCategory,
                min_price: filterPrice.min,
                max_price: filterPrice.max,
                page: page,
            });
            setData(res.data.data.data);
            setPage(res.data.current_page);
            setTotalPage(res.data.data.last_page);
            setIsLoading(false);
        }
        getData();

        window.scrollTo(0, 0);
    }, [search, searchParams, page, sorting, filterCategory, filterPrice]);

    const handleChangePage = (e, value) => {
        setPage(value);
    };
    return (
        <Box
            className='grid-wide'
            sx={{
                my: "6rem",
            }}
        >
            <Grid container spacing={{ xs: 2, md: 4 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                <Grid item xs={2}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            "& > h3": {
                                m: 0,
                                color: "#333",
                                fontWeight: 700,
                                fontSize: "1.8rem",
                            },
                        }}
                    >
                        <h3>BỘ LỌC TÌM KIẾM</h3>
                        <Box
                            sx={{
                                mt: "2rem",
                                "& > h5": {
                                    m: 0,
                                    fontWeight: 500,
                                    color: "#495057",
                                    fontSize: "1.6rem",
                                },
                            }}
                        >
                            <h5>Theo danh mục</h5>
                            <FormGroup
                                sx={{
                                    ml: "0.4rem",
                                }}
                            >
                                <StyledFormControlLable
                                    control={<Checkbox />}
                                    label='Nam'
                                    onChange={(e) =>
                                        setFilterCategory((prevState) => {
                                            if (!prevState.includes("Nam")) return [...prevState, "Nam"];
                                            else return prevState.filter((element) => element !== "Nam");
                                        })
                                    }
                                />
                                <StyledFormControlLable
                                    control={<Checkbox />}
                                    label='Nữ'
                                    onChange={(e) =>
                                        setFilterCategory((prevState) => {
                                            if (!prevState.includes("Nữ")) return [...prevState, "Nữ"];
                                            else return prevState.filter((element) => element !== "Nữ");
                                        })
                                    }
                                />
                                <StyledFormControlLable
                                    control={<Checkbox />}
                                    label='Phụ Kiện'
                                    onChange={(e) =>
                                        setFilterCategory((prevState) => {
                                            if (!prevState.includes("Phụ Kiện")) return [...prevState, "Phụ Kiện"];
                                            else return prevState.filter((element) => element !== "Phụ Kiện");
                                        })
                                    }
                                />
                            </FormGroup>
                        </Box>
                        <Box
                            sx={{
                                mt: "2rem",
                                "& > h5": {
                                    m: 0,
                                    fontWeight: 500,
                                    fontSize: "1.6rem",
                                },
                                "& .filter-error": {
                                    color: "#d32f2f",
                                    fontSize: "1.3rem",
                                },
                            }}
                        >
                            <h5 className='textColor'>Khoảng giá</h5>
                            <Box
                                sx={{
                                    display: "flex",
                                    my: "1rem",
                                    "& > span": {
                                        width: "6rem",
                                        fontSize: "2rem",
                                        fontWeight: "bold",
                                        textAlign: "center",
                                        alignSelf: "center",
                                    },
                                }}
                            >
                                <NumericFormat
                                    prefix='₫'
                                    placeholder='Từ'
                                    decimalSeparator=','
                                    thousandSeparator='.'
                                    value={filterPrice.min}
                                    customInput={StyledInput}
                                    onValueChange={(values) => {
                                        setFilterPrice((prevState) => ({
                                            ...prevState,
                                            min: values.floatValue,
                                        }));
                                    }}
                                />
                                <span className='textColor'>-</span>
                                <NumericFormat
                                    prefix='₫'
                                    placeholder='Đến'
                                    decimalSeparator=','
                                    thousandSeparator='.'
                                    value={filterPrice.max}
                                    customInput={StyledInput}
                                    onValueChange={(values) => {
                                        setFilterPrice((prevState) => ({
                                            ...prevState,
                                            max: values.floatValue,
                                        }));
                                    }}
                                />
                            </Box>
                            {filterPrice.min > filterPrice.max && <span className='filter-error'>Vui lòng điền khoảng giá phù hợp</span>}
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={10}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <Typography
                            className='useFont-Nunito'
                            sx={{
                                mb: "2rem",
                                fontSize: "1.6rem",
                            }}
                        >
                            Kết quả tìm kiếm cho từ khoá "{searchParams.get("keyword")}"
                        </Typography>
                        <Box
                            sx={{
                                p: "1rem 3rem",
                                display: "flex",
                                alignItems: "center",
                                borderRadius: "0.4rem",
                                backgroundColor: "rgba(0, 0, 0, 0.03)",
                                "& > p": {
                                    color: "#495057",
                                    fontSize: "1.6rem",
                                    m: 0,
                                },
                            }}
                        >
                            <p>Sắp xếp theo:</p>
                            <StyledButton
                                className={sorting === "Liên Quan" ? "active" : ""}
                                onClick={(e) => {
                                    setSorting("Liên Quan");
                                }}
                            >
                                Liên Quan
                            </StyledButton>
                            <StyledButton
                                className={sorting === "Mới Nhất" ? "active" : ""}
                                onClick={(e) => {
                                    setSorting("Mới Nhất");
                                }}
                            >
                                Mới Nhất
                            </StyledButton>
                            <StyledButton
                                className={sorting === "Bán Chạy" ? "active" : ""}
                                onClick={(e) => {
                                    setSorting("Bán Chạy");
                                }}
                            >
                                Bán Chạy
                            </StyledButton>
                            <Box
                                className={`${(sorting === "ascending" || sorting === "descending") && "active"} textColor`}
                                sx={{
                                    px: "1.2rem",
                                    ml: "1.2rem",
                                    zIndex: 11,
                                    fontWeight: 500,
                                    minWidth: "16rem",
                                    fontSize: "1.4rem",
                                    position: "relative",
                                    lineHeight: "3.25rem",
                                    borderRadius: "0.4rem",
                                    backgroundColor: "#fff",
                                    "&.active": {
                                        backgroundImage: "linear-gradient(45deg,#485563, #29323c)",
                                        "& .sort-value": {
                                            color: "#fff",
                                        },
                                        "& .icon": {
                                            color: "#fff",
                                        },
                                    },
                                    "& .icon": {
                                        position: "absolute",
                                        top: "50%",
                                        right: "1rem",
                                        transform: "translateY(-40%)",
                                    },
                                    "&::before": {
                                        position: "absolute",
                                        left: 0,
                                        bottom: "-1rem",
                                        content: "''",
                                        width: "100%",
                                        height: "50%",
                                    },
                                    "&:hover .sortPrice-list": {
                                        display: "block",
                                    },
                                }}
                            >
                                <span className='sort-value'>{sorting === "ascending" ? "Giá: Thấp đến Cao" : sorting === "descending" ? "Giá: Cao đến Thấp" : "Giá"}</span>
                                <span className='icon'>
                                    <BsCaretDownFill />
                                </span>
                                <Box
                                    className='sortPrice-list'
                                    sx={{
                                        position: "absolute",
                                        left: 0,
                                        top: "110%",
                                        py: "0.6rem",
                                        width: "100%",
                                        zIndex: "10 ",
                                        overflow: "hidden",
                                        borderRadius: "0.4rem",
                                        backgroundColor: "#fff",
                                        boxShadow: "0 1px 10px 1px #eaeaea",
                                        "& option": {
                                            px: "1.2rem",
                                            color: "#999",
                                            cursor: "pointer",
                                            fontSize: "1.4rem",
                                            fontFamily: "Nunito",
                                            "&:hover": {
                                                backgroundColor: "#fafafa",
                                            },
                                            "&.active": {
                                                color: "#485563",
                                            },
                                        },
                                        display: "none",
                                    }}
                                >
                                    <option
                                        className={sorting === "ascending" ? "active" : ""}
                                        value='ascending'
                                        onClick={(e) => {
                                            setSorting(e.target.value);
                                        }}
                                    >
                                        Giá: Thấp đến Cao
                                    </option>
                                    <option
                                        className={sorting === "descending" ? "active" : ""}
                                        value='descending'
                                        onClick={(e) => {
                                            setSorting(e.target.value);
                                        }}
                                    >
                                        Giá: Cao đến Thấp
                                    </option>
                                </Box>
                            </Box>
                        </Box>
                        <Grid
                            container
                            spacing={{ xs: 2, md: 3 }}
                            columns={{ xs: 4, sm: 8, md: 12 }}
                            sx={{
                                mt: "0rem!important",
                            }}
                        >
                            {isLoading ? (
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
                            ) : data.length !== 0 ? (
                                data.map((product) => (
                                    <Grid xs={2} sm={3} key={product.id} item>
                                        <ProductItem product={product} />
                                    </Grid>
                                ))
                            ) : (
                                <Grid item xs={12}>
                                    <Box
                                        sx={{
                                            p: "2rem",
                                            mt: "2rem",
                                            width: "100%",
                                            minHeight: "40rem",
                                            display: "flex",
                                            alignItems: "center",
                                            flexDirection: "column",
                                            borderRadius: "0.4rem",
                                            boxSizing: "border-box",
                                            "& .empty-img": {
                                                mt: "5rem",
                                                width: "48rem",
                                                height: "23rem",
                                            },
                                            "& .empty-text": {
                                                color: "#495057",
                                                fontSize: "2rem",
                                            },
                                        }}
                                    >
                                        <img className='empty-img' alt='' src='http://localhost:8000/images/empty_cart.png' />
                                        <p className='empty-text'>Không tìm thấy sản phẩm phù hợp</p>
                                    </Box>
                                </Grid>
                            )}
                        </Grid>
                        <Box
                            sx={{
                                mt: "2.4rem",
                                width: "100%",
                                display: "flex",
                                p: "1.2rem 3rem",
                                borderRadius: "0.4rem",
                                boxSizing: "border-box",
                                justifyContent: "center",
                                boxShadow: "0 0 1rem #eaeaea",
                            }}
                        >
                            <Pagination
                                count={totalPage}
                                variant='outlined'
                                shape='rounded'
                                page={page}
                                onChange={handleChangePage}
                                sx={{
                                    "& .css-19xm0h7-MuiButtonBase-root-MuiPaginationItem-root": {
                                        fontSize: "1.4rem",
                                    },
                                    "& .css-g2z002-MuiSvgIcon-root-MuiPaginationItem-icon": {
                                        width: "2rem",
                                        height: "2rem",
                                    },
                                    "& .css-19xm0h7-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected": {
                                        color: "#fff",
                                        backgroundImage: "linear-gradient(to right, #666, #283048)",
                                    },
                                }}
                            />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Search;
