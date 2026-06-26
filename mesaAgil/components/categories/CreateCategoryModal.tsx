import CloseIcon from '@/components/ui/close-icon';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import CategoryForm from './CategoryForm';

type CreateCategoryModalProps = {
  visible: boolean;
  loading?: boolean;

  onClose: () => void;

  onSubmit: (name: string) => void;
};

const CreateCategoryModal = ({ visible, loading, onClose, onSubmit }: CreateCategoryModalProps) => {
  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Pressable style={styles.closeButton} onPress={onClose}>
            <CloseIcon color="#000000" />
          </Pressable>
          <CategoryForm loading={loading} submitText="Crear categoría" onSubmit={onSubmit} />
        </View>
      </View>
    </Modal>
  );
};

export default CreateCategoryModal;

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
