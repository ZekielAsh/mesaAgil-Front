export interface RestaurantTableQrResponse {
  tableId: number;
  tableNumber: number;
  enabled: boolean;
  qrToken: string;
  scanUrl: string;
  qrImageUrl: string;
}

export interface TableQrInfo extends RestaurantTableQrResponse {
  tableLabel: string;
  qrDownloadUrl: string;
}

export interface TableSessionResponse {
  tableId: number;
  tableNumber: number;
  tableEnabled: boolean;
  qrToken: string;
  orderId: number | null;
  orderStatus: string | null;
  activeSession: boolean;
}

export interface TableSession extends TableSessionResponse {
  tableLabel: string;
}
