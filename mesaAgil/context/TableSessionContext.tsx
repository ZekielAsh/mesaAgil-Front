import { getTableSession, removeTableSession, saveTableSession } from '@/storage/tableSession.storage';
import { TableSession } from '@/types/TableQr';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface TableSessionContextType {
  session: TableSession | null;
  setSession: (session: TableSession) => void;
  clearSession: () => void;
  loading: boolean;
}

const TableSessionContext = createContext<TableSessionContextType | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export const TableSessionProvider = ({ children }: Props) => {
  const [session, setSessionState] =
    useState<TableSession | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    getTableSession()
      .then(saved => {
        if (saved) {
          setSessionState(saved);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const setSession = async (
    newSession: TableSession
  ) => {
    await saveTableSession(newSession);
    setSessionState(newSession);
  };

  const clearSession = async () => {
    await removeTableSession();
    setSessionState(null);
  };

  return (
    <TableSessionContext.Provider
      value={{
        session,
        setSession,
        clearSession,
        loading
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