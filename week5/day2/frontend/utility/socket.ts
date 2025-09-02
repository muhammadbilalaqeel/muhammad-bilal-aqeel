// utils/socket.ts
"use client";

import { io, Socket } from "socket.io-client";
import { toast } from "sonner";

let socket: Socket | null = null;

export const connectSocket = (token: string): Socket => {
  if (!socket) {
    socket = io("https://week5-day2-backend-production-fb8c.up.railway.app/", {
      transports: ["websocket"],
      query: { token },
    });

    socket.on("connect", () => {
      console.log("Connected to WebSocket server", socket?.id);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
    });

    //  socket.on("offlineNotifications", (data) => {
       
    //    data.forEach((n: any) => toast.info(n.message, { id: n._id || n.message }));
    //  });
 

  }

  return socket;
};

export const getSocket = (): Socket | null => socket;
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
