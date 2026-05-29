import { ReactNode, useEffect } from 'react';
import { router } from 'expo-router';

import { useTableSession } from '@/hooks/useTableSession';

interface Props {
  children: ReactNode;
}

export default function ClientRouteGuard({ children }: Props) {
  const { session } = useTableSession();

  useEffect(() => {
    const invalidSession =
      !session ||
      session.tableEnabled === false ||
      !session.activeSession ||
      !session.orderId;

    if (invalidSession) {
      router.replace('/');
    }
  }, [session]);

  return <>{children}</>;
}