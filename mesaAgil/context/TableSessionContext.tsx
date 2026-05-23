import {
  getTableSession,
  removeTableSession,
  saveTableSession
} from '@/storage/tableSession.storage';
import { TableSession } from '@/types/TableQr';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface TableSessionContextType {
  session: TableSession | null;
  loading: boolean;
  setSession: (session: TableSession) => Promise<void>;
  clearSession: () => Promise<void>;
}

const TableSessionContext = createContext<TableSessionContextType | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export const TableSessionProvider = ({ children }: Props) => {
  const [session, setSessionState] = useState<TableSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSession();
  }, []);

  const loadSession = async () => {
    try {
      const savedSession = await getTableSession();
      setSessionState(savedSession);
    } finally {
      setLoading(false);
    }
  };

  const setSession = async (newSession: TableSession) => {
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
        loading,
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
