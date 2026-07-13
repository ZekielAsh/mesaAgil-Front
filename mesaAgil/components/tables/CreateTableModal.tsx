import { Modal, Pressable, StyleSheet, View } from 'react-native';
import CloseIcon from '../ui/close-icon';
import TableForm from './TableForm';

type CreateTableModalProps = {
  visible: boolean;
  loading?: boolean;
  onClose: () => void;
  onSubmit: (tableNumber: number) => void;
};

const CreateTableModal = ({ visible, loading, onClose, onSubmit }: CreateTableModalProps) => {
  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Pressable style={styles.closeButton} onPress={onClose} disabled={loading}>
            <CloseIcon color="#000000" />
          </Pressable>
          <TableForm loading={loading} submitText="Crear mesa" onSubmit={onSubmit} />
        </View>
      </View>
    </Modal>
  );
};

export default CreateTableModal;

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
