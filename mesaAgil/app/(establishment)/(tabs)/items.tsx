import { useItems } from '@/hooks/useItems';
import { Item } from '@/types/model/Item';
import { ActivityIndicator, Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { AdminItemCard } from '@/components/items/AdminItemCard';

const ItemsScreen = () => {
  const { items, loading, error, refetch } = useItems();

  const handleEdit = (item: Item) => {
    Alert.alert('Editar comida', `Editar ${item.name}`);
  };

  const handleDelete = (item: Item) => {
    Alert.alert('Eliminar comida', `Eliminar ${item.name}`);
  };

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
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
      <Pressable style={styles.createButton}>
        <Text style={styles.createButtonText}>+ Nueva comida</Text>
      </Pressable>

      <FlatList
        data={items}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <AdminItemCard
            item={item}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
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
  list: {
    gap: 12
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  actions: {
    flexDirection: 'row',
    gap: 8
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
  editButton: {
    backgroundColor: '#FF9500',
    padding: 10,
    borderRadius: 8
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    padding: 10,
    borderRadius: 8
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