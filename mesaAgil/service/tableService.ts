import API_URL from '@/constants/api';
import { getAuth } from '@/storage/auth.storage';
import { RestaurantTableQrResponse, TableQrInfo, TableSession, TableSessionResponse } from '@/types/TableQr';

async function getAdminHeaders() {
  const auth = await getAuth();

  return {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true',
    ...(auth?.token && {
      Authorization: `Bearer ${auth.token}`
    })
  };
}

const getPublicQrDownloadUrl = (qrToken: string) => `${API_URL}/tables/qr/${qrToken}/image?download=true`;

const toAbsoluteUrl = (url: string) => {
  if (url.startsWith('http')) {
    return url;
  }

  return `${API_URL}${url.startsWith('/') ? '' : '/'}${url}`;
};

const mapQrInfo = (response: RestaurantTableQrResponse): TableQrInfo => ({
  ...response,
  scanUrl: toAbsoluteUrl(response.scanUrl),
  qrImageUrl: toAbsoluteUrl(response.qrImageUrl),
  tableLabel: `Mesa ${response.tableNumber}`,
  qrDownloadUrl: getPublicQrDownloadUrl(response.qrToken)
});

const mapSession = (response: TableSessionResponse): TableSession => ({
  ...response,
  tableLabel: `Mesa ${response.tableNumber}`
});

async function parseResponse<T>(response: Response, errorMessage: string): Promise<T> {
  if (!response.ok) {
    throw new Error(errorMessage);
  }

  return response.json();
}

export const getTableQrInfo = async (tableId: number): Promise<TableQrInfo> => {
  const response = await fetch(`${API_URL}/tables/${tableId}/qr-info`, {
    headers: await getAdminHeaders()
  });

  const data = await parseResponse<RestaurantTableQrResponse>(response, 'Error al obtener el QR de la mesa');
  return mapQrInfo(data);
};

export const getTablesQrInfo = async (): Promise<TableQrInfo[]> => {
  const response = await fetch(`${API_URL}/tables/qr-info`, {
    headers: await getAdminHeaders()
  });

  const data = await parseResponse<RestaurantTableQrResponse[]>(response, 'Error al obtener los QR de las mesas');
  return data.map(mapQrInfo);
};

export const resolveTableSessionByQr = async (qrToken: string): Promise<TableSession> => {
  const response = await fetch(`${API_URL}/tables/qr/${qrToken}/session`, {
    headers: {
      'ngrok-skip-browser-warning': 'true'
    }
  });

  const data = await parseResponse<TableSessionResponse>(response, 'El QR no corresponde a una mesa');
  return mapSession(data);
};
