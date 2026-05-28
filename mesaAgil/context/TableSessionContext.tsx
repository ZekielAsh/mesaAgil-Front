import { TableSession } from '@/types/TableQr';
import { createContext, ReactNode, useContext, useState } from 'react';

interface TableSessionContextType {
  session: TableSession | null;
  setSession: (session: TableSession) => void;
  clearSession: () => void;
}

const TableSessionContext = createContext<TableSessionContextType | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export const TableSessionProvider = ({ children }: Props) => {
  const [session, setSessionState] = useState<TableSession | null>(null);

  const setSession = (newSession: TableSession) => {
    setSessionState(newSession);
  };

  const clearSession = () => {
    setSessionState(null);
  };

  return (
    <TableSessionContext.Provider
      value={{
        session,
        setSession,
        clearSession
      }}
    >
      {children}
    </TableSessionContext.Provider>
  );
};

export const useTableSession = (): TableSessionContextType => {
  const context = useContext(TableSessionContext);

  if (!context) {
    throw new Error('useTableSession must be used inside TableSessionProvider');
  }

  return context;
};