import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: null,
    full_name: "",
    email: "",
    phone: "",
    address: "",
    gender: null,
    date_of_birth: null,
    username: "",
    avatar: "images/a986302c6bb2e21c396a98aebf115ffe.png",
    role_id: "",
};

export const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        userUpdateProfile: (state, action) => {
            state.id = action.payload.id;
            state.full_name = action.payload.full_name;
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.phone = action.payload.phone;
            state.address = action.payload.address;
            state.gender = action.payload.gender;
            state.date_of_birth = action.payload.date_of_birth;
            state.avatar = action.payload.avatar;
            state.role_id = action.payload.role_id;
        },
        userLogout: (state) => {
            state.id = null;
            state.full_name = "";
            state.email = "";
            state.phone = "";
            state.address = "";
            state.gender = null;
            state.date_of_birth = null;
            state.username = "";
            state.avatar = "images/a986302c6bb2e21c396a98aebf115ffe.png";
            state.role_id = "";
        },
    },
});
export const { userUpdateProfile, userLogout } = userSlice.actions;
export default userSlice.reducer;
