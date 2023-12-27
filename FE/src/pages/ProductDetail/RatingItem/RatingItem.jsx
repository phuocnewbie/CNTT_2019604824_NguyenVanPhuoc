import React from "react";
import { Box, Divider, Rating } from "@mui/material";
import { formatDateTime } from "../../../styles/GlobalStyles";
const RatingItem = ({ data }) => {
    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    my: "2rem",
                    px: "2rem",
                }}
            >
                <Box
                    sx={{
                        "& > img": {
                            width: "4rem",
                            height: "4rem",
                            borderRadius: "50%",
                        },
                    }}
                >
                    <img alt='' src={"http://localhost:8000/" + data.member.avatar} />
                </Box>
                <Box
                    sx={{
                        ml: "1.2rem",
                        "& > p": {
                            m: 0,
                        },
                        "& .ratingItem-Username": {
                            fontSize: "1.6rem",
                            color: "#495057",
                        },
                        "& .ratingItem-Datetime": {
                            fontSize: "1.2rem",
                            color: "#888",
                        },
                        "& .ratingItem-Desc": {
                            mt: "1.2rem",
                            fontSize: "1.4rem",
                            color: "#333",
                        },
                    }}
                >
                    <p className='ratingItem-Username'>{data.member.username || data.member.email}</p>
                    <Rating value={data.star} />
                    <p className='ratingItem-Datetime'>{formatDateTime(data.created_at)}</p>
                    <p className='ratingItem-Desc'>{data.description}</p>
                </Box>
            </Box>
            <Divider />
        </>
    );
};

export default React.memo(RatingItem);
