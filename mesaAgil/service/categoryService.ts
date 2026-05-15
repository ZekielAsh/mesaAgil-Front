import API_URL from '@/constants/api';
import { Category } from '@/types/model/Category';

const headers = {
  'Content-Type': 'application/json',
  'ngrok-skip-browser-warning': 'true'
};

export const getCategories =
  async (): Promise<Category[]> => {
    const response = await fetch(
      `${API_URL}/categories`,
      { headers }
    );

    if (!response.ok) {
      throw new Error(
        'Error al obtener categorías'
      );
    }

    return response.json();
  };

export const createCategory =
  async (
    name: string
  ): Promise<Category> => {
    const response = await fetch(
      `${API_URL}/categories`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify({
          name
        })
      }
    );

    if (!response.ok) {
      throw new Error(
        'Error al crear categoría'
      );
    }

    return response.json();
  };

export const updateCategory =
  async (
    id: number,
    name: string
  ): Promise<Category> => {
    const response = await fetch(
      `${API_URL}/categories/${id}`,
      {
        method: 'PUT',
        headers,
        body: JSON.stringify({
          name
        })
      }
    );

    if (!response.ok) {
      throw new Error(
        'Error al actualizar categoría'
      );
    }

    return response.json();
  };

export const deleteCategory =
  async (
    id: number
  ): Promise<void> => {
    const response = await fetch(
      `${API_URL}/categories/${id}`,
      {
        method: 'DELETE',
        headers
      }
    );

    if (!response.ok) {
      throw new Error(
        'Error al eliminar categoría'
      );
    }
  };