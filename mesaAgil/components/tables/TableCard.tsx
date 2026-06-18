import { TableOccupancy, TableStatus } from '@/types/TableOccupancy';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type Props = {
  table: TableOccupancy;
  onPress: () => void;
};

const getStatusColor = (status: TableStatus) => {
  switch (status) {
    case TableStatus.FREE:
      return '#2563EB';

    case TableStatus.OCCUPIED:
      return '#F59E0B';

    case TableStatus.CLOSED:
      return '#DC2626';
  }
};

const getStatusText = (table: TableOccupancy) => {
  switch (table.status) {
    case TableStatus.FREE:
      return 'Libre';

    case TableStatus.OCCUPIED:
      return `${table.customerCount} personas`;

    case TableStatus.CLOSED:
      return 'Cerrada';
  }
};

export default function TableCard({
  table,
  onPress
}: Props) {
  return (
    <Pressable
      style={styles.card}
      onPress={onPress}
    >
      <Text style={styles.tableNumber}>
        Mesa {table.tableNumber}
      </Text>

      <View
        style={[
          styles.statusDot,
          {
            backgroundColor: getStatusColor(
              table.status
            )
          }
        ]}
      />

      <Text style={styles.statusText}>
        {getStatusText(table)}
      </Text>

      <Text
        style={styles.staffText}
        numberOfLines={1}
      >
        {table.assignedStaffUsername ??
          'Sin asignar'}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 12,
    minHeight: 140,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E5E7EB'
  },

  tableNumber: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center'
  },

  statusDot: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignSelf: 'center'
  },

  statusText: {
    textAlign: 'center',
    fontWeight: '600'
  },

  staffText: {
    textAlign: 'center',
    color: '#6B7280'
  }
});