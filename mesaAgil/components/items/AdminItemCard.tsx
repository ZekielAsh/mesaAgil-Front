import { Item } from '@/types/model/Item';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native';

type AdminItemCardProps = {
  item: Item;

  onEdit: (item: Item) => void;

  onDelete: (item: Item) => void;
};

export const AdminItemCard = ({
  item,
  onEdit,
  onDelete
}: AdminItemCardProps) => {
  return (
    <View style={styles.card}>
      <Image
        source={{
          uri: item.imageUrl
        }}
        style={styles.image}
      />

      <View style={styles.content}>
        <View>
          <Text style={styles.name}>
            {item.name}
          </Text>

          <Text style={styles.category}>
            {item.categoryName}
          </Text>

          <Text style={styles.price}>
            ${item.price}
          </Text>
        </View>

        <View style={styles.actions}>
          <Pressable
            style={styles.editButton}
            onPress={() =>
              onEdit(item)
            }
          >
            <Text
              style={
                styles.buttonText
              }
            >
              Editar
            </Text>
          </Pressable>

          <Pressable
            style={
              styles.deleteButton
            }
            onPress={() =>
              onDelete(item)
            }
          >
            <Text
              style={
                styles.buttonText
              }
            >
              Eliminar
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    gap: 12,
    elevation: 3
  },

  image: {
    width: 90,
    height: 90,
    borderRadius: 12
  },

  content: {
    flex: 1,
    justifyContent:
      'space-between'
  },

  name: {
    fontSize: 18,
    fontWeight: 'bold'
  },

  category: {
    color: '#666',
    marginTop: 4
  },

  price: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '600'
  },

  actions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12
  },

  editButton: {
    backgroundColor: '#FF9500',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8
  },

  deleteButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  }
});