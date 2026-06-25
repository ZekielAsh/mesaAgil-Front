import { OrderItem } from '@/types/model/OrderItem';

export interface Order {
  id: number;
  tableId: number;
  assignedStaffUsername: string;
  orderItems: OrderItem[];
  status: OrderStatus;
  billRequested: boolean;
  createdAt: Date;
  closedAt?: Date | null;
}

export enum OrderStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
  CANCELLED = 'CANCELLED'
}
