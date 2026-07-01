import { Category } from '@/types/model/Category';
import CategoryForm from './CategoryForm';

import { Modal, Pressable, StyleSheet, View } from 'react-native';
import CloseIcon from '../ui/close-icon';

type EditCategoryModalProps = {
  visible: boolean;
  category: Category | null;
  loading?: boolean;

  onClose: () => void;

  onSubmit: (name: string) => void;
};

const EditCategoryModal = ({ visible, category, loading, onClose, onSubmit }: EditCategoryModalProps) => {
  if (!category) {
    return null;
  }

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Pressable style={styles.closeButton} onPress={onClose}>
            <CloseIcon color="#000000" />
          </Pressable>
          <CategoryForm
            initialValue={category.name}
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
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 16
  },

  content: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16
  },

  closeButton: {
    alignSelf: 'flex-end'
  }
});
