import { configureStore } from "@reduxjs/toolkit";
import { tasksSlice } from "./features/tasksSlice";
import TaskReducer from "./features/tasksSlice"
export const store = configureStore({
    reducer:{
        tasks:TaskReducer,
    }
});


