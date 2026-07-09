import { getEmployees } from '@/service/userService';
import { UserUpdate } from '@/types/UserUpdate';
import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';

export function useEmployees() {
  const { user } = useAuth();
  const [employees, setEmployees] = useState<UserUpdate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  const fetchEmployees = async () => {
    try {
      setError(undefined);
      const response = await getEmployees(user?.token ?? '');
      setEmployees(response.data);
    } catch (err) {
      setError('Error al cargar comidas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return {
    employees,
    loading,
    error,
    refresh: fetchEmployees
  };
}
