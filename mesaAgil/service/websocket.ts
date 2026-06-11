import { Client } from '@stomp/stompjs';
import { Platform } from 'react-native';
import SockJS from 'sockjs-client';

export const stompClient = new Client({
  webSocketFactory: () =>
    new SockJS(`${Platform.OS === 'android' ? process.env.EXPO_PUBLIC_API_URL : 'http://localhost:8080'}/ws`),

  reconnectDelay: 5000
});
