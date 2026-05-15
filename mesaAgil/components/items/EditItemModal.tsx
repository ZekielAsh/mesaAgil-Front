import ItemForm from './ItemForm';
import { Category } from '@/types/model/Category';
import { Item } from '@/types/model/Item';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native';

type EditItemModalProps = {
  visible: boolean;
  item: Item | null;
  categories: Category[];
  loading?: boolean;

  onClose: () => void;

  onSubmit: (values: {
    name: string;
    description: string;
    imageUrl: string;
    price: number;
    categoryId: number;
  }) => void;
};

const EditItemModal = ({
  visible,
  item,
  categories,
  loading,
  onClose,
  onSubmit
}: EditItemModalProps) => {
  if (!item) {
    return null;
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Pressable
            style={styles.closeButton}
            onPress={onClose}
          >
            <Text style={styles.closeText}>
              ✕
            </Text>
          </Pressable>
          <ItemForm
            initialValues={item}
            categories={categories}
            loading={loading}
            submitText="Guardar cambios"
            onSubmit={onSubmit}
          />
        </View>
      </View>
    </Modal>
  );
};

export default EditItemModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor:
      'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 16
  },

  content: {
    backgroundColor: '#222',
    borderRadius: 16,
    maxHeight: '90%'
  },

  closeButton: {
    alignSelf: 'flex-end',
    padding: 12
  },

  closeText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold'
  }
});