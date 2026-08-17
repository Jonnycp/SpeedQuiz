import { io } from "socket.io-client";

let socket = null;

export function initSocketConnection(token) {
  if (!socket) {
    socket = io(import.meta.env.VITE_BACKEND_URL, {
      auth: { token },
      autoConnect: false,
    });
  } else {
    socket.auth = { token };
  }
  return socket;
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}