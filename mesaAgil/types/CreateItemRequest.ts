import * as ImagePicker from 'expo-image-picker';

export interface CreateItemRequest {
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  categoryId: number;
  imageFile?: ImagePicker.ImagePickerAsset;
}
