import { WebSocketContext } from '@/context/WebSocketContext';
import { useContext } from 'react';

export function useWebSocket() {
  const context = useContext(WebSocketContext);

  if (!context) {
    throw new Error('useWebSocket must be used within WebSocketProvider');
  }

  return context;
}
