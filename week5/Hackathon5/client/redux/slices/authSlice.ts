"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types/auth/authTypes";

interface AuthState {
  user: User | null;
  token: string | null;
}

const initialState: AuthState = { user: null, token: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loadAuthState: (state) => {
      if (typeof window !== "undefined") {
        const storedAuth = localStorage.getItem("auth");
        if (storedAuth) {
          const parsed = JSON.parse(storedAuth);
          state.user = parsed.user || null;
          state.token = parsed.token || null;
        }
      }
    },

    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token?: string; access_token?: string }>
    ) => {
      state.user = action.payload.user;
      state.token =
        action.payload.token ||
        action.payload.access_token ||
        (action.payload.user as any).token ||
        null;

      if (typeof window !== "undefined") {
        localStorage.setItem("auth", JSON.stringify(state));
      }
    },

    logout: (state) => {
      state.user = null;
      state.token = null;

      if (typeof window !== "undefined") {
        localStorage.removeItem("auth");
      }
    },
  },
});

export const { setCredentials, logout, loadAuthState } = authSlice.actions;
export default authSlice.reducer;
