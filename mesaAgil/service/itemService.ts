import API_URL from '@/constants/api';
import { getAuth } from '@/storage/auth.storage';
import { CreateItemRequest } from '@/types/CreateItemRequest';
import { UpdateItemRequest } from '@/types/UpdateItemRequest';
import { Category } from '@/types/model/Category';
import { Item } from '@/types/model/Item';

async function getHeaders() {
  const auth = await getAuth();

  return {
    'Content-Type': 'application/json',
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
  const response = await fetch(`${API_URL}/items`, {
    method: 'POST',
    headers: await getHeaders(),
    body: JSON.stringify(request)
  });

  if (!response.ok) {
    throw new Error('Error al crear comida');
  }

  return response.json();
};

export const updateItem = async (id: number, request: UpdateItemRequest): Promise<Item> => {
  const response = await fetch(`${API_URL}/items/${id}`, {
    method: 'PUT',
    headers: await getHeaders(),
    body: JSON.stringify(request)
  });

  if (!response.ok) {
    throw new Error('Error al actualizar comida');
  }

  return response.json();
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
