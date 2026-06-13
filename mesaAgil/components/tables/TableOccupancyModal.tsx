import { Fonts } from '@/constants/fonts';
import { TableOccupancy, TableStatus } from '@/types/TableOccupancy';
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native';

type Props = {
  visible: boolean;
  tables: TableOccupancy[];
  onClose: () => void;
  onSelectTable: (table: TableOccupancy) => void;
};

const getStatusText = (table: TableOccupancy) => {
  switch (table.status) {
    case TableStatus.FREE:
      return 'Libre';

    case TableStatus.CLOSED:
      return 'Cerrada';

    case TableStatus.OCCUPIED:
      return `${table.customerCount} personas`;

    default:
      return '';
  }
};

const getStatusStyle = (table: TableOccupancy) => {
  switch (table.status) {
    case TableStatus.FREE:
      return styles.free;

    case TableStatus.CLOSED:
      return styles.closed;

    case TableStatus.OCCUPIED:
      return styles.occupied;

    default:
      return {};
  }
};

export default function TableOccupancyModal({
  visible,
  tables,
  onClose,
  onSelectTable
}: Props) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.title}>
            Ocupación de mesas
          </Text>

          <FlatList
            data={tables}
            keyExtractor={(item) => item.tableId.toString()}
            renderItem={({ item }) => (
              <Pressable
                style={styles.row}
                onPress={() => onSelectTable(item)}
              >
                <Text style={styles.table}>
                  Mesa {item.tableNumber}
                </Text>

                <Text
                  style={[styles.status, getStatusStyle(item)]} 
                >
                  {getStatusText(item)}
                </Text>
              </Pressable>
            )}
          />

          <Pressable
            style={styles.closeButton}
            onPress={onClose}
          >
            <Text style={styles.closeText}>
              Cerrar
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20
  },

  content: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    maxHeight: '80%'
  },

  title: {
    fontSize: 22,
    fontFamily: Fonts.bold,
    marginBottom: 16
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB'
  },

  table: {
    fontSize: 18,
    fontFamily: Fonts.bold
  },

  closeButton: {
    marginTop: 20,
    alignSelf: 'center'
  },

  closeText: {
    fontSize: 16
  },
  status: {
    fontSize: 16,
    fontFamily: Fonts.medium
  },

  free: {
    color: '#16A34A'
  },

  occupied: {
    color: '#2563EB'
  },

  closed: {
    color: '#DC2626'
  },
});