import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import {
  getSocket,
  connectSocket,
  disconnectSocket,
  isSocketConnected,
  type ServerToClientEvents,
  type ClientToServerEvents,
} from "../services/socket";

// ---- Context shape ----
interface SocketContextType {
  isConnected: boolean;
  emit: <Ev extends keyof ClientToServerEvents>(
    event: Ev,
    ...args: Parameters<ClientToServerEvents[Ev]>
  ) => void;
  on: <Ev extends keyof ServerToClientEvents>(
    event: Ev,
    listener: ServerToClientEvents[Ev]
  ) => void;
  off: <Ev extends keyof ServerToClientEvents>(
    event: Ev,
    listener: ServerToClientEvents[Ev]
  ) => void;
}

export const SocketContext = createContext<SocketContextType | undefined>(
  undefined
);

export function SocketProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(() => isSocketConnected());

  useEffect(() => {
    const token = localStorage.getItem("authToken") ?? undefined;
    const socket = connectSocket(token);

    const onConnect = () => setIsConnected(true);
    const onDisconnect = () => setIsConnected(false);
    const onConnectError = () => setIsConnected(false);

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("connect_error", onConnectError);

    // If already connected (e.g. hot-reload), sync state
    if (socket.connected) {
      setIsConnected(true);
    }

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("connect_error", onConnectError);
      disconnectSocket();
    };
  }, []);

  const emit = useCallback<SocketContextType["emit"]>((event, ...args) => {
    const socket = getSocket();
    if (socket.connected) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      socket.emit(event as any, ...args);
    } else {
      console.warn(`[Socket] Cannot emit "${event}" — not connected`);
    }
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const on = useCallback<SocketContextType["on"]>((event: any, listener: any) => {
    const socket = getSocket();
    socket.on(event, listener);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const off = useCallback<SocketContextType["off"]>((event: any, listener: any) => {
    const socket = getSocket();
    socket.off(event, listener);
  }, []);

  return (
    <SocketContext.Provider value={{ isConnected, emit, on, off }}>
      {children}
    </SocketContext.Provider>
  );
}

// ---- Consumer hook ----
export function useSocket() {
  const context = React.useContext(SocketContext);
  if (context === undefined) {
    throw new Error("useSocket must be used within SocketProvider");
  }
  return context;
}
