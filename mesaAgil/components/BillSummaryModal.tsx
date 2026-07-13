import { Fonts } from '@/constants/fonts';
import { BillSummary } from '@/types/BillResponses';
import {
  ActivityIndicator,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';

type Props = {
  visible: boolean;
  loading: boolean;
  bill?: BillSummary;
  onClose: () => void;
  onConfirm: () => void;
};

const formatPrice = (value: number) =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS'
  }).format(value);

const formatDate = (date: string) =>
  new Date(date).toLocaleString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });

export default function BillSummaryModal({
  visible,
  loading,
  bill,
  onClose,
  onConfirm
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
            Resumen de cuenta
          </Text>

          {loading ? (
            <ActivityIndicator
              size="large"
              style={{ marginVertical: 30 }}
            />
          ) : (
            <>
              <View style={styles.headerCard}>
                <Text style={styles.tableTitle}>
                  Mesa {bill?.tableNumber}
                </Text>

                <Text style={styles.dateLabel}>
                  Orden realizada
                </Text>

                <Text style={styles.dateValue}>
                  {bill ? formatDate(bill.orderedAt) : '-'}
                </Text>
              </View>

              <ScrollView
                style={styles.itemsContainer}
                showsVerticalScrollIndicator
              >
                {bill?.items.map((item, index) => (
                  <View
                    key={`${item.itemName}-${index}`}
                    style={styles.itemCard}
                  >
                    <Text style={styles.itemName}>
                      {item.itemName}
                    </Text>

                    <View style={styles.itemRow}>
                      <Text style={styles.itemQuantity}>
                        {item.quantity} × {formatPrice(item.unitPrice)}
                      </Text>

                      <Text style={styles.itemTotal}>
                        {formatPrice(item.totalPrice)}
                      </Text>
                    </View>
                  </View>
                ))}
              </ScrollView>

              <View style={styles.totalContainer}>
                <Text style={styles.totalLabel}>
                  Total
                </Text>

                <Text style={styles.totalValue}>
                  {formatPrice(bill?.total ?? 0)}
                </Text>
              </View>

              <View style={styles.buttonsContainer}>
                <Pressable
                  style={[styles.button, styles.cancelButton]}
                  onPress={onClose}
                >
                  <Text style={styles.cancelText}>
                    Cancelar
                  </Text>
                </Pressable>

                <Pressable
                  style={[styles.button, styles.confirmButton]}
                  onPress={onConfirm}
                >
                  <Text style={styles.confirmText}>
                    Confirmar pedido
                  </Text>
                </Pressable>
              </View>
            </>
          )}
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

  headerCard: {
    backgroundColor: '#111827',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16
  },

  tableTitle: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    color: '#E5E7EB'
  },

  dateLabel: {
    marginTop: 8,
    fontSize: 13,
    color: '#D1D5DB',
    fontFamily: Fonts.medium
  },

  dateValue: {
    marginTop: 2,
    fontSize: 15,
    color: '#E5E7EB',
    fontFamily: Fonts.bold
  },

  itemsContainer: {
    maxHeight: 280,
    paddingRight: 6
  },

  itemCard: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB'
  },

  itemName: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    color: '#111827',
    marginBottom: 6
  },

  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  itemQuantity: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: Fonts.medium
  },

  itemTotal: {
    fontSize: 15,
    color: '#111827',
    fontFamily: Fonts.bold
  },

  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 18,
    marginTop: 8,
    borderTopWidth: 2,
    borderTopColor: '#111827'
  },

  totalLabel: {
    fontSize: 18,
    fontFamily: Fonts.bold
  },

  totalValue: {
    fontSize: 22,
    fontFamily: Fonts.bold,
    color: '#2563EB'
  },

  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    gap: 12
  },

  button: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },

  cancelButton: {
    backgroundColor: '#DC2626'
  },

  confirmButton: {
    backgroundColor: '#F06400'
  },

  cancelText: {
    color: '#fff',
    fontFamily: Fonts.bold,
    fontSize: 15
  },

  confirmText: {
    color: '#fff',
    fontFamily: Fonts.bold,
    fontSize: 15
  }
});