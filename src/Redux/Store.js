import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "./counterSlice";
import { brandReducer } from "./brandSlice";


export let store = configureStore({
    reducer:{
counter: counterReducer,
brands: brandReducer
    }
});