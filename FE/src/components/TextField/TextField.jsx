import React from "react";
import { styled } from "@mui/material/styles";
import { TextField as MUI } from "@mui/material";
const StyledTextField = styled(MUI)({
    "& .MuiFormLabel-root:not(.MuiInputLabel-shrink)": {
        transform: "translate(1.4rem, 0.8rem)",
    },
    "& .MuiFormLabel-root": {
        fontSize: "1.6rem",
    },
    "& .css-14lo706": {
        fontSize: "1.2rem",
    },
    "& .MuiFormLabel-root.Mui-focused": {
        color: "#333",
        fontSize: "1.6rem",
    },
    "& .MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#333",
    },
    "& .MuiFormLabel-root.Mui-error": {
        color: "#d32f2f",
    },
    "& .MuiInputBase-root.Mui-error .MuiOutlinedInput-notchedOutline": {
        borderColor: "#d32f2f",
    },
    "& .MuiFormHelperText-root": {
        fontSize: "1.2rem",
    },
    "& .MuiInputBase-input": {
        fontSize: "1.6rem",
        lineHeight: "2.3rem",
        padding: "0.8rem 1.2rem",
    },
    "& .MuiInputBase-root": {
        padding: 0,
    },
});
const TextField = ({ ...props }) => {
    return <StyledTextField {...props} />;
};

export default React.memo(TextField);
