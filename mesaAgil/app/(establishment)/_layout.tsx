import { useAuth } from '@/hooks/useAuth';
import { Redirect, Stack } from 'expo-router';

export default function EstablishmentLayout() {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) {
    return <Redirect href="/login" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false
      }}
    ></Stack>
  );
}
