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
            state.items = state.items.filter(
                (item) => item.id !== action.payload
            );
        }
    }


})

export default cartsystem.reducer

export const { addcart, removecart } = cartsystem.actions