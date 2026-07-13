import { io } from "socket.io-client";

export const socket = io(" https://dostagider-api.vercel.app", {
  autoConnect: false,
  withCredentials: true,
});
