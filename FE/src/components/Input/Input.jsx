import React from "react";
import { InputBase } from "@mui/material";

const Input = ({ sx, ...props }) => {
    return (
        <InputBase
            {...props}
            sx={{
                fontSize: "1.6rem",
                fontFamily: "Nunito",
                borderRadius: "0.4rem",
                border: "1px solid #ccc",
                "& input": {
                    px: "1.2rem",
                    py: "0.8rem",
                },
                ...sx,
            }}
        />
    );
};

export default React.memo(Input);
