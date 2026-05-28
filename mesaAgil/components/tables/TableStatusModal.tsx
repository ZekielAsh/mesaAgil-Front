import { Fonts } from '@/constants/fonts';
import { TableQrInfo } from '@/types/TableQr';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from 'react-native';

type TableStatusModalProps = {
  visible: boolean;
  table: TableQrInfo | null;
  loading?: boolean;
  onClose: () => void;
  onEnable?: () => void;
  onCloseTable?: () => void;
};

const TableStatusModal = ({
  visible,
  table,
  loading,
  onClose,
  onEnable,
  onCloseTable
}: TableStatusModalProps) => {
  if (!table) {
    return null;
  }

  const isEnabled = table.enabled;

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.title}>
            Mesa {table.tableNumber}
          </Text>

          <View style={styles.statusContainer}>
            <Text style={styles.statusLabel}>
              Estado actual:
            </Text>
            <Text
              style={[
                styles.statusBadge,
                isEnabled
                  ? styles.enabledBadge
                  : styles.disabledBadge
              ]}
            >
              {isEnabled ? 'Habilitada' : 'Cerrada'}
            </Text>
          </View>

          <View style={styles.actionsContainer}>
            {!isEnabled && (
              <Pressable
                style={styles.primaryButton}
                onPress={onEnable}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>
                    Habilitar mesa
                  </Text>
                )}
              </Pressable>
            )}

            {isEnabled && (
              <Pressable
                style={styles.dangerButton}
                onPress={onCloseTable}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>
                    Cerrar mesa
                  </Text>
                )}
              </Pressable>
            )}

            <Pressable
              style={styles.secondaryButton}
              onPress={onClose}
              disabled={loading}
            >
              <Text style={styles.secondaryButtonText}>
                Cancelar
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default TableStatusModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16
  },

  content: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    gap: 24,
    width: '100%',
    maxWidth: 400
  },

  title: {
    color: '#111827',
    fontSize: 28,
    fontFamily: Fonts.bold,
    textAlign: 'center'
  },

  statusContainer: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 16,
    gap: 8,
    alignItems: 'center'
  },

  statusLabel: {
    color: '#6B7280',
    fontSize: 14,
    fontFamily: Fonts.medium
  },

  statusBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    fontSize: 16,
    fontFamily: Fonts.bold,
    textAlign: 'center'
  },

  enabledBadge: {
    backgroundColor: '#DCFCE7',
    color: '#166534'
  },

  disabledBadge: {
    backgroundColor: '#FEE2E2',
    color: '#991B1B'
  },

  actionsContainer: {
    gap: 12
  },

  primaryButton: {
    backgroundColor: '#111827',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56
  },

  dangerButton: {
    backgroundColor: '#DC2626',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56
  },

  buttonText: {
    color: '#fff',
    fontFamily: Fonts.bold,
    fontSize: 16
  },

  secondaryButton: {
    borderColor: '#D1D5DB',
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center'
  },

  secondaryButtonText: {
    color: '#111827',
    fontFamily: Fonts.bold,
    fontSize: 16
  }
});
