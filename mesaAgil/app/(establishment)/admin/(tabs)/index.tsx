import { AdminCategoryCard } from '@/components/categories/AdminCategoryCard';
import CreateCategoryModal from '@/components/categories/CreateCategoryModal';
import EditCategoryModal from '@/components/categories/EditCategoryModal';

import { AdminItemCard } from '@/components/items/AdminItemCard';
import CreateItemModal from '@/components/items/CreateItemModal';
import EditItemModal from '@/components/items/EditItemModal';

import { useCategories } from '@/hooks/useCategories';
import { useCreateCategory } from '@/hooks/useCreateCategory';
import { useUpdateCategory } from '@/hooks/useUpdateCategory';

import { useCreateItem } from '@/hooks/useCreateItem';
import { useItems } from '@/hooks/useItems';
import { useUpdateItem } from '@/hooks/useUpdateItem';

import { Category } from '@/types/model/Category';
import { Item } from '@/types/model/Item';
import { UpdateItemRequest } from '@/types/UpdateItemRequest';

import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { useState } from 'react';

import { Toast } from 'react-native-toast-message/lib/src/Toast';

const ItemsScreen = () => {
  const { items, loading, error, refetch } = useItems();

  const { categories, refetch: refetchCategories } = useCategories();

  const { execute: createItem, loading: creating } = useCreateItem();

  const { execute: updateItem, loading: updating } = useUpdateItem();

  const { execute: createCategory, loading: creatingCategory } = useCreateCategory();

  const { execute: updateCategory, loading: updatingCategory } = useUpdateCategory();

  const [createModalVisible, setCreateModalVisible] = useState(false);

  const [editModalVisible, setEditModalVisible] = useState(false);

  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const [togglingItemId, setTogglingItemId] = useState<number | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const [createCategoryModalVisible, setCreateCategoryModalVisible] = useState(false);

  const [editCategoryModalVisible, setEditCategoryModalVisible] = useState(false);

  const handleCreate = async (values: any) => {
    try {
      await createItem(values);

      Toast.show({
        type: 'success',
        text1: 'Comida creada',
        text2: 'La comida fue creada correctamente'
      });

      setCreateModalVisible(false);

      refetch();
      refetchCategories();
    } catch {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'No se pudo crear la comida'
      });
    }
  };

  const handleEdit = (item: Item) => {
    setSelectedItem(item);

    setEditModalVisible(true);
  };

  const handleUpdate = async (values: any) => {
    if (!selectedItem) {
      return;
    }

    try {
      await updateItem(selectedItem.id, {
        ...values,
        active: selectedItem.active !== false
      });

      Toast.show({
        type: 'success',
        text1: 'Comida actualizada',
        text2: 'Los cambios fueron guardados'
      });

      setEditModalVisible(false);

      setSelectedItem(null);

      refetch();
      refetchCategories();
    } catch {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'No se pudo actualizar la comida'
      });
    }
  };

  const handleToggleActive = async (item: Item) => {
    const category = categories.find(currentCategory => currentCategory.name === item.categoryName);

    if (!category) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'No se pudo identificar la categoria de la comida'
      });

      return;
    }

    const isActive = item.active !== false;

    const values: UpdateItemRequest = {
      name: item.name,
      description: item.description,
      imageUrl: item.imageUrl,
      price: item.price,
      categoryId: category.id,
      active: !isActive
    };

    try {
      setTogglingItemId(item.id);

      await updateItem(item.id, values);

      Toast.show({
        type: 'success',
        text1: isActive ? 'Comida deshabilitada' : 'Comida habilitada',
        text2: isActive ? 'Ya no se mostrara en el menu' : 'Volvera a mostrarse en el menu'
      });

      refetch();
    } catch {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'No se pudo cambiar el estado de la comida'
      });
    } finally {
      setTogglingItemId(null);
    }
  };

  const handleCreateCategory = async (name: string) => {
    try {
      await createCategory(name);

      Toast.show({
        type: 'success',
        text1: 'Categoría creada'
      });

      setCreateCategoryModalVisible(false);

      refetchCategories();
    } catch {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'No se pudo crear la categoría'
      });
    }
  };

  const handleEditCategory = (category: Category) => {
    setSelectedCategory(category);

    setEditCategoryModalVisible(true);
  };

  const handleUpdateCategory = async (name: string) => {
    if (!selectedCategory) {
      return;
    }

    try {
      await updateCategory(selectedCategory.id, name);

      Toast.show({
        type: 'success',
        text1: 'Categoría actualizada'
      });

      setEditCategoryModalVisible(false);

      setSelectedCategory(null);

      refetchCategories();
    } catch {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'No se pudo actualizar la categoría'
      });
    }
  };

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        style={{
          marginTop: 50
        }}
      />
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>{error}</Text>

        <Pressable style={styles.retryButton} onPress={refetch}>
          <Text style={styles.buttonText}>Reintentar</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Categorías</Text>

      <Pressable style={styles.createButton} onPress={() => setCreateCategoryModalVisible(true)}>
        <Text style={styles.createButtonText}>+ Nueva categoría</Text>
      </Pressable>

      <FlatList
        horizontal
        data={categories}
        keyExtractor={category => category.id.toString()}
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesListWrapper}
        contentContainerStyle={styles.categoriesList}
        renderItem={({ item }) => <AdminCategoryCard category={item} onEdit={handleEditCategory} />}
      />

      <Text style={styles.sectionTitle}>Comidas</Text>

      <Pressable style={styles.createButton} onPress={() => setCreateModalVisible(true)}>
        <Text style={styles.createButtonText}>+ Nueva comida</Text>
      </Pressable>

      <FlatList
        data={items}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.list}
        style={styles.itemsList}
        renderItem={({ item }) => (
          <AdminItemCard
            item={item}
            onEdit={handleEdit}
            onToggleActive={handleToggleActive}
            toggling={togglingItemId === item.id}
          />
        )}
      />

      <CreateCategoryModal
        visible={createCategoryModalVisible}
        loading={creatingCategory}
        onClose={() => setCreateCategoryModalVisible(false)}
        onSubmit={handleCreateCategory}
      />

      <EditCategoryModal
        visible={editCategoryModalVisible}
        category={selectedCategory}
        loading={updatingCategory}
        onClose={() => {
          setEditCategoryModalVisible(false);

          setSelectedCategory(null);
        }}
        onSubmit={handleUpdateCategory}
      />

      <CreateItemModal
        visible={createModalVisible}
        categories={categories}
        loading={creating}
        onClose={() => setCreateModalVisible(false)}
        onSubmit={handleCreate}
      />

      <EditItemModal
        visible={editModalVisible}
        item={selectedItem}
        categories={categories}
        loading={updating}
        onClose={() => {
          setEditModalVisible(false);

          setSelectedItem(null);
        }}
        onSubmit={handleUpdate}
      />
    </View>
  );
};

export default ItemsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    paddingBottom: 6,
    marginBottom: 10
  },

  categoriesListWrapper: {
    flexGrow: 0,
    height: 98,
    paddingVertical: 8,
    marginBottom: 12
  },

  categoriesList: {
    paddingBottom: 0
  },

  list: {
    gap: 10,
    paddingBottom: 16,
    paddingRight: 4
  },

  itemsList: {
    flex: 1
  },

  createButton: {
    backgroundColor: '#2563EB',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10
  },

  createButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  retryButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    marginTop: 16
  }
});
