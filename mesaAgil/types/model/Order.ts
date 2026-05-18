import { OrderItem } from '@/types/model/OrderItem';

export interface Order {
  id: number;
  tableId: number;
  orderItems: OrderItem[];
  status: OrderStatus;
  createdAt: Date;
  closedAt?: Date | null;
}

export enum OrderStatus {
  OPEN,
  CLOSED
}
