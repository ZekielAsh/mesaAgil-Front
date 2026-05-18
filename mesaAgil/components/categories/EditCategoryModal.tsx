import CategoryForm from './CategoryForm';
import { Category } from '@/types/model/Category';

import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native';

type EditCategoryModalProps = {
  visible: boolean;
  category: Category | null;
  loading?: boolean;

  onClose: () => void;

  onSubmit: (
    name: string
  ) => void;
};

const EditCategoryModal = ({
  visible,
  category,
  loading,
  onClose,
  onSubmit
}: EditCategoryModalProps) => {
  if (!category) {
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
          <CategoryForm
            initialValue={
              category.name
            }
            loading={loading}
            submitText="Guardar cambios"
            onSubmit={onSubmit}
          />
        </View>
      </View>
    </Modal>
  );
};

export default EditCategoryModal;

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
    borderRadius: 16
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