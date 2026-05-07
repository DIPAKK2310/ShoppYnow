import { createSlice } from "@reduxjs/toolkit";

const cartsystem = createSlice({
    name: "cart",
    initialState: {
        items: []
    },
    reducers: {
        addcart(state, action) {
            state.items.push(action.payload)
        },

        removecart(state, action) {
            // Remove only the FIRST item matching the _id (not all duplicates)
            const indexToRemove = state.items.findIndex(
                (item) => item._id === action.payload
            );
            if (indexToRemove !== -1) {
                state.items.splice(indexToRemove, 1);
            }
        }
    }
})

export default cartsystem.reducer

export const { addcart, removecart } = cartsystem.actions