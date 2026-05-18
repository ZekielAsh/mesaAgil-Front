import { Item } from '@/types/model/Item';

export interface OrderItem {
  id: number;
  orderId: number;
  item: Item;
  quantity: number;
  price: number;
  status: OrderItemStatus;
  createdAt: Date;
}

export enum OrderItemStatus {
  PENDING = 'PENDING',
  IN_PREPARATION = 'IN PREPARATION',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED'
}
