import {
  openTableSession,
  closeTableSession
} from '@/service/tableService';

import Toast from 'react-native-toast-message';

export function useTableSessionManagement() {

  const openSession = async (
    tableId: number
  ) => {

    await openTableSession(tableId);

    Toast.show({
      type: 'success',
      text1: 'Sesión iniciada'
    });

  };

  const closeSession = async (
    tableId: number
  ) => {

    await closeTableSession(tableId);

    Toast.show({
      type: 'success',
      text1: 'Sesión finalizada'
    });

  };

  return {
    openSession,
    closeSession
  };
}