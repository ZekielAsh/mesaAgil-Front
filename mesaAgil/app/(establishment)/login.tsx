import { useAuth } from '@/hooks/useAuth';
import { router } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

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
          router.replace('./kitchen/(tabs)');
          break;

        case 'STAFF':
          router.replace('./staff/(tabs)');
          break;

        default:
          throw new Error('Rol inválido');
      }
    } catch (err) {
      setError('Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('@/assets/images/MesaAgil_Logo.png')} style={styles.image} resizeMode="contain" />

        <Text style={styles.title}>Bienvenido a Mesa Ágil</Text>
        <Text style={styles.subtitle}>Rellena con tus credenciales para ingresar</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          placeholder="Usuario"
          placeholderTextColor="#999"
          value={username}
          onChangeText={setUsername}
          cursorColor={'#000000'}
          autoCapitalize="none"
          style={styles.input}
        />

        <TextInput
          placeholder="Contraseña"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          cursorColor={'#000000'}
          secureTextEntry
          style={styles.input}
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Ingresar</Text>}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f8',
    justifyContent: 'flex-start',
    paddingHorizontal: 24
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 36
  },
  image: {
    width: 140,
    height: 140,
    marginBottom: 8
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#222',
    textAlign: 'center'
  },
  subtitle: {
    marginTop: 4,
    fontSize: 15,
    color: '#666'
  },
  form: {
    gap: 16
  },
  input: {
    height: 48,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 14,
    paddingHorizontal: 16,
    fontSize: 16
  },
  errorText: {
    color: '#e53935',
    fontSize: 14
  },
  button: {
    backgroundColor: '#111',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 8
  },
  buttonDisabled: {
    opacity: 0.7
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  }
});
