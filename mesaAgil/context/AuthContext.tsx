import { login as loginRequest } from '@/service/userService';
import { getAuth, removeAuth, saveAuth } from '@/storage/auth.storage';
import { User } from '@/types/model/User';
import { createContext, useEffect, useState } from 'react';

type AuthContextType = {
  user: User | null;
  login: (username: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // cargo usuario del localstorage si hay.
  useEffect(() => {
    loadSession();
  }, []);

  async function loadSession() {
    try {
      const auth = await getAuth();

      if (auth) {
        setUser(auth);
      }
    } finally {
      setLoading(false);
    }
  }

  async function login(username: string, password: string) {
    const auth = await loginRequest(username, password);

    await saveAuth(auth.data);

    setUser(auth.data);

    return auth.data;
  }

  async function logout() {
    await removeAuth();

    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
