import { TableOccupancy, TableStatus } from '@/types/TableOccupancy';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

type Props = {
  visible: boolean;
  table: TableOccupancy | null;
  currentUsername?: string;

  onAssign: (tableId: number) => Promise<void>;

  onUnassign: (tableId: number) => Promise<void>;

  onClose: () => void;
};

export default function TableAssignmentModal({
  visible,
  table,
  currentUsername,
  onAssign,
  onUnassign,
  onClose
}: Props) {
  if (!table) return null;

  const isMine =
    table.assignedStaffUsername ===
    currentUsername;

  const isAssigned =
    !!table.assignedStaffUsername;

  const statusText =
    table.status === TableStatus.FREE
      ? 'Libre'
      : table.status === TableStatus.OCCUPIED
        ? 'Ocupada'
        : 'Cerrada';

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.title}>
            Mesa {table.tableNumber}
          </Text>

          <Text>
            Estado: {statusText}
          </Text>

          {table.status ===
            TableStatus.OCCUPIED && (
            <Text>
              Clientes:{' '}
              {table.customerCount}
            </Text>
          )}

          <Text>
            Asignación:{' '}
            {table.assignedStaffUsername ??
              'Sin asignar'}
          </Text>

          {!isAssigned && (
            <Pressable
              style={styles.primaryButton}
              onPress={() =>
                onAssign(table.tableId)
              }
            >
              <Text
                style={
                  styles.buttonText
                }
              >
                Asignarme
              </Text>
            </Pressable>
          )}

          {isMine && (
            <Pressable
              style={styles.dangerButton}
              onPress={() =>
                onUnassign(table.tableId)
              }
            >
              <Text
                style={
                  styles.buttonText
                }
              >
                Liberar mesa
              </Text>
            </Pressable>
          )}

          <Pressable
            style={styles.closeButton}
            onPress={onClose}
          >
            <Text>Cerrar</Text>
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
    backgroundColor:
      'rgba(0,0,0,0.5)',
    padding: 20
  },

  content: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16
  },

  primaryButton: {
    backgroundColor: '#2563EB',
    padding: 12,
    borderRadius: 10,
    marginTop: 16
  },

  dangerButton: {
    backgroundColor: '#DC2626',
    padding: 12,
    borderRadius: 10,
    marginTop: 16
  },

  buttonText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '600'
  },

  closeButton: {
    marginTop: 16,
    alignItems: 'center'
  }
});