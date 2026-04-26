import { configureStore } from "@reduxjs/toolkit";
import cartsystem from "./Slice"



const store = configureStore({

    reducer:{
        cart:cartsystem
    }
})
export  default store;