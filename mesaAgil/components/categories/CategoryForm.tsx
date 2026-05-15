import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import { useState } from 'react';

type CategoryFormProps = {
  initialValue?: string;
  loading?: boolean;
  submitText: string;

  onSubmit: (
    name: string
  ) => void;
};

const CategoryForm = ({
  initialValue,
  loading,
  submitText,
  onSubmit
}: CategoryFormProps) => {
  const [name, setName] =
    useState(initialValue || '');

  const [error, setError] =
    useState('');

  const handleSubmit = () => {
    const normalizedName =
      name.trim();

    if (!normalizedName) {
      setError(
        'El nombre es obligatorio'
      );

      return;
    }

    onSubmit(normalizedName);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Categoría
      </Text>

      <TextInput
        placeholder="Nombre"
        placeholderTextColor="#999"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      {!!error && (
        <Text style={styles.error}>
          {error}
        </Text>
      )}

      <Pressable
        style={styles.submitButton}
        onPress={handleSubmit}
        disabled={loading}
      >
        <Text style={styles.submitText}>
          {loading
            ? 'Guardando...'
            : submitText}
        </Text>
      </Pressable>
    </View>
  );
};

export default CategoryForm;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12
  },

  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold'
  },

  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14
  },

  error: {
    color: '#FF3B30',
    fontWeight: 'bold'
  },

  submitButton: {
    backgroundColor: '#007AFF',
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