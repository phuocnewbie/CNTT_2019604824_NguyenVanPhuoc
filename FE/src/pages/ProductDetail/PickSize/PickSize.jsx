import React from "react";
import { Box } from "@mui/material";
import "./pickSize.scss";
const PickSize = ({ sizes, value, setValue, isError }) => {
    return (
        <Box className='product-Size useFont-Nunito'>
            <span>Kích cỡ:</span>
            <Box>
                {sizes.map((size) => (
                    <button
                        key={size.size.id}
                        className={`size-item useFont-Nunito ${
                            size.size.description === value ? "selected" : ""
                        }`}
                        onClick={() => setValue(size.size.description)}
                    >
                        {size.size.description}
                    </button>
                ))}
            </Box>
            {isError && (
                <span className='error-message'>
                    Vui lòng chọn kích thước trước
                </span>
            )}
        </Box>
    );
};

export default React.memo(PickSize);
