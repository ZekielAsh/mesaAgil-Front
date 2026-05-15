import { Category } from '@/types/model/Category';
import {
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native';

type AdminCategoryCardProps = {
  category: Category;

  onEdit: (
    category: Category
  ) => void;

  onDelete: (
    category: Category
  ) => void;
};

export const AdminCategoryCard = ({
  category,
  onEdit,
  onDelete
}: AdminCategoryCardProps) => {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>
        {category.name}
      </Text>

      <View style={styles.actions}>
        <Pressable
          style={styles.editButton}
          onPress={() =>
            onEdit(category)
          }
        >
          <Text style={styles.text}>
            Editar
          </Text>
        </Pressable>

        <Pressable
          style={styles.deleteButton}
          onPress={() =>
            onDelete(category)
          }
        >
          <Text style={styles.text}>
            Eliminar
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#333',
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },

  name: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  },

  actions: {
    flexDirection: 'row',
    gap: 8
  },

  editButton: {
    backgroundColor: '#FF9500',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8
  },

  deleteButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8
  },

  text: {
    color: '#fff',
    fontWeight: 'bold'
  }
});