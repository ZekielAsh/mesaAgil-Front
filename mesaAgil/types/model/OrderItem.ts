import { Item } from '@/types/model/Item';

export interface OrderItem {
  id: number;
  orderId: number;
  tableNumber: number;
  item: Item;
  quantity: number;
  price: number;
  status: OrderItemStatus;
  createdAt: Date;
}

export enum OrderItemStatus {
  PENDING = 'PENDING',
  IN_PREPARATION = 'IN_PREPARATION',
  READY = 'READY',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED'
}
