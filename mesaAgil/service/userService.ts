import { apiClient } from '@/api/apiClient';
import { User } from '@/types/model/User';
import { UserUpdate } from '@/types/UserUpdate';

export async function login(username: string, password: string) {
  return apiClient.post<User>(`/auth/login`, {
    username: username,
    password: password
  });
}

export function createEmployee(username: string, password: string, role: string, token: string) {
  return apiClient.post<void>(
    '/users',
    {
      username,
      password,
      role
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
}

export function updateEmployee(id: number, username: string, token: string) {
  return apiClient.put<void>(
    `/users/${id}`,
    {
      username
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
}

export function deleteEmployee(id: number, token: string) {
  return apiClient.delete<void>(`/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

export function resetEmployeePassword(id: number, password: string, token: string) {
  return apiClient.put<void>(
    `/users/${id}/password`,
    {
      password
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
}

export function getEmployees(token: string) {
  return apiClient.get<UserUpdate[]>('/users', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}
