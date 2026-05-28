import { useAuth } from '@/hooks/useAuth';
import { Redirect } from 'expo-router';

export default function Index() {
  const { user, loading } = useAuth(); // carga usuario del local storage si hay.

  if (loading) {
    return null;
  }

  if (!user) {
    // TODO: fijarse si el token del "user" en local storage es válido.
    // algo como isExpiredToken(token) sino mandarlo al login.
    return <Redirect href="./login" />;
  }

  switch (user.role) {
    case 'ADMIN':
      return <Redirect href="./admin/(tabs)" />;

    case 'KITCHEN':
      return <Redirect href="./kitchen/kitchen" />;

    case 'STAFF':
      return <Redirect href="./staff/staff" />;
  }
}
