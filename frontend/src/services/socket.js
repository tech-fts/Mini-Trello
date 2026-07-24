import { io } from 'socket.io-client';

export function connectSocket() {
  return io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000');
}
