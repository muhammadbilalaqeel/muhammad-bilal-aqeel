import { configureStore } from "@reduxjs/toolkit";
import { tasksApi } from "../services/taskApi";

export const store = configureStore({
  reducer: {
    [tasksApi.reducerPath]: tasksApi.reducer,
  },
  middleware: (getDefault) => getDefault().concat(tasksApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
