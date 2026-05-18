import {
  AppMode,
  EstablishmentRole
} from '@/constants/mockProfile';

import {
  createContext,
  ReactNode,
  useContext,
  useState
} from 'react';

interface ProfileContextType {
  mode: AppMode;

  role: EstablishmentRole;

  setMode: (mode: AppMode) => void;

  setRole: (
    role: EstablishmentRole
  ) => void;
}

const ProfileContext =
  createContext<
    ProfileContextType | undefined
  >(undefined);

interface Props {
  children: ReactNode;
}

export const ProfileProvider = ({
  children
}: Props) => {
  const [mode, setMode] =
    useState<AppMode>('CLIENT');

  const [role, setRole] =
    useState<EstablishmentRole>(
      'ADMIN'
    );

  return (
    <ProfileContext.Provider
      value={{
        mode,
        role,
        setMode,
        setRole
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile =
  (): ProfileContextType => {
    const context =
      useContext(ProfileContext);

    if (!context) {
      throw new Error(
        'useProfile must be used inside ProfileProvider'
      );
    }

    return context;
  };