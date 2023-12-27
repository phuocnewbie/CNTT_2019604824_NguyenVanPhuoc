import React from "react";
import { styled } from "@mui/material/styles";
import {
    FormControl,
    InputLabel,
    Select as MuiSelect,
    MenuItem,
    FormHelperText,
} from "@mui/material";
const StyledMenuItem = styled(MenuItem)({
    fontSize: "1.6rem",
});
const Select = ({
    label,
    options,
    isError,
    errorMessage,
    field,
    value,
    onChange,
    disabledEmValue = false,
    ...props
}) => {
    return (
        <FormControl
            {...props}
            fullWidth
            error={isError}
            sx={{
                "& .MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                        borderColor: "#333",
                    },
                "& .MuiFormLabel-root:not(.MuiInputLabel-shrink)": {
                    transform: "translate(1.2rem, 0.8rem)",
                },
                "& .MuiSelect-select": {
                    p: "1.2rem",
                    fontSize: "1.6rem",
                    minHeight: "0!important",
                },
                "& .MuiFormLabel-root": {
                    fontSize: "1.6rem",
                    "&.Mui-focused": {
                        color: "#333",
                    },
                },
                "& .css-14lo706": {
                    fontSize: "1.2rem",
                },
                "& .MuiFormHelperText-root": {
                    fontSize: "1.2rem",
                },
                ...props.sx,
            }}
        >
            <InputLabel>{label}</InputLabel>
            <MuiSelect
                label={label}
                value={value}
                onChange={onChange}
                {...field}
            >
                {!disabledEmValue && (
                    <StyledMenuItem value=''>
                        <em>{label}</em>
                    </StyledMenuItem>
                )}
                {options.map((option) => (
                    <StyledMenuItem
                        key={option.id || option.name}
                        value={option.id || option.name}
                    >
                        {option.name}
                    </StyledMenuItem>
                ))}
            </MuiSelect>
            {isError && <FormHelperText>{errorMessage}</FormHelperText>}
        </FormControl>
    );
};

export default Select;
