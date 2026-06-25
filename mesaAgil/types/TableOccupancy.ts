export enum TableStatus {
  FREE = 'FREE',
  OCCUPIED = 'OCCUPIED',
  CLOSED = 'CLOSED'
}

export interface TableOccupancy {
  tableId: number;
  tableNumber: number;
  status: TableStatus;
  customerCount: number;
  sessionId: number | null;
  assignedStaffId: number | null;
  assignedStaffUsername: string | null;
}