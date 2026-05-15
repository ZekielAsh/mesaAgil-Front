import { useState } from 'react';

import { Item } from '@/types/model/Item';
import { OrderItemCart } from '@/types/OrderItemCart';

export const useCart = () => {
  const [cart, setCart] = useState<OrderItemCart[]>([]);

  const addToCart = (item: Item) => {
    setCart(prev => {
      const exists = prev.find(i => i.item.id === item.id);

      if (exists) return prev;

      return [...prev, { item, quantity: 1 }];
    });
  };

  const addItemQuantity = (itemId: number) => {
    setCart(prev => prev.map(i => (i.item.id === itemId ? { ...i, quantity: i.quantity + 1 } : i)));
  };

  const removeFromCart = (itemId: number) => {
    setCart(prev =>
      prev.map(i => (i.item.id === itemId ? { ...i, quantity: i.quantity - 1 } : i)).filter(i => i.quantity > 0)
    );
  };

  const clearCart = () => setCart([]);

  const total = cart.reduce((sum, i) => sum + i.item.price * i.quantity, 0);

  return {
    cart,
    total,
    addToCart,
    addItemQuantity,
    removeFromCart,
    clearCart
  };
};
