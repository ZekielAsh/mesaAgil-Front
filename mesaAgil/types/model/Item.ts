export interface Item {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  categoryName: string;
  active?: boolean;
}
