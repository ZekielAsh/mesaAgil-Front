import { createEmployee, deleteEmployee, resetEmployeePassword, updateEmployee } from '@/service/userService';
import { useAuth } from './useAuth';

export function useEmployeeActions(refresh: () => Promise<void>) {
  const { user } = useAuth();

  const create = async (username: string, password: string, role: string) => {
    await createEmployee(username, password, role, user?.token ?? '');
    await refresh();
  };

  const update = async (id: number, username: string) => {
    await updateEmployee(id, username, user?.token ?? '');
    await refresh();
  };

  const remove = async (id: number) => {
    await deleteEmployee(id, user?.token ?? '');
    await refresh();
  };

  const resetPassword = async (id: number, password: string) => {
    await resetEmployeePassword(id, password, user?.token ?? '');
  };

  return {
    create,
    update,
    remove,
    resetPassword
  };
}
