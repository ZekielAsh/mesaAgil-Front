import { Item } from '@/types/model/Item';

import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native';

type DeleteItemModalProps = {
  visible: boolean;
  item: Item | null;
  loading?: boolean;

  onClose: () => void;

  onConfirm: () => void;
};

const DeleteItemModal = ({
  visible,
  item,
  loading,
  onClose,
  onConfirm
}: DeleteItemModalProps) => {
  return (
    <Modal
      visible={visible}
      animationType="fade"
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
          <Text style={styles.title}>
            Eliminar comida
          </Text>

          <Text style={styles.text}>
            ¿Seguro que deseas eliminar:
          </Text>

          <Text style={styles.itemName}>
            {item?.name}?
          </Text>

          <View style={styles.actions}>
            <Pressable
              style={styles.cancelButton}
              onPress={onClose}
            >
              <Text style={styles.textButton}>
                Cancelar
              </Text>
            </Pressable>

            <Pressable
              style={styles.deleteButton}
              onPress={onConfirm}
              disabled={loading}
            >
              <Text style={styles.textButton}>
                {loading
                  ? 'Eliminando...'
                  : 'Eliminar'}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteItemModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor:
      'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16
  },

  content: {
    backgroundColor: '#222',
    borderRadius: 16,
    padding: 24,
    width: '100%'
  },

  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold'
  },

  text: {
    color: '#fff',
    marginTop: 16
  },

  itemName: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 8
  },

  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 24
  },

  cancelButton: {
    backgroundColor: '#444',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8
  },

  deleteButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8
  },

  textButton: {
    color: '#fff',
    fontWeight: 'bold'
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