import { Fonts } from '@/constants/fonts';
import { OrderItemCart } from '@/types/OrderItemCart';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useCallback, useMemo, useRef } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import CartItem from './CartItem';

interface Props {
  cart: OrderItemCart[];
  total: number;
  loadingAddingItems: boolean;
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
  onSubmit: () => Promise<void>;
  onClear: () => void;
}

export default function CartBottomSheet({
  cart,
  total,
  loadingAddingItems,
  onIncrease,
  onDecrease,
  onSubmit,
  onClear
}: Props) {
  const bottomSheetRef = useRef(null);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);
  const snapPoints = useMemo(() => ['5%', '75%'], []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      onChange={handleSheetChanges}
      enableDynamicSizing={false}
      snapPoints={snapPoints}
      backgroundStyle={{
        backgroundColor: '#fff',
        borderRadius: 16,
        boxShadow: '0px -1px 4px rgba(0,0,0,0.10)'
      }}
      handleIndicatorStyle={{
        backgroundColor: '#000'
      }}
    >
      <BottomSheetView style={styles.buttomSheetView}>
        <View style={styles.cartContainer}>
          <View style={styles.cartHeader}>
            <Text style={styles.title}>Comidas del carrito</Text>
            <Pressable
              onPress={onClear}
              style={({ pressed }) => [
                styles.cartMiniButtom,
                {
                  backgroundColor: pressed ? '#e0e0e0' : '#fff'
                }
              ]}
            >
              <Text style={styles.textGrey}>limpiar todo</Text>
            </Pressable>
          </View>
          <View style={styles.cartItemsContainer}>
            {cart.length === 0 ? (
              <Text style={{ color: '#6C6C6C' }}>No hay comidas</Text>
            ) : (
              cart.map(orderItemCart => (
                <CartItem
                  key={orderItemCart.item.id}
                  orderItemCart={orderItemCart}
                  onIncrease={onIncrease}
                  onDecrease={onDecrease}
                />
              ))
            )}
          </View>
          <View style={{ alignItems: 'center' }}>
            <Pressable
              style={({ pressed }) => [
                styles.cartButtom,
                {
                  backgroundColor: pressed ? '#a94700' : '#F06400',
                  transform: [
                    {
                      scale: pressed ? 0.95 : 1
                    }
                  ]
                }
              ]}
              onPress={onSubmit}
              disabled={loadingAddingItems || cart.length === 0}
            >
              <Text style={styles.cardButtonText}>{loadingAddingItems ? 'Agregando...' : `Agregar por $${total}`}</Text>
            </Pressable>
          </View>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  buttomSheetView: {
    flex: 1,
    paddingTop: 0,
    paddingRight: 12,
    paddingBottom: 12,
    paddingLeft: 12,
    alignItems: 'center'
  },
  cartContainer: {
    width: '100%',
    padding: 10,
    gap: 20
  },
  cartItemsContainer: {
    display: 'flex',
    gap: 8
  },
  cartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  textGrey: {
    fontSize: 14,
    color: '#6c6c6c',
    fontFamily: Fonts.medium
  },
  title: {
    color: '#000',
    fontSize: 20,
    fontFamily: Fonts.semiBold
  },
  cartMiniButtom: {
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 4,
    paddingRight: 4,
    borderRadius: 12
  },
  cartButtom: {
    height: 36,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 12,
    justifyContent: 'center'
  },
  cardButtonText: {
    color: '#fff',
    fontFamily: Fonts.bold
  }
});
