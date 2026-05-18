export interface CreateItemRequest {
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  categoryId: number;
}