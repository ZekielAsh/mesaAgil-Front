import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

interface ResetPasswordFormInput {
  loading?: boolean;
  userId: number;

  onSubmit: (id: number, password: string) => void;
}

export default function ResetPasswordForm({ loading, userId, onSubmit }: ResetPasswordFormInput) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (password.trim()) {
      onSubmit(userId, password);
    } else {
      setError('Password is required');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Usuario</Text>

      <View style={styles.inputListContainer}>
        <Text style={styles.inputTitle}>Contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#999"
          secureTextEntry
          cursorColor={'#000000'}
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Pressable style={styles.submitButton} onPress={handleSubmit} disabled={loading}>
        <Text style={styles.submitText}>{loading ? 'Cargando...' : 'Cambiar'}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12
  },

  inputListContainer: {
    paddingVertical: 12,
    gap: 8
  },

  title: {
    color: '#000000',
    fontSize: 24,
    fontWeight: 'bold'
  },

  inputTitle: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8
  },

  input: {
    height: 40,
    backgroundColor: '#efefef',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16
  },

  error: {
    color: '#FF3B30',
    fontWeight: 'bold'
  },

  submitButton: {
    backgroundColor: '#2563EB',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center'
  },

  submitText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  }
});
