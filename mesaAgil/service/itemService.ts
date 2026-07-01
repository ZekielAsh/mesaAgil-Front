import API_URL from '@/constants/api';
import { getAuth } from '@/storage/auth.storage';
import { CreateItemRequest } from '@/types/CreateItemRequest';
import { UpdateItemRequest } from '@/types/UpdateItemRequest';
import { Category } from '@/types/model/Category';
import { Item } from '@/types/model/Item';
import * as ImagePicker from 'expo-image-picker';

async function getHeaders(isMultipart = false) {
  const auth = await getAuth();

  return {
    ...(isMultipart ? {} : { 'Content-Type': 'application/json' }),
    'ngrok-skip-browser-warning': 'true',
    ...(auth?.token && {
      Authorization: `Bearer ${auth.token}`
    })
  };
}

export const getItems = async (): Promise<Item[]> => {
  const response = await fetch(`${API_URL}/items`, {
    headers: await getHeaders()
  });

  if (!response.ok) {
    throw new Error('Error al obtener comidas');
  }

  return response.json();
};

export const createItem = async (request: CreateItemRequest): Promise<Item> => {
  const headers = await getHeaders(true);

  delete headers['Content-Type'];

  console.log(request);

  const response = await fetch(`${API_URL}/items`, {
    method: 'POST',
    headers,
    body: buildItemFormData(request)
  });

  if (!response.ok) {
    throw new Error('Error al crear comida');
  }

  return response.json();
};

export const updateItem = async (id: number, request: UpdateItemRequest): Promise<Item> => {
  const headers = await getHeaders(true);

  delete headers['Content-Type'];

  const response = await fetch(`${API_URL}/items/${id}`, {
    method: 'PUT',
    headers,
    body: buildItemFormData(request)
  });

  if (!response.ok) {
    throw new Error('Error al actualizar comida');
  }

  return response.json();
};

type ItemRequest = {
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  categoryId: number;
  imageFile?: ImagePicker.ImagePickerAsset;
};

export const buildItemFormData = (request: ItemRequest): FormData => {
  const formData = new FormData();

  formData.append('name', request.name);
  formData.append('description', request.description);
  formData.append('price', request.price.toString());
  formData.append('categoryId', request.categoryId.toString());

  if (request.imageUrl.trim() !== '') {
    formData.append('imageUrl', request.imageUrl);
  }

  // solo funciona para web XD
  if (request.imageFile?.file) {
    formData.append('imageFile', request.imageFile.file);
  }

  return formData;
};

export const deleteItem = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/items/${id}`, {
    method: 'DELETE',
    headers: await getHeaders()
  });

  if (!response.ok) {
    throw new Error('Error al eliminar comida');
  }
};

export const getCategories = async (): Promise<Category[]> => {
  const response = await fetch(`${API_URL}/categories`, {
    headers: await getHeaders()
  });

  if (!response.ok) {
    throw new Error('Error al obtener categorías');
  }

  return response.json();
};
