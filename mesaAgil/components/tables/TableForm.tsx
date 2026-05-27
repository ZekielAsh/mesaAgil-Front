import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import { useState } from 'react';

type TableFormProps = {
  loading?: boolean;
  submitText: string;
  onSubmit: (tableNumber: number) => void;
};

const TableForm = ({
  loading,
  submitText,
  onSubmit
}: TableFormProps) => {
  const [tableNumber, setTableNumber] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    const number = parseInt(tableNumber.trim(), 10);

    if (!tableNumber.trim()) {
      setError('El número de mesa es obligatorio');
      return;
    }

    if (isNaN(number) || number <= 0) {
      setError('El número debe ser mayor a cero');
      return;
    }

    setError('');
    onSubmit(number);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Creando mesa
      </Text>

      <TextInput
        placeholder="Número de mesa"
        placeholderTextColor="#999"
        value={tableNumber}
        onChangeText={(text) => {
          setTableNumber(text);
          setError('');
        }}
        keyboardType="number-pad"
        style={styles.input}
        editable={!loading}
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

export default TableForm;

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
    color: '#ef4444',
    fontSize: 14
  },

  submitButton: {
    backgroundColor: '#222',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fff'
  },

  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
});
