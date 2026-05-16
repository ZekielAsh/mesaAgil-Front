import { Item } from '@/types/model/Item';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native';

type AdminItemCardProps = {
  item: Item;

  onEdit: (item: Item) => void;

  onDelete: (item: Item) => void;

  onToggleActive: (item: Item) => void;

  toggling?: boolean;
};

export const AdminItemCard = ({
  item,
  onEdit,
  onDelete,
  onToggleActive,
  toggling
}: AdminItemCardProps) => {
  const isActive = item.active !== false;

  return (
    <View
      style={[
        styles.card,
        !isActive && styles.inactiveCard
      ]}
    >
      <Image
        source={{
          uri: item.imageUrl
        }}
        style={styles.image}
      />

      <View style={styles.content}>
        <View>
          <View style={styles.header}>
            <Text style={styles.name}>
              {item.name}
            </Text>

            <View
              style={[
                styles.statusBadge,
                isActive
                  ? styles.activeBadge
                  : styles.inactiveBadge
              ]}
            >
              <Text
                style={
                  styles.statusText
                }
              >
                {isActive
                  ? 'Activa'
                  : 'Inactiva'}
              </Text>
            </View>
          </View>

          <Text style={styles.category}>
            {item.categoryName}
          </Text>

          <Text style={styles.price}>
            ${item.price}
          </Text>
        </View>

        <View style={styles.actions}>
          <Pressable
            style={[
              styles.toggleButton,
              isActive
                ? styles.disableButton
                : styles.enableButton,
              toggling &&
                styles.disabledButton
            ]}
            onPress={() =>
              onToggleActive(item)
            }
            disabled={toggling}
          >
            <Text
              style={
                styles.buttonText
              }
            >
              {toggling
                ? 'Guardando...'
                : isActive
                  ? 'Deshabilitar'
                  : 'Habilitar'}
            </Text>
          </Pressable>

          <Pressable
            style={styles.editButton}
            onPress={() =>
              onEdit(item)
            }
          >
            <Text
              style={
                styles.buttonText
              }
            >
              Editar
            </Text>
          </Pressable>

          <Pressable
            style={
              styles.deleteButton
            }
            onPress={() =>
              onDelete(item)
            }
          >
            <Text
              style={
                styles.buttonText
              }
            >
              Eliminar
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    gap: 12,
    elevation: 3
  },

  inactiveCard: {
    opacity: 0.72
  },

  image: {
    width: 90,
    height: 90,
    borderRadius: 12
  },

  content: {
    flex: 1,
    justifyContent:
      'space-between'
  },

  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent:
      'space-between',
    gap: 8
  },

  name: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1
  },

  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 999
  },

  activeBadge: {
    backgroundColor: '#34C759'
  },

  inactiveBadge: {
    backgroundColor: '#8E8E93'
  },

  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold'
  },

  category: {
    color: '#666',
    marginTop: 4
  },

  price: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '600'
  },

  actions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12
  },

  toggleButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8
  },

  enableButton: {
    backgroundColor: '#34C759'
  },

  disableButton: {
    backgroundColor: '#5856D6'
  },

  editButton: {
    backgroundColor: '#FF9500',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8
  },

  deleteButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8
  },

  disabledButton: {
    opacity: 0.6
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  }
});
