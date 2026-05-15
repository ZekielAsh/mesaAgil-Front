import ItemForm from './ItemForm';
import { Category } from '@/types/model/Category';
import {
  Modal,
  StyleSheet,
  View
} from 'react-native';

type CreateItemModalProps = {
  visible: boolean;
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

const CreateItemModal = ({
  visible,
  categories,
  loading,
  onClose,
  onSubmit
}: CreateItemModalProps) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          <ItemForm
            categories={categories}
            loading={loading}
            submitText="Crear comida"
            onSubmit={onSubmit}
          />
        </View>
      </View>
    </Modal>
  );
};

export default CreateItemModal;

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
  }
});