import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import authReducer from './authSlice';
import { cloudinaryApi } from "./cloudinarySlice"; 
import { nestApiSlice } from "./nestApiSlice";

export const store = configureStore({
  reducer: {
    authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [cloudinaryApi.reducerPath]: cloudinaryApi.reducer, 
     [nestApiSlice.reducerPath]: nestApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiSlice.middleware)
      .concat(cloudinaryApi.middleware).concat(nestApiSlice.middleware), 
});
