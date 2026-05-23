import { TableSession } from '@/types/TableQr';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TABLE_SESSION_KEY = 'tableSession';

export async function saveTableSession(session: TableSession) {
  await AsyncStorage.setItem(TABLE_SESSION_KEY, JSON.stringify(session));
}

export async function getTableSession() {
  const value = await AsyncStorage.getItem(TABLE_SESSION_KEY);

  if (!value) {
    return null;
  }

  return JSON.parse(value) as TableSession;
}

export async function removeTableSession() {
  await AsyncStorage.removeItem(TABLE_SESSION_KEY);
}
