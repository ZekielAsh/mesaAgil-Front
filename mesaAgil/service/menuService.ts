import { MenuResponse } from '@/types/MenuResponse';
import API_URL from '../constants/api';

export const getMenu = async (): Promise<MenuResponse> => {
  const response = await fetch(`${API_URL}/menu`, {
    headers: {
      'ngrok-skip-browser-warning': 'true'
    }
  });

  console.log('STATUS:', response.status);

  if (!response.ok) {
    throw new Error('Error en la respuesta');
  }

  const data: MenuResponse = await response.json();
  return data;
};
