import CategoryForm from './CategoryForm';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native';

type CreateCategoryModalProps = {
  visible: boolean;
  loading?: boolean;

  onClose: () => void;

  onSubmit: (
    name: string
  ) => void;
};

const CreateCategoryModal = ({
  visible,
  loading,
  onClose,
  onSubmit
}: CreateCategoryModalProps) => {
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
            loading={loading}
            submitText="Crear categoría"
            onSubmit={onSubmit}
          />
        </View>
      </View>
    </Modal>
  );
};

export default CreateCategoryModal;

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
  },
});