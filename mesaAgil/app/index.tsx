import { router } from 'expo-router';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default function LandingPage() {
  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/MesaAgil_Logo.png')}
        resizeMode="contain"
        style={styles.logo}
      />
      <Text style={styles.title}>
        Mesa Ágil
      </Text>

      <Text style={styles.subtitle}>
        Inicia sesión para comenzar.
      </Text>

      <Pressable
        style={styles.button}
        onPress={() => router.push('/login')}
      >
        <Text style={styles.buttonText}>
          Iniciar sesión
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f6f8',
    padding: 24
  },

  logo: {
    width: 420,
    height: 420,
    marginBottom: 24
  },

  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#111827'
  },

  subtitle: {
    marginTop: 12,
    marginBottom: 32,
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center'
  },

  button: {
    backgroundColor: '#111827',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 12
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600'
  }
});