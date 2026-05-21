import { apiClient } from '@/api/apiClient';
import { User } from '@/types/model/User';

export function login(username: string, password: string) {
  return apiClient.post<User>(`/auth/login`, {
    username: username,
    password: password
  });
}
