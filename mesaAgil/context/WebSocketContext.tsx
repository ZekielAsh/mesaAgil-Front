import { stompClient } from '@/service/websocket';
import { createContext, useEffect, useState } from 'react';

interface WebSocketContextType {
  connected: boolean;
}

export const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export function WebSocketProvider({ children }: { children: React.ReactNode }) {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    stompClient.onConnect = () => {
      setConnected(true);
    };

    stompClient.onDisconnect = () => {
      setConnected(false);
    };

    stompClient.onWebSocketClose = () => {
      setConnected(false);
    };

    stompClient.activate();

    return () => {
      stompClient.deactivate();
    };
  }, []);

  return <WebSocketContext.Provider value={{ connected }}>{children}</WebSocketContext.Provider>;
}
