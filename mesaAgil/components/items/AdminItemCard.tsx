import { Item } from '@/types/model/Item';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

type AdminItemCardProps = {
  item: Item;

  onEdit: (item: Item) => void;

  onToggleActive: (item: Item) => void;

  toggling?: boolean;
};

export const AdminItemCard = ({ item, onEdit, onToggleActive, toggling }: AdminItemCardProps) => {
  const isActive = item.active !== false;

  return (
    <View style={[styles.card, !isActive && styles.inactiveCard]}>
      <Image
        source={{
          uri: item.imageUrl
        }}
        style={styles.image}
      />

      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.info}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.category}>{item.categoryName}</Text>
            <Text style={styles.price}>${item.price}</Text>
          </View>
          <View style={[styles.statusBadge, isActive ? styles.activeBadge : styles.inactiveBadge]}>
            <Text style={styles.statusText}>{isActive ? 'Activa' : 'Inactiva'}</Text>
          </View>
        </View>
        <View style={styles.footer}>
          <View style={styles.actions}>
            <Pressable
              style={[
                styles.toggleButton,
                isActive ? styles.disableButton : styles.enableButton,
                toggling && styles.disabledButton
              ]}
              onPress={() => onToggleActive(item)}
              disabled={toggling}
            >
              <Text style={styles.buttonText}>
                {toggling ? 'Guardando...' : isActive ? 'Deshabilitar' : 'Habilitar'}
              </Text>
            </Pressable>
            <Pressable style={styles.editButton} onPress={() => onEdit(item)}>
              <Text style={styles.buttonText}>Editar</Text>
            </Pressable>
          </View>
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
    elevation: 3,
    boxShadow: '2px 2px 4px rgba(0,0,0,0.25)'
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
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  info: {
    justifyContent: 'flex-start'
  },
  footer: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 999,
    marginLeft: 8
  },
  activeBadge: {
    backgroundColor: '#34C759'
  },
  inactiveBadge: {
    backgroundColor: '#8E8E93'
  },
  statusText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold'
  },
  category: {
    color: '#666'
  },
  price: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '600'
  },
  actions: {
    flexDirection: 'row',
    gap: 8
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
    backgroundColor: '#EF4444'
  },
  editButton: {
    backgroundColor: '#f48e00',
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
