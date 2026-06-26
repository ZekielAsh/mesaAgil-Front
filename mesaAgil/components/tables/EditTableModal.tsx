import { TableQrInfo } from '@/types/TableQr';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import CloseIcon from '../ui/close-icon';
import TableForm from './TableForm';

type EditTableModalProps = {
  visible: boolean;
  table: TableQrInfo | null;
  loading?: boolean;
  onClose: () => void;
  onSubmit: (tableNumber: number) => void;
};

const EditTableModal = ({ visible, table, loading, onClose, onSubmit }: EditTableModalProps) => {
  if (!table) {
    return null;
  }

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Pressable style={styles.closeButton} onPress={onClose} disabled={loading}>
            <CloseIcon color="#000000" />
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
