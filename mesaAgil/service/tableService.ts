import API_URL from '@/constants/api';
import { getAuth } from '@/storage/auth.storage';
import { TableOccupancy } from '@/types/TableOccupancy';
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

export const createTable = async (number: number): Promise<TableQrInfo> => {
  const response = await fetch(`${API_URL}/tables`, {
    method: 'POST',
    headers: await getAdminHeaders(),
    body: JSON.stringify({ number })
  });

  if (response.status === 409) {
    throw new Error('Ya existe una mesa con ese número');
  }

  if (response.status === 400) {
    throw new Error('El número de mesa es obligatorio y debe ser mayor a cero');
  }

  if (!response.ok) {
    throw new Error('Error al crear la mesa');
  }

  const data = await response.json() as RestaurantTableQrResponse;
  return mapQrInfo(data);
};

export const updateTable = async (tableId: number, number: number): Promise<TableQrInfo> => {
  const response = await fetch(`${API_URL}/tables/${tableId}`, {
    method: 'PUT',
    headers: await getAdminHeaders(),
    body: JSON.stringify({ number })
  });

  if (response.status === 409) {
    throw new Error('Ya existe una mesa con ese número');
  }

  if (response.status === 400) {
    throw new Error('El número de mesa es obligatorio y debe ser mayor a cero');
  }

  if (!response.ok) {
    throw new Error('Error al editar la mesa');
  }

  const data = await response.json() as RestaurantTableQrResponse;
  return mapQrInfo(data);
};

export const enableTable = async (tableId: number): Promise<TableQrInfo> => {
  const response = await fetch(`${API_URL}/tables/${tableId}/enable`, {
    method: 'PATCH',
    headers: await getAdminHeaders()
  });

  if (!response.ok) {
    throw new Error('Error al habilitar la mesa');
  }

  const data = await response.json() as RestaurantTableQrResponse;
  return mapQrInfo(data);
};

export const closeTable = async (tableId: number): Promise<TableQrInfo> => {
  const response = await fetch(`${API_URL}/tables/${tableId}/close`, {
    method: 'PATCH',
    headers: await getAdminHeaders()
  });

  if (!response.ok) {
    throw new Error('Error al cerrar la mesa');
  }

  const data = await response.json() as RestaurantTableQrResponse;
  return mapQrInfo(data);
};

export const getTableOccupancy = async (): Promise<TableOccupancy[]> => {
  const response = await fetch(`${API_URL}/tables/occupancy`, {
    headers: await getAdminHeaders()
  });

  return parseResponse<TableOccupancy[]>(
    response,
    'Error al obtener ocupación de mesas'
  );
};

export const updateCustomerCount = async (sessionId: number, customerCount: number) => {
  const response = await fetch(
    `${API_URL}/table-sessions/${sessionId}/customers`,
    {
      method: 'PATCH',
      headers: await getAdminHeaders(),
      body: JSON.stringify({
        customerCount
      })
    }
  );

  if (!response.ok) {
    throw new Error('Error al actualizar cantidad de personas');
  }

  return response.json();
};

export const assignTable = async (tableId: number): Promise<TableOccupancy> => {
  const response = await fetch(
    `${API_URL}/tables/${tableId}/assign`,
    {
      method: 'PATCH',
      headers: await getAdminHeaders()
    }
  );

  if (!response.ok) {
    throw new Error('No se pudo asignar la mesa');
  }

  return response.json();
};

export const unassignTable = async (tableId: number): Promise<TableOccupancy> => {
  const response = await fetch(
    `${API_URL}/tables/${tableId}/unassign`,
    {
      method: 'PATCH',
      headers: await getAdminHeaders()
    }
  );

  if (!response.ok) {
    throw new Error('No se pudo liberar la mesa');
  }

  return response.json();
};

export const getAssignedTables = async (): Promise<TableOccupancy[]> => {
  const response = await fetch(
    `${API_URL}/tables/assigned`,
    {
      headers: await getAdminHeaders()
    }
  );

  return parseResponse<TableOccupancy[]>(response, 'Error al obtener mesas asignadas');
};
