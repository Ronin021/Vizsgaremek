import { createContext, useContext, useEffect, useState } from "react";
import {
  createOrder,
  getActiveOrderId,
  setActiveOrderId,
  addOrderItem,
  getOrderItems,
  updateOrderItem,
  deleteOrderItem
} from "../api/orderApi.js";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [orderId, setOrderId] = useState(getActiveOrderId());
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  /* KOSÁR BETÖLTÉSE */
  useEffect(() => {
    async function load() {
      if (!orderId) {
        setLoading(false);
        return;
      }

      const res = await getOrderItems(orderId);
      setItems(res);
      setLoading(false);
    }
    load();
  }, [orderId]);

  /* TERMÉK HOZZÁADÁSA */
  async function addToCart(productId, quantity = 1) {
    let id = orderId;

    // ha nincs kosár → létrehozzuk
    if (!id) {
      id = await createOrder();
      setOrderId(id);
      setActiveOrderId(id);
    }

    await addOrderItem(id, productId, quantity);

    const updated = await getOrderItems(id);
    setItems(updated);
  }

  /* MENNYISÉG MÓDOSÍTÁSA */
  async function updateQuantity(itemId, quantity) {
    if (quantity <= 0) return removeFromCart(itemId);

    await updateOrderItem(orderId, itemId, quantity);

    const updated = await getOrderItems(orderId);
    setItems(updated);
  }

  /* TÖRLÉS */
  async function removeFromCart(itemId) {
    await deleteOrderItem(orderId, itemId);
    const updated = await getOrderItems(orderId);
    setItems(updated);
  }

  /* KOSÁR ÖSSZEGZÉS */
  const subtotal = items.reduce(
    (sum, i) => sum + i.quantity * i.product.price,
    0
  );

  const shipping = subtotal >= 150000 ? 0 : 5000;
  const total = subtotal + shipping;

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        loading,
        addToCart,
        updateQuantity,
        removeFromCart,
        subtotal,
        shipping,
        total,
        itemCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
