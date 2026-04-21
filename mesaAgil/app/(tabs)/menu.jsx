import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  Button,
  StyleSheet,
} from "react-native";
import { useMenu } from "../../hooks/useMenu";

const MenuScreen = () => {
  const { menu, message, loading, error, refetch } = useMenu();
  const [cart, setCart] = useState([]);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={{
          uri: item.imageUrl,
        }}
        style={styles.image}
      />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.price}>${item.price}</Text>

      <Button title="-" onPress={() => removeFromCart(item.id)} />
      <Text style={{ marginHorizontal: 10, color: "white" }}>
        {getQuantity(item.id)}
      </Text>
      <Button title="+" onPress={() => addToCart(item)} />
    </View>
  );

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existing = prevCart.find((i) => i.id === item.id);

      if (existing) {
        return prevCart.map((i) =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }

      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const getQuantity = (id) => {
    const found = cart.find((i) => i.id === id);
    return found ? found.quantity : 0;
  };

  const removeFromCart = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((i) =>
          i.id === id
            ? { ...i, quantity: i.quantity - 1 }
            : i
        )
        .filter((i) => i.quantity > 0)
    );
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

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
        <Text style={ styles.emptyText }>{message}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={menu}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.container}
        refreshing={loading}
        onRefresh={refetch}
      />

      {/* 🛒 CARRITO */}
      <View style={{ padding: 10, backgroundColor: "#222", maxHeight: 150 }}>
        <Text style={{ color: "white", fontSize: 18 }}>
          Carrito:
        </Text>

        {cart.length === 0 ? (
          <Text style={{ color: "gray" }}>
            No hay items en el carrito
          </Text>
        ) : (
          cart.map((item) => (
            <Text key={item.id} style={{ color: "white" }}>
              {item.name} x{item.quantity}
            </Text>
          ))
        )}

        {/* TOTAL */}
        <Text style={{ color: "white", marginTop: 10 }}>
          Total: ${total}
        </Text>
      </View>
    </View>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    color: "#666",
    marginVertical: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "green",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: "#fff",
    fontSize: 16,
  },
});