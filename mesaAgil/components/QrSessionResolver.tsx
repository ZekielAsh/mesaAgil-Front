import { useTableSession } from '@/hooks/table/useTableSession';
import { resolveTableSessionByQr } from '@/service/tableService';
import { router } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

interface Props {
  qrToken?: string;
}

export default function QrSessionResolver({ qrToken }: Props) {
  const { setSession } = useTableSession();
  const [error, setError] = useState('');

  const resolveSession = useCallback(async () => {
    try {
      setError('');

      if (!qrToken) {
        throw new Error('QR invalido');
      }

      const session = await resolveTableSessionByQr(qrToken);
      await setSession(session);
      router.replace('/(client)/(tabs)/menu');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo abrir la mesa');
    }
  }, [qrToken, setSession]);

  useEffect(() => {
    resolveSession();
  }, [resolveSession]);

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.title}>No pudimos abrir la mesa</Text>
        <Text style={styles.message}>{error}</Text>
        <Pressable style={styles.button} onPress={resolveSession}>
          <Text style={styles.buttonText}>Reintentar</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.center}>
      <ActivityIndicator size="large" />
      <Text style={styles.message}>Abriendo la mesa...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    padding: 24
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center'
  },
  message: {
    color: '#4B5563',
    fontSize: 15,
    textAlign: 'center'
  },
  button: {
    backgroundColor: '#111827',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700'
  }
});
