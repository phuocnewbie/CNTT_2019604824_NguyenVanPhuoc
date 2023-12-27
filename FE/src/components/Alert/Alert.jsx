import React from "react";
import { Alert as MuiAlert } from "@mui/material";
const Alert = React.forwardRef((props, ref) => {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

export default Alert;
