import { configureStore } from "@reduxjs/toolkit";
import { authApi } from './api/authApi';
import authReducer from './slices/authSlice'
import { productApi } from "./api/productApi";
import { categoryApi } from "./api/categoryApi";
import { cartApi } from "./api/cartApi";
import { orderApi } from "./api/orderApi";
import notificationsReducer from "./slices/notificationSlice"
export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]:productApi.reducer,
    [categoryApi.reducerPath]:categoryApi.reducer,
    [cartApi.reducerPath]:cartApi.reducer,
    [orderApi.reducerPath] : orderApi.reducer,
    auth: authReducer,
    notifications: notificationsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware,productApi.middleware,categoryApi.middleware,cartApi.middleware,orderApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
