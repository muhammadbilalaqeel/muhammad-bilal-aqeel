import { User } from "@/types/order.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";



interface AuthState {
  user: User | null;
  token: string | null;
}

const storedAuth =
  typeof window !== "undefined" ? localStorage.getItem("auth") : null;

const initialState: AuthState = storedAuth
  ? JSON.parse(storedAuth)
  : { user: null, token: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthState>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("auth", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("auth");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
