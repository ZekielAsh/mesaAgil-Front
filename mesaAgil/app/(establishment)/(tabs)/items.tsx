import { AdminCategoryCard } from '@/components/categories/AdminCategoryCard';
import CreateCategoryModal from '@/components/categories/CreateCategoryModal';
import DeleteCategoryModal from '@/components/categories/DeleteCategoryModal';
import EditCategoryModal from '@/components/categories/EditCategoryModal';

import { AdminItemCard } from '@/components/items/AdminItemCard';
import CreateItemModal from '@/components/items/CreateItemModal';
import DeleteItemModal from '@/components/items/DeleteItemModal';
import EditItemModal from '@/components/items/EditItemModal';

import { useCategories } from '@/hooks/useCategories';
import { useCreateCategory } from '@/hooks/useCreateCategory';
import { useDeleteCategory } from '@/hooks/useDeleteCategory';
import { useUpdateCategory } from '@/hooks/useUpdateCategory';

import { useCreateItem } from '@/hooks/useCreateItem';
import { useDeleteItem } from '@/hooks/useDeleteItem';
import { useItems } from '@/hooks/useItems';
import { useUpdateItem } from '@/hooks/useUpdateItem';

import { Category } from '@/types/model/Category';
import { Item } from '@/types/model/Item';

import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { useState } from 'react';

import { Toast } from 'react-native-toast-message/lib/src/Toast';

const ItemsScreen = () => {
  const {
    items,
    loading,
    error,
    refetch
  } = useItems();

  const {
    categories,
    refetch: refetchCategories
  } = useCategories();

  const {
    execute: createItem,
    loading: creating
  } = useCreateItem();

  const {
    execute: updateItem,
    loading: updating
  } = useUpdateItem();

  const {
    execute: deleteItem,
    loading: deleting
  } = useDeleteItem();

  const {
    execute: createCategory,
    loading: creatingCategory
  } = useCreateCategory();

  const {
    execute: updateCategory,
    loading: updatingCategory
  } = useUpdateCategory();

  const {
    execute: deleteCategory,
    loading: deletingCategory
  } = useDeleteCategory();

  const [
    createModalVisible,
    setCreateModalVisible
  ] = useState(false);

  const [
    editModalVisible,
    setEditModalVisible
  ] = useState(false);

  const [
    deleteModalVisible,
    setDeleteModalVisible
  ] = useState(false);

  const [
    selectedItem,
    setSelectedItem
  ] = useState<Item | null>(
    null
  );

  const [
    selectedCategory,
    setSelectedCategory
  ] =
    useState<Category | null>(
      null
    );

  const [
    createCategoryModalVisible,
    setCreateCategoryModalVisible
  ] = useState(false);

  const [
    editCategoryModalVisible,
    setEditCategoryModalVisible
  ] = useState(false);

  const [
    deleteCategoryModalVisible,
    setDeleteCategoryModalVisible
  ] = useState(false);

  const handleCreate = async (
    values: any
  ) => {
    try {
      await createItem(values);

      Toast.show({
        type: 'success',
        text1: 'Comida creada',
        text2:
          'La comida fue creada correctamente'
      });

      setCreateModalVisible(false);

      refetch();
      refetchCategories();
    } catch {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2:
          'No se pudo crear la comida'
      });
    }
  };

  const handleEdit = (
    item: Item
  ) => {
    setSelectedItem(item);

    setEditModalVisible(true);
  };

  const handleUpdate = async (
    values: any
  ) => {
    if (!selectedItem) {
      return;
    }

    try {
      await updateItem(
        selectedItem.id,
        values
      );

      Toast.show({
        type: 'success',
        text1:
          'Comida actualizada',
        text2:
          'Los cambios fueron guardados'
      });

      setEditModalVisible(false);

      setSelectedItem(null);

      refetch();
      refetchCategories();
    } catch {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2:
          'No se pudo actualizar la comida'
      });
    }
  };

  const handleDelete = (
    item: Item
  ) => {
    setSelectedItem(item);

    setDeleteModalVisible(
      true
    );
  };

  const confirmDelete =
    async () => {
      if (!selectedItem) {
        return;
      }

      try {
        await deleteItem(
          selectedItem.id
        );

        Toast.show({
          type: 'success',
          text1:
            'Comida eliminada',
          text2:
            'La comida fue eliminada correctamente'
        });

        setDeleteModalVisible(
          false
        );

        setSelectedItem(null);

        refetch();
        refetchCategories();
      } catch {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2:
            'No se pudo eliminar la comida'
        });
      }
    };

  const handleCreateCategory =
    async (name: string) => {
      try {
        await createCategory(name);

        Toast.show({
          type: 'success',
          text1:
            'Categoría creada'
        });

        setCreateCategoryModalVisible(
          false
        );

        refetchCategories();
      } catch {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2:
            'No se pudo crear la categoría'
        });
      }
    };

  const handleEditCategory = (
    category: Category
  ) => {
    setSelectedCategory(category);

    setEditCategoryModalVisible(
      true
    );
  };

  const handleUpdateCategory =
    async (name: string) => {
      if (!selectedCategory) {
        return;
      }

      try {
        await updateCategory(
          selectedCategory.id,
          name
        );

        Toast.show({
          type: 'success',
          text1:
            'Categoría actualizada'
        });

        setEditCategoryModalVisible(
          false
        );

        setSelectedCategory(null);

        refetchCategories();
      } catch {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2:
            'No se pudo actualizar la categoría'
        });
      }
    };

  const handleDeleteCategory =
    (category: Category) => {
      setSelectedCategory(category);

      setDeleteCategoryModalVisible(
        true
      );
    };

  const confirmDeleteCategory =
    async () => {
      if (!selectedCategory) {
        return;
      }

      try {
        await deleteCategory(
          selectedCategory.id
        );

        Toast.show({
          type: 'success',
          text1:
            'Categoría eliminada'
        });

        setDeleteCategoryModalVisible(
          false
        );

        setSelectedCategory(null);

        refetchCategories();
      } catch {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2:
            'No se pudo eliminar la categoría'
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

        <Pressable
          style={
            styles.retryButton
          }
          onPress={refetch}
        >
          <Text
            style={
              styles.buttonText
            }
          >
            Reintentar
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>
        Categorías
      </Text>

      <Pressable
        style={styles.createButton}
        onPress={() =>
          setCreateCategoryModalVisible(
            true
          )
        }
      >
        <Text
          style={
            styles.createButtonText
          }
        >
          + Nueva categoría
        </Text>
      </Pressable>

      <FlatList
        horizontal
        data={categories}
        keyExtractor={category =>
          category.id.toString()
        }
        showsHorizontalScrollIndicator={
          false
        }
        contentContainerStyle={
          styles.categoriesList
        }
        renderItem={({ item }) => (
          <AdminCategoryCard
            category={item}
            onEdit={
              handleEditCategory
            }
            onDelete={
              handleDeleteCategory
            }
          />
        )}
      />

      <Text style={styles.sectionTitle}>
        Comidas
      </Text>

      <Pressable
        style={styles.createButton}
        onPress={() =>
          setCreateModalVisible(
            true
          )
        }
      >
        <Text
          style={
            styles.createButtonText
          }
        >
          + Nueva comida
        </Text>
      </Pressable>

      <FlatList
        data={items}
        keyExtractor={item =>
          item.id.toString()
        }
        contentContainerStyle={
          styles.list
        }
        renderItem={({ item }) => (
          <AdminItemCard
            item={item}
            onEdit={handleEdit}
            onDelete={
              handleDelete
            }
          />
        )}
      />

      <CreateCategoryModal
        visible={
          createCategoryModalVisible
        }
        loading={creatingCategory}
        onClose={() =>
          setCreateCategoryModalVisible(
            false
          )
        }
        onSubmit={
          handleCreateCategory
        }
      />

      <EditCategoryModal
        visible={
          editCategoryModalVisible
        }
        category={selectedCategory}
        loading={updatingCategory}
        onClose={() => {
          setEditCategoryModalVisible(
            false
          );

          setSelectedCategory(null);
        }}
        onSubmit={
          handleUpdateCategory
        }
      />

      <DeleteCategoryModal
        visible={
          deleteCategoryModalVisible
        }
        category={selectedCategory}
        loading={deletingCategory}
        onClose={() => {
          setDeleteCategoryModalVisible(
            false
          );

          setSelectedCategory(null);
        }}
        onConfirm={
          confirmDeleteCategory
        }
      />

      <CreateItemModal
        visible={
          createModalVisible
        }
        categories={categories}
        loading={creating}
        onClose={() =>
          setCreateModalVisible(
            false
          )
        }
        onSubmit={handleCreate}
      />

      <EditItemModal
        visible={
          editModalVisible
        }
        item={selectedItem}
        categories={categories}
        loading={updating}
        onClose={() => {
          setEditModalVisible(false);

          setSelectedItem(null);
        }}
        onSubmit={handleUpdate}
      />

      <DeleteItemModal
        visible={
          deleteModalVisible
        }
        item={selectedItem}
        loading={deleting}
        onClose={() => {
          setDeleteModalVisible(false);

          setSelectedItem(null);
        }}
        onConfirm={confirmDelete}
      />
    </View>
  );
};

export default ItemsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16
  },

  categoriesList: {
    paddingBottom: 24
  },

  list: {
    gap: 12
  },

  createButton: {
    backgroundColor: '#007AFF',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16
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