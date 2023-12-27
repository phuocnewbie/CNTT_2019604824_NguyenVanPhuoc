import { createSlice } from "@reduxjs/toolkit";
export const managerSlice = createSlice({
    name: "manager",
    initialState: {
        currentTab: "",
    },
    reducers: {
        managerChangeTab: (state, action) => {
            state.currentTab = action.payload;
        },
    },
});
export const { managerChangeTab } = managerSlice.actions;
export default managerSlice.reducer;
