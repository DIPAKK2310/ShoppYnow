import { createSlice } from "@reduxjs/toolkit";


const cartsystem = createSlice({

    name:"cart",
    initialState:[],
    reducers:{
        addcart(state,action){
            state.push(action.payload)
        },

        removecart(state,action){
            state.shift(action.payload)
        }
    }


})

export default cartsystem.reducer

export const {addcart,removecart} = cartsystem.actions