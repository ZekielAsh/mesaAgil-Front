import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

interface EditUserFormInput {
  initialNameValue?: string;
  initialRoleValue?: string;
  loading?: boolean;
  userId: number;

  onSubmit: (id: number, username: string) => void;
}

export default function EditUserForm({ initialNameValue, loading, userId, onSubmit }: EditUserFormInput) {
  const [name, setName] = useState(initialNameValue || '');

  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (name.trim()) {
      onSubmit(userId, name);
    } else {
      setError('Name is required');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Usuario</Text>

      <View style={styles.inputListContainer}>
        <Text style={styles.inputTitle}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          placeholderTextColor="#999"
          cursorColor={'#000000'}
          value={name}
          onChangeText={setName}
        />
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Pressable style={styles.submitButton} onPress={handleSubmit} disabled={loading}>
        <Text style={styles.submitText}>{loading ? 'Cargando...' : 'Editar'}</Text>
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
