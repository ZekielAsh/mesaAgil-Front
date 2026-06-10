import { Fonts } from '@/constants/fonts';
import { Category } from '@/types/model/Category';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type AdminCategoryCardProps = {
  category: Category;

  onEdit: (category: Category) => void;
};

export const AdminCategoryCard = ({ category, onEdit }: AdminCategoryCardProps) => {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{category.name}</Text>

      <Pressable style={styles.editButton} onPress={() => onEdit(category)}>
        <Text style={styles.text}>Editar</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
    minWidth: 220,
    minHeight: 86,
    justifyContent: 'space-between',
    gap: 10,
    boxShadow: '2px 2px 4px rgba(0,0,0,0.25)'
  },
  name: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16
  },
  actions: {
    flexDirection: 'row',
    gap: 8
  },
  editButton: {
    flex: 1,
    backgroundColor: '#f48e00',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: '#fff',
    fontSize: 12,
    fontFamily: Fonts.bold
  }
});
