import { createSlice } from "@reduxjs/toolkit";
// gọi api
export const cartSlice = createSlice({
    name: "cart",
    initialState: { carts: [] },
    reducers: {
        setCart: (state, action) => {
            state.carts = action.payload;
        },
        cartIncreaseQuantity: (state, action) => {
            state.carts.forEach((cart) => {
                if (cart.id === action.payload)
                    cart.quantity = cart.quantity + 1;
            });
        },
        cartReducedQuantity: (state, action) => {
            state.carts.forEach((cart) => {
                if (cart.id === action.payload)
                    cart.quantity = cart.quantity - 1;
            });
        },
        clearCart: (state) => {
            state.carts = [];
        },
    },
});

export const { setCart, cartIncreaseQuantity, cartReducedQuantity, clearCart } =
    cartSlice.actions;
export default cartSlice.reducer;
