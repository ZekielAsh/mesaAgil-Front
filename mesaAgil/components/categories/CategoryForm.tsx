import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

type CategoryFormProps = {
  initialValue?: string;
  loading?: boolean;
  submitText: string;

  onSubmit: (name: string) => void;
};

const CategoryForm = ({ initialValue, loading, submitText, onSubmit }: CategoryFormProps) => {
  const [name, setName] = useState(initialValue || '');

  const [error, setError] = useState('');

  const handleSubmit = () => {
    const normalizedName = name.trim();

    if (!normalizedName) {
      setError('El nombre es obligatorio');

      return;
    }

    onSubmit(normalizedName);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categoría</Text>

      <View style={styles.inputListContainer}>
        <View>
          <Text style={styles.inputTitle}>Nombre de categoría</Text>
          <TextInput
            placeholder="Nombre"
            placeholderTextColor="#999"
            value={name}
            cursorColor={'#000000'}
            onChangeText={setName}
            style={styles.input}
          />
        </View>

        {!!error && <Text style={styles.error}>{error}</Text>}
      </View>

      <Pressable style={styles.submitButton} onPress={handleSubmit} disabled={loading}>
        <Text style={styles.submitText}>{loading ? 'Guardando...' : submitText}</Text>
      </Pressable>
    </View>
  );
};

export default CategoryForm;

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
