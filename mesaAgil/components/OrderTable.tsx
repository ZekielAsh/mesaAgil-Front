import { Order } from '@/model/Order';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const formatPrice = (value: number) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS'
  }).format(value);
};

interface OrderTableProps {
  order: Order;
}

export default function OrderTable({ order }: OrderTableProps) {
  return (
    <View style={styles.container}>
      <FlatList
        data={order.orderItems}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={
          <View style={[styles.row, styles.header]}>
            <Text style={[styles.cell, styles.headerText]}>Comida</Text>
            <Text style={[styles.cell, styles.headerText, styles.right]}>Cant</Text>
            <Text style={[styles.cell, styles.headerText, styles.right]}>Precio</Text>
            <Text style={[styles.cell, styles.headerText, styles.center]}>Estado</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={[styles.cell]} numberOfLines={1}>
              {item.item.name}
            </Text>

            <Text style={[styles.cell, styles.right]}>{item.quantity}</Text>

            <Text style={[styles.cell, styles.right]}>{formatPrice(Number(item.price))}</Text>

            <Text style={[styles.cell, styles.center]}>{item.status}</Text>
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
