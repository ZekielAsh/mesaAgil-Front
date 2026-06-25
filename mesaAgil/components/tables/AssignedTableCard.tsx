import { TableOccupancy, TableStatus } from '@/types/TableOccupancy';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type Props = {
  table: TableOccupancy;

  onOpenSession?: (tableId: number) => void;
  onCloseSession?: (tableId: number) => void;
};

export default function AssignedTableCard({
  table,
  onOpenSession,
  onCloseSession
}: Props) {
  const occupied = table.status === TableStatus.OCCUPIED;

  const getStatusLabel = () => {
  switch (table.status) {
    case TableStatus.FREE: return 'Libre';
    case TableStatus.OCCUPIED: return `${table.customerCount} personas`;
    case TableStatus.CLOSED: return 'Cerrada';
  }
};
  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.title}>
          Mesa {table.tableNumber}
        </Text>

        <Text style={styles.subtitle}>
          {getStatusLabel()}
        </Text>
      </View>

      {occupied ? (
        <Pressable
          style={[
            styles.button,
            styles.closeButton
          ]}
          onPress={() =>
            onCloseSession?.(
              table.tableId
            )
          }
        >
          <Text style={styles.buttonText}>
            Cerrar sesión
          </Text>
        </Pressable>
      ) : (
        <Pressable
          style={[
            styles.button,
            styles.openButton
          ]}
          onPress={() =>
            onOpenSession?.(
              table.tableId
            )
          }
        >
          <Text style={styles.buttonText}>
            Abrir sesión
          </Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12
  },

  title: {
    fontSize: 18,
    fontWeight: '700'
  },

  subtitle: {
    color: '#6B7280',
    marginTop: 4
  },

  button: {
    marginTop: 12,
    paddingVertical: 12,
    borderRadius: 8
  },

  openButton: {
    backgroundColor: '#16A34A'
  },

  closeButton: {
    backgroundColor: '#DC2626'
  },

  buttonText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '600'
  }
});