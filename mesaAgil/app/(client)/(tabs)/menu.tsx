import CartBottomSheet from '@/components/CartBottomSheet';
import ClientRouteGuard from '@/components/ClientRouteGuard';
import MenuItemCard from '@/components/MenuItemCard';
import { Fonts } from '@/constants/fonts';
import { useAddItems } from '@/hooks/useAddItem';
import { useCart } from '@/hooks/useCart';
import { useMenu } from '@/hooks/useMenu';
import { useTableSession } from '@/hooks/useTableSession';
import { Item } from '@/types/model/Item';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Button, Pressable, ScrollView, SectionList, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

const MenuScreen = () => {
  const { menu, message, loading, error, refetch } = useMenu();
  const { execute, loadingAddingItems } = useAddItems();
  const { cart, total, addToCart, addItemQuantity, removeFromCart, clearCart } = useCart();
  const { session, clearSession } = useTableSession();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (!session) {
      return;
    }

    if (session.tableEnabled === false) {
      clearSession();
      return;
    }

    if (!session.activeSession || !session.orderId) {
      clearSession();
    }
  }, [session, clearSession]);

  const handleAddItems = async () => {
    try {
      if (!session) {
        throw new Error('Escanea el QR de tu mesa para pedir');
      }

      if (session.tableEnabled === false) {
        throw new Error('La mesa se encuentra cerrada.');
      }

      if (!session.activeSession || !session.orderId) {
        throw new Error('La mesa no tiene una orden abierta');
      }

      const orderItemsList = cart.map(orderItemCart => ({
        itemId: orderItemCart.item.id,
        quantity: orderItemCart.quantity
      }));

      await execute(session.orderId, orderItemsList);
      clearCart();

      Toast.show({
        type: 'success',
        text1: 'Agregado a la orden'
      });
    } catch (error) {
      const err = error as any;
      let errorText = err.response?.data?.message || 'Error desconocido';

      Toast.show({
        type: 'error',
        text1: errorText
      });
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  }

  if (!session) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyTitle}>Escanea el QR de tu mesa</Text>
        <Text style={styles.emptyDescription}>Asi vamos a saber a que mesa enviar tus pedidos.</Text>
      </View>
    );
  }

  if (session.tableEnabled === false) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyTitle}>{session.tableLabel}</Text>
        <Text style={styles.emptyDescription}>La mesa se encuentra cerrada.</Text>
      </View>
    );
  }

  if (!session.activeSession || !session.orderId) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyTitle}>{session.tableLabel}</Text>
        <Text style={styles.emptyDescription}>La mesa no tiene una orden abierta en este momento.</Text>
      </View>
    );
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

  if (!menu) {
    return (
      <View style={styles.center}>
        <Text>Menu not found</Text>
      </View>
    );
  }

  const categories = [...new Set(menu.map(item => item.category))];

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => (prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]));
  };

  const filteredMenu =
    selectedCategories.length === 0 ? menu : menu.filter(item => selectedCategories.includes(item.category));

  // ver de carmbien en back la response de menu a lista de <Category, Item[]>[]
  const sections = Object.values(
    filteredMenu.reduce(
      (acc, item) => {
        const categoryName = item.category;

        if (!acc[categoryName]) {
          acc[categoryName] = {
            title: categoryName,
            data: []
          };
        }

        acc[categoryName].data.push(item);

        return acc;
      },
      {} as Record<string, { title: string; data: Item[] }>
    )
  );

  return (
    <ClientRouteGuard>
      <GestureHandlerRootView style={styles.container}>
        <View
          style={{
            flex: 1,
            paddingTop: insets.top,
            paddingLeft: insets.left,
            paddingRight: insets.right
          }}
        >
          <SectionList
            sections={sections}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => <MenuItemCard item={item} addToCart={addToCart} />}
            renderSectionHeader={({ section: { title } }) => (
              <View style={styles.categoryHeader}>
                <Text style={styles.categoryTitle}>{title}</Text>
              </View>
            )}
            contentContainerStyle={styles.menuContainer}
            ListHeaderComponent={
              <View>
                <View style={styles.sessionHeader}>
                  <Text style={styles.sessionLabel}>Nuestro menú</Text>

                  <Text style={styles.sessionTitle}>{session.tableLabel}</Text>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <Pressable
                    style={[styles.filterChip, selectedCategories.length === 0 && styles.filterChipSelected]}
                    onPress={() => setSelectedCategories([])}
                  >
                    <Text
                      style={[styles.filterChipText, selectedCategories.length === 0 && styles.filterChipTextSelected]}
                    >
                      Todas
                    </Text>
                  </Pressable>

                  {categories.map(category => (
                    <Pressable
                      key={category}
                      style={[styles.filterChip, selectedCategories.includes(category) && styles.filterChipSelected]}
                      onPress={() => toggleCategory(category)}
                    >
                      <Text
                        style={[
                          styles.filterChipText,
                          selectedCategories.includes(category) && styles.filterChipTextSelected
                        ]}
                      >
                        {category}
                      </Text>
                    </Pressable>
                  ))}
                </ScrollView>
              </View>
            }
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
    </ClientRouteGuard>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f8'
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
    alignItems: 'center',
    padding: 24,
    gap: 8
  },
  emptyText: {
    color: '#fff',
    fontSize: 16
  },
  emptyTitle: {
    color: '#111827',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center'
  },
  emptyDescription: {
    color: '#6B7280',
    fontSize: 15,
    textAlign: 'center'
  },
  sessionHeader: {
    backgroundColor: '#111827',
    borderRadius: 8,
    padding: 12,
    marginBottom: 4
  },
  sessionLabel: {
    color: '#D1D5DB',
    fontSize: 12,
    fontWeight: '600',
    fontFamily: Fonts.bold
  },
  sessionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 2,
    fontFamily: Fonts.bold
  },
  categoryHeader: {
    borderBottomWidth: 1,
    paddingVertical: 8
  },
  categoryTitle: {
    fontSize: 20,
    fontFamily: Fonts.bold
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8
  },
  filterChipSelected: {
    backgroundColor: '#000'
  },
  filterChipText: {
    fontSize: 14
  },
  filterChipTextSelected: {
    color: '#fff'
  }
});
