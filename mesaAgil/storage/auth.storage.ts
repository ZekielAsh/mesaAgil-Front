import { User } from '@/types/model/User';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTH_KEY = 'auth';

export async function saveAuth(auth: User) {
  await AsyncStorage.setItem(AUTH_KEY, JSON.stringify(auth));
}

export async function getAuth() {
  const value = await AsyncStorage.getItem(AUTH_KEY);

  if (!value) {
    return null;
  }

  return JSON.parse(value);
}

export async function removeAuth() {
  await AsyncStorage.removeItem(AUTH_KEY);
}
