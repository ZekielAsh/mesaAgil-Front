import { Item } from '@/types/model/Item';
import { OrderItemCart } from '@/types/OrderItemCart';
import { useState } from 'react';
import { ActivityIndicator, Button, FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAddItems } from '../../hooks/useAddItem';
import { useMenu } from '../../hooks/useMenu';

const MenuScreen = () => {
  const { menu, message, loading, error, refetch } = useMenu();
  const { execute, loadingAddingItems, errorAddingItems } = useAddItems();
  const [cart, setCart] = useState<OrderItemCart[]>([]);
  const insets = useSafeAreaInsets();

  const renderItem = ({ item }: { item: Item }) => (
    <View style={styles.card}>
      <Image
        source={{
          uri: item.imageUrl
        }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.price}>${item.price}</Text>

      <View style={styles.cardButtonsContainer}>
        <Pressable style={styles.cardButton} onPress={() => removeFromCart(item.id)}>
          <Text style={styles.cardButtonText}>-</Text>
        </Pressable>
        <Pressable style={styles.cardButton} onPress={() => addToCart(item)}>
          <Text style={styles.cardButtonText}>+</Text>
        </Pressable>
      </View>
    </View>
  );

  const addToCart = (item: Item) => {
    setCart(prevCart => {
      const existing = prevCart.find(orderItemCart => orderItemCart.item.id === item.id);

      if (existing) {
        return prevCart.map(orderItemCart =>
          orderItemCart.item.id === item.id ? { ...orderItemCart, quantity: orderItemCart.quantity + 1 } : orderItemCart
        );
      }

      return [...prevCart, { item: item, quantity: 1 }];
    });
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
      await execute(1, orderItemsList);
      setCart([]);
    } catch (error) {
      console.log('falló', error);
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
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
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
        numColumns={4}
      />

      <View style={{ padding: 10, backgroundColor: '#222', maxHeight: 150 }}>
        {cart.length === 0 ? (
          <Text style={{ color: 'gray' }}>No hay items</Text>
        ) : (
          cart.map(orderItemCart => (
            <Text key={orderItemCart.item.id} style={{ color: 'white' }}>
              {orderItemCart.item.name} x{orderItemCart.quantity}
            </Text>
          ))
        )}

        <Text style={{ color: 'white', marginTop: 10 }}>Total: ${total}</Text>
        <Button
          title={loadingAddingItems ? 'Agregando...' : 'Pedir comidas'}
          onPress={handleAddItems}
          disabled={loading}
        />
      </View>
    </View>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    margin: 12,
    borderRadius: 10,
    elevation: 3
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10
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
    fontWeight: 'bold',
    color: 'green'
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
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
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
  cardButtonText: { color: '#fff', fontWeight: 'bold' }
});
