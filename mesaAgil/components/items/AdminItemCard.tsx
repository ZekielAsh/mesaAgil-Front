import { Item } from '@/types/model/Item';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type AdminItemCardProps = {
  item: Item;
  onEdit: (item: Item) => void;
  onDelete: (item: Item) => void;
};

export const AdminItemCard = ({ item, onEdit, onDelete }: AdminItemCardProps) => {
  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.name}>{item.name}</Text>
        <Text>{item.categoryName}</Text>
        <Text>${item.price}</Text>
      </View>

      <View style={styles.actions}>
        <Pressable style={styles.editButton} onPress={() => onEdit(item)}>
          <Text style={styles.buttonText}>Editar</Text>
        </Pressable>

        <Pressable style={styles.deleteButton} onPress={() => onDelete(item)}>
          <Text style={styles.buttonText}>Eliminar</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4
  },
  actions: {
    flexDirection: 'row',
    gap: 8
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
  }
});