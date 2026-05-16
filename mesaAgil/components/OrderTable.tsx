import { OrderItem } from '@/types/model/OrderItem';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const formatPrice = (value: number) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS'
  }).format(value);
};

interface OrderTableProps {
  orderItems: OrderItem[];
}

export default function OrderTable({ orderItems }: OrderTableProps) {
  return (
    <View style={styles.container}>
      <FlatList
        data={orderItems}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={
          <View style={[styles.row, styles.header]}>
            <Text style={[styles.cell, styles.productCell, styles.headerText]}>Platos elegidos</Text>
            <Text style={[styles.cell, styles.quantityCell, styles.headerText, styles.right]}>Cantidad</Text>
            <Text style={[styles.cell, styles.priceCell, styles.headerText, styles.right]}>Precio</Text>
            <Text style={[styles.cell, styles.statusCell, styles.headerText, styles.center]}>Estado</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={[styles.cell, styles.productCell]} numberOfLines={1}>
              {item.item.name}
            </Text>

            <Text style={[styles.cell, styles.quantityCell, styles.right]}>{item.quantity}</Text>

            <Text style={[styles.cell, styles.priceCell, styles.right]}>
              {formatPrice(Number(item.price * item.quantity))}
            </Text>

            <Text style={[styles.cell, styles.statusCell, styles.center]}>{item.status}</Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12
  },

  row: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
    borderRadius: 6
  },

  header: {
    backgroundColor: '#f2f2f2',
    borderColor: '#ddd'
  },

  cell: {
    flex: 1,
    fontSize: 14
  },

  productCell: {
    flex: 1.5
  },

  quantityCell: {
    flex: 0.9
  },

  priceCell: {
    flex: 1
  },

  statusCell: {
    flex: 1
  },

  headerText: {
    fontWeight: 'bold'
  },

  right: {
    textAlign: 'right'
  },

  center: {
    textAlign: 'center'
  },

  separator: {
    height: 8
  }
});
