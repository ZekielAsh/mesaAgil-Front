import CloseIcon from '@/components/ui/close-icon';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import EditUserForm from '../EditUserForm';

type EditUserProps = {
  visible: boolean;
  loading?: boolean;
  userId: number;

  onClose: () => void;

  onSubmit: (id: number, username: string) => void;
};

const EditUserModal = ({ visible, loading, userId, onClose, onSubmit }: EditUserProps) => {
  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Pressable style={styles.closeButton} onPress={onClose}>
            <CloseIcon color="#000000" />
          </Pressable>
          <EditUserForm userId={userId} loading={loading} onSubmit={onSubmit} />
        </View>
      </View>
    </Modal>
  );
};

export default EditUserModal;

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
