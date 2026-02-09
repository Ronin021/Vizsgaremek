import { request } from "./client.js";

const ORDER_KEY = "active_order_id";

export function getActiveOrderId() {
  return localStorage.getItem(ORDER_KEY);
}

export function setActiveOrderId(id) {
  localStorage.setItem(ORDER_KEY, id);
}

export function clearActiveOrderId() {
  localStorage.removeItem(ORDER_KEY);
}

/* ÚJ ORDER (kosár) létrehozása */
export async function createOrder() {
  const order = await request("/api/orders", {
    method: "POST"
  });

  setActiveOrderId(order.id);
  return order.id;
}

/* Termék hozzáadása kosárhoz */
export async function addOrderItem(orderId, productId, quantity = 1) {
  return request("/api/orderItems", {
    method: "POST",
    body: {
      orderId: Number(orderId),
      productId: Number(productId),
      quantity: quantity
    }
  });
}

/* Kosár tételeinek lekérése */
export async function getOrderItems(orderId) {
  return request(`/api/orderItems/order/${orderId}`);
}

/* Mennyiség módosítása */
export async function updateOrderItem(orderId, itemId, quantity) {
  return request(`/api/orderItems/${itemId}`, {
    method: "PUT",
    body: {
      orderId: Number(orderId),
      productId: null,
      quantity: quantity
    }
  });
}

/* Törlés */
export async function deleteOrderItem(orderId, itemId) {
  return request(`/api/orderItems/${itemId}`, {
    method: "DELETE"
  });
}

/* Rendelés befejezése */
export async function completeOrder(orderId) {
  return request(`/api/orders/${orderId}`, {
    method: "PUT",
    body: { status: "Feldolgozás alatt" }
  });
}

