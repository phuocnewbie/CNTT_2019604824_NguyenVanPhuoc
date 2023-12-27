import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    isLogin: localStorage.getItem("authTokens") ? true : false,
    authToken: localStorage.getItem("authTokens")
        ? JSON.parse(localStorage.getItem("authTokens"))
        : null,
};

export const tokenSlice = createSlice({
    name: "token",
    initialState: initialState,
    reducers: {
        setToken: (state, action) => {
            state.isLogin = action.payload.isLogin;
            state.authToken = action.payload.authToken;
        },
        clearToken: (state) => {
            localStorage.removeItem("authTokens");
            state.isLogin = false;
            state.authToken = "";
        },
    },
});
export const { setToken, clearToken } = tokenSlice.actions;
export default tokenSlice.reducer;
