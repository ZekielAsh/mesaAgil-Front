import { Category } from '@/types/model/Category';
import * as ImagePicker from 'expo-image-picker';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import CloseIcon from '../ui/close-icon';
import ItemForm from './ItemForm';

type CreateItemModalProps = {
  visible: boolean;
  categories: Category[];
  loading?: boolean;

  onClose: () => void;

  onSubmit: (values: {
    name: string;
    description: string;
    imageUrl: string;
    price: number;
    categoryId: number;
    imageFile?: ImagePicker.ImagePickerAsset;
  }) => void;
};

const CreateItemModal = ({ visible, categories, loading, onClose, onSubmit }: CreateItemModalProps) => {
  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Pressable style={styles.closeButton} onPress={onClose}>
            <CloseIcon color="#000000" />
          </Pressable>
          <ItemForm categories={categories} loading={loading} submitText="Crear comida" onSubmit={onSubmit} />
        </View>
      </View>
    </Modal>
  );
};

export default CreateItemModal;

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
    padding: 16,
    maxHeight: '90%'
  },

  closeButton: {
    alignSelf: 'flex-end'
  }
});
