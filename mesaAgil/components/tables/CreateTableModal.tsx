import TableForm from './TableForm';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native';

type CreateTableModalProps = {
  visible: boolean;
  loading?: boolean;
  onClose: () => void;
  onSubmit: (tableNumber: number) => void;
};

const CreateTableModal = ({
  visible,
  loading,
  onClose,
  onSubmit
}: CreateTableModalProps) => {
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
            disabled={loading}
          >
            <Text style={styles.closeText}>
              ✕
            </Text>
          </Pressable>
          <TableForm
            loading={loading}
            submitText="Crear mesa"
            onSubmit={onSubmit}
          />
        </View>
      </View>
    </Modal>
  );
};

export default CreateTableModal;

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
