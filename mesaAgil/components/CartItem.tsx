import { Fonts } from '@/constants/fonts';
import { OrderItemCart } from '@/types/OrderItemCart';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import MinusIcon from './ui/minus-icon';
import PlusIcon from './ui/plus-icon';
import TrashIcon from './ui/trash-icon';

interface Props {
  orderItemCart: OrderItemCart;
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
}

export default function CartItem({ orderItemCart, onIncrease, onDecrease }: Props) {
  return (
    <View key={orderItemCart.item.id} style={styles.orderItemCart}>
      <Image
        source={{
          uri: orderItemCart.item.imageUrl
        }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{orderItemCart.item.name}</Text>
        <Text style={styles.textGrey}>${orderItemCart.item.price}</Text>
      </View>
      <View style={styles.cartAside}>
        <View style={styles.cartButtons}>
          <Pressable
            style={({ pressed }) => [
              styles.cartButton,
              {
                backgroundColor: pressed ? '#e0e0e0' : '#fff'
              }
            ]}
            onPress={() => onDecrease(orderItemCart.item.id)}
          >
            {orderItemCart.quantity > 1 ? <MinusIcon color="#000" /> : <TrashIcon color="#000" />}
          </Pressable>
          <Text style={styles.cartQuantity}>{orderItemCart.quantity}</Text>
          <Pressable
            style={({ pressed }) => [
              styles.cartButton,
              {
                backgroundColor: pressed ? '#e0e0e0' : '#fff'
              }
            ]}
            onPress={() => onIncrease(orderItemCart.item.id)}
          >
            <PlusIcon color="#000" />
          </Pressable>
        </View>
        <Text style={styles.textGrey}>
          Total: <Text style={styles.textBlack}>${orderItemCart.quantity * orderItemCart.item.price}</Text>{' '}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  orderItemCart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderColor: '#E0E0E0'
  },
  image: {
    width: 56,
    height: 56,
    borderRadius: 8
  },
  itemName: {
    fontSize: 16,
    fontFamily: Fonts.medium
  },
  itemInfo: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  textGrey: {
    fontSize: 12,
    color: '#6c6c6c',
    fontFamily: Fonts.medium
  },
  cartAside: {
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  cartButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingTop: 1,
    paddingBottom: 1,
    paddingLeft: 2,
    paddingRight: 2,
    borderWidth: 1.5,
    borderRadius: 8,
    borderColor: '#000'
  },
  cartButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 1,
    paddingBottom: 1,
    paddingLeft: 4,
    paddingRight: 4,
    borderRadius: 4
  },
  cartQuantity: {
    color: '#000',
    fontSize: 16
  },
  textBlack: {
    fontFamily: Fonts.medium,
    fontSize: 12,
    color: '#000'
  }
});
