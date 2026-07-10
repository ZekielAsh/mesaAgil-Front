export interface BillItem {
  itemName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface BillSummary {
  orderId: number;
  tableNumber: number;
  orderedAt: string;
  items: BillItem[];
  total: number;
}