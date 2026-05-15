import { Item } from '@/types/model/Item';
import { OrderItemCart } from '@/types/OrderItemCart';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useCallback, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Button, FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAddItems } from '../../../hooks/useAddItem';
import { useMenu } from '../../../hooks/useMenu';

const MenuScreen = () => {
  const { menu, message, loading, error, refetch } = useMenu();
  const { execute, loadingAddingItems, errorAddingItems } = useAddItems();
  const [cart, setCart] = useState<OrderItemCart[]>([]);
  const insets = useSafeAreaInsets();
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['5%', '25%', '50%', '75%'], []);

  const renderItem = ({ item }: { item: Item }) => (
    <View style={styles.card}>
      <Image
        source={{
          uri: item.imageUrl
        }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.cardContent}>
        <View style={styles.cardInfo}>
          <View style={styles.cardHeader}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>${item.price}</Text>
          </View>
          <Text style={styles.description}>{item.description}</Text>
        </View>

        <View style={styles.cardButtonsContainer}>
          <Pressable style={styles.cardButton} onPress={() => addToCart(item)}>
            <Text style={styles.cardButtonText}>Add</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );

  const addToCart = (item: Item) => {
    setCart(prevCart => {
      const existing = prevCart.find(orderItemCart => orderItemCart.item.id === item.id);

      if (existing) {
        return prevCart;
      }

      return [...prevCart, { item: item, quantity: 1 }];
    });
  };

  const addItemQuantity = (itemId: number) => {
    setCart(prevCart =>
      prevCart.map(orderItemCart =>
        orderItemCart.item.id === itemId ? { ...orderItemCart, quantity: orderItemCart.quantity + 1 } : orderItemCart
      )
    );
  };

  const removeFromCart = (id: number) => {
    setCart(prevCart =>
      prevCart
        .map(orderItemCart =>
          orderItemCart.item.id === id ? { ...orderItemCart, quantity: orderItemCart.quantity - 1 } : orderItemCart
        )
        .filter(i => i.quantity > 0)
    );
  };

  const total = cart.reduce((sum, orderItemCart) => sum + orderItemCart.item.price * orderItemCart.quantity, 0);

  const handleAddItems = async () => {
    try {
      const orderItemsList = cart.map(orderItemCart => ({
        itemId: orderItemCart.item.id,
        quantity: orderItemCart.quantity
      }));
      await execute(6, orderItemsList);
      setCart([]);
    } catch (error) {
      console.log('falló', error);
    }
  };

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>{error}</Text>
        <Button title="Reintentar" onPress={refetch} />
      </View>
    );
  }

  if (message) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>{message}</Text>
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={styles.containerTwo}>
      <View
        style={{
          flex: 1,
          paddingTop: insets.top,
          paddingLeft: insets.left,
          paddingRight: insets.right
        }}
      >
        <FlatList
          data={menu}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.container}
          refreshing={loading}
          onRefresh={refetch}
        />

        <BottomSheet
          style={{ width: '100%' }}
          ref={bottomSheetRef}
          onChange={handleSheetChanges}
          enableDynamicSizing={false}
          snapPoints={snapPoints}
          backgroundStyle={{
            backgroundColor: '#222'
          }}
          handleIndicatorStyle={{
            backgroundColor: '#fff'
          }}
        >
          <BottomSheetView style={styles.contentContainer}>
            <View style={{ display: 'flex', gap: 8, padding: 10, backgroundColor: '#222', width: '100%' }}>
              <View style={{ display: 'flex', gap: 8 }}>
                {cart.length === 0 ? (
                  <Text style={{ color: 'gray' }}>No hay items</Text>
                ) : (
                  cart.map(orderItemCart => (
                    <View key={orderItemCart.item.id} style={styles.orderItemCart}>
                      <Text style={{ color: 'white' }}>{orderItemCart.item.name}</Text>
                      <View style={styles.cartButtons}>
                        <Pressable
                          style={[styles.cartButton, , { borderTopLeftRadius: '100%', borderBottomLeftRadius: '100%' }]}
                          onPress={() => removeFromCart(orderItemCart.item.id)}
                        >
                          <Text style={styles.cardButtonText}>-</Text>
                        </Pressable>
                        <Text style={{ color: 'white' }}>{orderItemCart.quantity}</Text>
                        <Pressable
                          style={[styles.cartButton, { borderTopRightRadius: '100%', borderBottomRightRadius: '100%' }]}
                          onPress={() => addItemQuantity(orderItemCart.item.id)}
                        >
                          <Text style={styles.cardButtonText}>+</Text>
                        </Pressable>
                      </View>
                    </View>
                  ))
                )}
              </View>

              <Text style={{ color: 'white' }}>Total: ${total}</Text>
              <Button
                title={loadingAddingItems ? 'Agregando...' : 'Pedir comidas'}
                onPress={handleAddItems}
                disabled={loading}
              />
            </View>
          </BottomSheetView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    gap: 12,
    padding: 12
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    elevation: 3
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
    flex: 1,
    paddingLeft: 16
  },
  cardInfo: {},
  cardHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  orderItemCart: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  cartButtons: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  description: {
    color: '#666',
    marginVertical: 5
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyText: {
    color: '#fff',
    fontSize: 16
  },
  cardButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  cardButton: {
    backgroundColor: '#007AFF',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 8,
    alignItems: 'center'
  },
  cartButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    width: 24,
    height: 24,
    borderRadius: 8
  },
  cardButtonText: { color: '#fff', fontWeight: 'bold' },
  containerTwo: {
    flex: 1
  },
  contentContainer: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#222'
  }
});
