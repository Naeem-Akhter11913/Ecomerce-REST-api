import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../redux/feature/auth/authSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
    }
})