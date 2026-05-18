import axios from 'axios';
import { Platform } from 'react-native';

export const apiClient = axios.create({
  baseURL: Platform.OS === 'android' ? process.env.EXPO_PUBLIC_API_URL : 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 5000
});
