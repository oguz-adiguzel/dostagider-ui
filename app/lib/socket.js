import { io } from "socket.io-client";

export const socket = io("https://dostagider-api.onrender.com", {
  autoConnect: false,
  withCredentials: true,
});
