import React, { createContext, useEffect, useMemo } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext();

export function SocketProvider({ children }) {
  const socket = useMemo(() => io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000'), []);

  useEffect(() => {
    return () => socket.disconnect();
  }, [socket]);

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
}
