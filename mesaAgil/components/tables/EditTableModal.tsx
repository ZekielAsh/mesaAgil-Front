import TableForm from './TableForm';
import { TableQrInfo } from '@/types/TableQr';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native';

type EditTableModalProps = {
  visible: boolean;
  table: TableQrInfo | null;
  loading?: boolean;
  onClose: () => void;
  onSubmit: (tableNumber: number) => void;
};

const EditTableModal = ({
  visible,
  table,
  loading,
  onClose,
  onSubmit
}: EditTableModalProps) => {
  if (!table) {
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
            disabled={loading}
          >
            <Text style={styles.closeText}>
              ✕
            </Text>
          </Pressable>
          <TableForm
            initialValue={table.tableNumber}
            loading={loading}
            submitText="Guardar cambios"
            onSubmit={onSubmit}
          />
        </View>
      </View>
    </Modal>
  );
};

export default EditTableModal;

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
