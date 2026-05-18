import { useState } from 'react';
import { AppMode, EstablishmentRole } from '@/constants/mockProfile';

export const useProfileMode = () => {
  const [mode, setMode] = useState<AppMode>('CLIENT');

  const [role, setRole] =
    useState<EstablishmentRole>('ADMIN');

  return {
    mode,
    role,
    setMode,
    setRole
  };
};