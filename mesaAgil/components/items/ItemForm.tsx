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
      <View style={styles.inputListContainer}>
        <View>
          <Text style={styles.inputTitle}>Nombre</Text>
          <TextInput
            placeholder="Nombre"
            placeholderTextColor="#999"
            value={name}
            onChangeText={setName}
            cursorColor={'#000000'}
            style={styles.input}
          />
        </View>
        <View>
          <Text style={styles.inputTitle}>Descripción</Text>
          <TextInput
            placeholder="Descripción"
            placeholderTextColor="#999"
            value={description}
            onChangeText={setDescription}
            cursorColor={'#000000'}
            style={styles.input}
          />
        </View>

        <View>
          <Text style={styles.inputTitle}>Imagen</Text>
          <TextInput
            placeholder="Image URL"
            placeholderTextColor="#999"
            value={imageUrl}
            onChangeText={setImageUrl}
            cursorColor={'#000000'}
            style={styles.input}
          />
        </View>
        <View>
          <Text style={styles.inputTitle}>Precio</Text>
          <TextInput
            placeholder="Precio"
            placeholderTextColor="#999"
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
            cursorColor={'#000000'}
            style={styles.input}
          />
        </View>
        <View>
          <Text style={styles.inputTitle}>Categoría</Text>
          <View style={styles.categories}>
            {categories.map(category => (
              <Pressable
                key={category.id}
                style={[styles.categoryButton, categoryId === category.id && styles.categorySelected]}
                onPress={() => setCategoryId(category.id)}
              >
                <Text style={[styles.categoryText, categoryId === category.id && styles.categoryTextSelected]}>
                  {category.name}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
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

  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },

  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderRadius: 999
  },

  categorySelected: {
    backgroundColor: '#000000'
  },

  categoryText: {
    fontSize: 14
  },

  categoryTextSelected: {
    color: '#ffffff'
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
