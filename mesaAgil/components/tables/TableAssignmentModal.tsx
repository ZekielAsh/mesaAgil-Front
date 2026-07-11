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
        : 'Deshabilitada';

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

          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>Estado</Text>

            <Text
              style={[
                styles.statusValue,
                table.status === TableStatus.FREE
                  ? styles.free
                  : table.status === TableStatus.OCCUPIED
                    ? styles.occupied
                    : styles.closed
              ]}
            >
              {statusText}
            </Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>Asignación</Text>

            <Text
              style={[
                styles.assignmentValue,
                isMine
                  ? styles.assignmentMine
                  : isAssigned
                    ? styles.assignmentOther
                    : styles.assignmentFree
              ]}
            >
              {isMine
                ? 'Asignada a vos'
                : table.assignedStaffUsername ?? 'Sin asignar'}
            </Text>
          </View>

          {!isAssigned && (
            <Pressable
              style={styles.primaryButton}
              onPress={() => onAssign(table.tableId)}
            >
              <Text style={styles.buttonText}>
                Asignarme
              </Text>
            </Pressable>
          )}

          {isMine && (
            <Pressable
              style={styles.dangerButton}
              onPress={() => onUnassign(table.tableId)}
            >
              <Text style={styles.buttonText}>
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

  infoCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 16,
    marginBottom: 16
  },

  infoTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#6B7280',
    textTransform: 'uppercase',
    marginBottom: 10
  },

  statusValue: {
    fontSize: 22,
    fontWeight: '700'
  },

  assignmentValue: {
    fontSize: 20,
    fontWeight: '700'
  },

  free: {
    color: '#2563EB'
  },

  occupied: {
    color: '#F06400'
  },

  closed: {
    color: '#DC2626'
  },

  assignmentMine: {
    color: '#2563EB'
  },

  assignmentOther: {
    color: '#F06400'
  },

  assignmentFree: {
    color: '#6B7280'
  },

  primaryButton: {
    backgroundColor: '#2563EB',
    padding: 12,
    borderRadius: 10,
    marginTop: 16
  },

  dangerButton: {
    backgroundColor: '#F06400',
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