import { Platform } from 'react-native';

const API_URL = Platform.OS === 'android' ? process.env.EXPO_PUBLIC_API_URL : 'http://localhost:8080';

export default API_URL;
