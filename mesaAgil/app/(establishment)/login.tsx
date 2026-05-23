import { useAuth } from '@/hooks/useAuth';
import { router } from 'expo-router';
import { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError('');

      const user = await login(username, password);

      // cambiar a toast
      if (!user) {
        throw new Error('Credenciales inválidas');
      }

      switch (user.role) {
        case 'ADMIN':
          router.replace('./admin/(tabs)');
          break;

        case 'KITCHEN':
          router.replace('./kitchen/kitchen');
          break;

        case 'STAFF':
          router.replace('./staff/staff');
          break;

        default:
          throw new Error('Rol inválido');
      }
    } catch (err) {
      setError('Error al iniciar sesión');
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        padding: 24,
        gap: 12
      }}
    >
      <TextInput
        placeholder="Nombre"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        style={{
          borderWidth: 1,
          padding: 12,
          borderRadius: 8
        }}
      />

      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{
          borderWidth: 1,
          padding: 12,
          borderRadius: 8
        }}
      />

      {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}

      <Button title={loading ? 'Ingresando...' : 'Ingresar'} onPress={handleLogin} disabled={loading} />
    </View>
  );
}
