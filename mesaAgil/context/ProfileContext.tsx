import { AppMode } from '@/constants/mockProfile';
import { createContext, ReactNode, useContext, useState } from 'react';

interface ProfileContextType {
  mode: AppMode;
  setMode: (mode: AppMode) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export const ProfileProvider = ({ children }: Props) => {
  const [mode, setMode] = useState<AppMode>('CLIENT');

  return (
    <ProfileContext.Provider
      value={{
        mode,
        setMode
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = (): ProfileContextType => {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error('useProfile must be used inside ProfileProvider');
  }

  return context;
};
