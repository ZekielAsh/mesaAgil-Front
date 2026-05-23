import { Category } from '@/types/model/Category';
import { Item } from '@/types/model/Item';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

type ItemFormProps = {
  initialValues?: Partial<Item>;

  categories: Category[];

  loading?: boolean;

  submitText: string;

  onSubmit: (values: {
    name: string;
    description: string;
    imageUrl: string;
    price: number;
    categoryId: number;
  }) => void;
};

const ItemForm = ({ initialValues, categories, loading, submitText, onSubmit }: ItemFormProps) => {
  const [name, setName] = useState(initialValues?.name || '');

  const [description, setDescription] = useState(initialValues?.description || '');

  const [imageUrl, setImageUrl] = useState(initialValues?.imageUrl || '');

  const [price, setPrice] = useState(initialValues?.price ? String(initialValues.price) : '');

  const [categoryId, setCategoryId] = useState<number | undefined>(
    categories.find(category => category.name === initialValues?.categoryName)?.id
  );

  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!name || !description || !imageUrl || !price || !categoryId) {
      setError('Todos los campos son obligatorios');

      return;
    }

    onSubmit({
      name,
      description,
      imageUrl,
      price: Number(price),
      categoryId
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Comida</Text>

      <TextInput placeholder="Nombre" value={name} onChangeText={setName} style={styles.input} />

      <TextInput placeholder="Descripción" value={description} onChangeText={setDescription} style={styles.input} />

      <TextInput placeholder="Image URL" value={imageUrl} onChangeText={setImageUrl} style={styles.input} />

      <TextInput
        placeholder="Precio"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={styles.input}
      />

      <View style={styles.categories}>
        {categories.map(category => (
          <Pressable
            key={category.id}
            style={[styles.categoryButton, categoryId === category.id && styles.categorySelected]}
            onPress={() => setCategoryId(category.id)}
          >
            <Text style={styles.categoryText}>{category.name}</Text>
          </Pressable>
        ))}
      </View>

      {!!error && <Text style={styles.error}>{error}</Text>}

      <Pressable style={styles.submitButton} onPress={handleSubmit} disabled={loading}>
        <Text style={styles.submitText}>{loading ? 'Guardando...' : submitText}</Text>
      </Pressable>
    </ScrollView>
  );
};

export default ItemForm;

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

  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },

  categoryButton: {
    backgroundColor: '#333',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 999
  },

  categorySelected: {
    backgroundColor: '#007AFF'
  },

  categoryText: {
    color: '#fff'
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
