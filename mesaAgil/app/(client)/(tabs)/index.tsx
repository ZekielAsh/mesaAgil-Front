import CartBottomSheet from '@/components/CartBottomSheet';
import MenuItemCard from '@/components/MenuItemCard';
import { useAddItems } from '@/hooks/useAddItem';
import { useCart } from '@/hooks/useCart';
import { useMenu } from '@/hooks/useMenu';
import { ActivityIndicator, Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

const MenuScreen = () => {
  const { menu, message, loading, error, refetch } = useMenu();
  const { execute, loadingAddingItems } = useAddItems();
  const { cart, total, addToCart, addItemQuantity, removeFromCart, clearCart } = useCart();
  const insets = useSafeAreaInsets();

  const handleAddItems = async () => {
    try {
      const orderItemsList = cart.map(orderItemCart => ({
        itemId: orderItemCart.item.id,
        quantity: orderItemCart.quantity
      }));

      await execute(6, orderItemsList);
      clearCart();

      Toast.show({
        type: 'success',
        text1: 'Agregado a la orden'
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';

      Toast.show({
        type: 'error',
        text1: errorMessage
      });
    }
  };

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
    <GestureHandlerRootView style={styles.container}>
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
          renderItem={({ item }) => <MenuItemCard item={item} addToCart={addToCart} />}
          contentContainerStyle={styles.menuContainer}
          refreshing={loading}
          onRefresh={refetch}
        />

        <CartBottomSheet
          cart={cart}
          total={total}
          loadingAddingItems={loadingAddingItems}
          onIncrease={addItemQuantity}
          onDecrease={removeFromCart}
          onSubmit={handleAddItems}
          onClear={clearCart}
        />
      </View>
    </GestureHandlerRootView>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  menuContainer: {
    display: 'flex',
    gap: 12,
    paddingTop: 12,
    paddingLeft: 12,
    paddingRight: 12,
    paddingBottom: 36
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyText: {
    color: '#fff',
    fontSize: 16
  }
});
