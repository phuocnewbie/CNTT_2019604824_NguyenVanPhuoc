import React from "react";
import { styled } from "@mui/material/styles";
import { Button as MuiBtn } from "@mui/material";
const StyledButton = styled(MuiBtn)({
    zIndex: 10,
    fontSize: "1.6rem",
    transition: "0.6s all ease",
    "&.buttonContained": {
        color: "#fff",
        background: "#29323c",
    },
    "&.buttonText": {
        color: "#495057",
        background: "inherit",
    },
    "::before": {
        background: "linear-gradient(to right, #859398, #283048)",
        content: "''",
        width: "0",
        height: "100%",
        position: "absolute",
        top: "50%",
        left: 0,
        transform: "translateY(-50%)",
        zIndex: "-1",
        transition: "all 0.6s ease",
        borderRadius: "inherit",
    },
    ":hover::before": {
        width: "100%",
    },
    "&.buttonText:hover": {
        color: "#fff",
    },
});
const Button = ({ children, className, variant = "contained", ...props }) => {
    return (
        <StyledButton
            className={`${className} ${
                variant === "text" ? "buttonText" : "buttonContained"
            } useFont-Nunito`}
            {...props}
        >
            {children}
        </StyledButton>
    );
};

export default React.memo(Button);
