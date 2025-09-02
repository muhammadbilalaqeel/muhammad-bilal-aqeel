"use client";

import { useEffect } from "react";
import { connectSocket, disconnectSocket, getSocket } from "@/utility/socket";

export const useSocket = (token: string | null) => {
  useEffect(() => {
    if (token) {
      connectSocket(token);
    }

    return () => {
      disconnectSocket();
    };
  }, [token]);

  return getSocket();
};

