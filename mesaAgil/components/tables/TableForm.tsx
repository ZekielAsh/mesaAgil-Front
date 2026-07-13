import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

type TableFormProps = {
  loading?: boolean;
  submitText: string;
  initialValue?: number;
  onSubmit: (tableNumber: number) => void;
};

const TableForm = ({ loading, submitText, initialValue, onSubmit }: TableFormProps) => {
  const [tableNumber, setTableNumber] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialValue) {
      setTableNumber(initialValue.toString());
    }
  }, [initialValue]);

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
      <Text style={styles.title}>{initialValue ? 'Editando mesa' : 'Mesa'}</Text>

      <View style={styles.inputListContainer}>
        <View>
          <Text style={styles.inputTitle}>Número</Text>
          <TextInput
            placeholder="Número de mesa"
            placeholderTextColor="#999"
            value={tableNumber}
            onChangeText={text => {
              setTableNumber(text);
              setError('');
            }}
            keyboardType="number-pad"
            cursorColor={'#000000'}
            style={styles.input}
            editable={!loading}
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

export default TableForm;

const styles = StyleSheet.create({
  container: {
    gap: 12
  },

  title: {
    color: '#000000',
    fontSize: 24,
    fontWeight: 'bold'
  },

  inputListContainer: {
    paddingVertical: 12,
    gap: 8
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
    color: '#ef4444',
    fontSize: 14
  },

  submitButton: {
    backgroundColor: '#2563EB',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center'
  },

  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
});
