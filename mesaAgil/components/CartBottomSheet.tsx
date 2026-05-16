import { Fonts } from '@/constants/fonts';
import { OrderItemCart } from '@/types/OrderItemCart';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { useEffect, useMemo, useRef } from 'react';
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
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['4%', '25%', '75%'], []);
  const currentIndexRef = useRef(0);
  const previousCartLength = useRef(cart.length);
  const hasOpenedFullCartRef = useRef(false);

  const handleSheetChanges = (index: number) => {
    currentIndexRef.current = index;
  };

  const bounceCart = () => {
    bottomSheetRef.current?.snapToIndex(1);

    setTimeout(() => {
      bottomSheetRef.current?.snapToIndex(0);
    }, 450);
  };

  useEffect(() => {
    const itemWasAdded = cart.length > previousCartLength.current;

    if (!itemWasAdded) {
      previousCartLength.current = cart.length;
      return;
    }

    // Primera vez
    if (!hasOpenedFullCartRef.current) {
      bottomSheetRef.current?.snapToIndex(2);

      hasOpenedFullCartRef.current = true;

      previousCartLength.current = cart.length;
      return;
    }

    // Después de la primera vez
    if (currentIndexRef.current === 0) {
      bounceCart();
    }

    previousCartLength.current = cart.length;
  }, [cart]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      enableDynamicSizing={false}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      backgroundStyle={{
        backgroundColor: '#fff',
        borderRadius: 16,
        boxShadow: '0px -1px 4px rgba(0,0,0,0.10)'
      }}
      handleIndicatorStyle={{
        backgroundColor: '#000'
      }}
    >
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
        <View style={{ flex: 1 }}>
          {cart.length === 0 ? (
            <Text style={{ color: '#6C6C6C' }}>No hay comidas</Text>
          ) : (
            <BottomSheetFlatList
              data={cart}
              keyExtractor={orderItemCart => orderItemCart.item.id.toString()}
              renderItem={({ item }) => (
                <CartItem orderItemCart={item} onIncrease={onIncrease} onDecrease={onDecrease} />
              )}
              contentContainerStyle={styles.cartItemsContainer}
              style={{ flex: 1 }}
            />
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
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  cartContainer: {
    flex: 1,
    width: '100%',
    padding: 10,
    gap: 20
  },
  cartItemsContainer: {
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
