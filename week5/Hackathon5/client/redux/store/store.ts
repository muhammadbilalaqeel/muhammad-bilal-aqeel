"use client";

import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../api/authApiSlice";
import authReducer from '@/redux/slices/authSlice'
import { auctionsApi } from "../api/auctionApiSlice";
import { userApi } from "../api/usersApiSlice";
import { biddingApi } from "../api/biddingApiSlice";


export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [auctionsApi.reducerPath]: auctionsApi.reducer,
    [userApi.reducerPath]:userApi.reducer,
    [biddingApi.reducerPath]:biddingApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware,auctionsApi.middleware,userApi.middleware,biddingApi.middleware),
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
