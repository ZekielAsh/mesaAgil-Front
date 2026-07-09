import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

interface CreateUserFormInput {
  loading?: boolean;

  onSubmit: (name: string, password: string, role: string) => void;
}

export default function CreateUserForm({ loading, onSubmit }: CreateUserFormInput) {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (name.trim()) {
      onSubmit(name, password, role);
    } else {
      setError('Name is required');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear usuario</Text>

      <View style={styles.inputListContainer}>
        <Text style={styles.inputTitle}>Nombre</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          placeholderTextColor="#999"
          cursorColor={'#000000'}
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={styles.inputListContainer}>
        <Text style={styles.inputTitle}>Contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          placeholderTextColor="#999"
          cursorColor={'#000000'}
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <View style={styles.inputListContainer}>
        <Text style={styles.inputTitle}>Rol</Text>
        <Picker style={styles.pickerContainer} selectedValue={role} onValueChange={value => setRole(value)}>
          <Picker.Item label="Seleccione un rol" value="" />
          <Picker.Item label="Mozo" value="STAFF" />
          <Picker.Item label="Cocina" value="KITCHEN" />
        </Picker>
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Pressable style={styles.submitButton} onPress={handleSubmit} disabled={loading}>
        <Text style={styles.submitText}>{loading ? 'Cargando...' : 'Crear'}</Text>
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
  },

  pickerContainer: {
    height: 40,
    backgroundColor: '#efefef',
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden'
  }
});
