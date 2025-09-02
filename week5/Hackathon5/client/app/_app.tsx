// redux/Providers.tsx
"use client";

import { useAppDispatch } from "@/redux/hooks";
import { loadAuthState } from "@/redux/slices/authSlice";
import { store } from "@/redux/store/store";
import { useEffect } from "react";
import { Provider } from "react-redux";


export function Providers({ children }: { children: React.ReactNode }) {
    
  return <Provider store={store}>{children}</Provider>;
}
