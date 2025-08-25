// src/redux/slices/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

const initialState = {
  user: user ? JSON.parse(user) : null,
  isAuthenticated: !!token,
  token: token || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { token, user } = action.payload;
      state.token = token;
      state.user = user;
      state.isAuthenticated = true;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    },
    logout: (state, action) => {

      state.token = null;
      state.user = null;
      state.isAuthenticated = false;


      localStorage.removeItem("token");
      localStorage.removeItem("user");

      if (action.payload?.clearOtherSlices) {
        action.payload.clearOtherSlices(); 
      }
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
