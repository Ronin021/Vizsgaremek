import { request } from "./client.js";

const ORDER_KEY = "active_order_id";

export function getActiveOrderId() {
  return localStorage.getItem(ORDER_KEY);
}

export function setActiveOrderId(id) {
  localStorage.setItem(ORDER_KEY, id);
}

/* ÚJ ORDER (kosár) létrehozása */
export async function createOrder() {
  const order = await request("/orders", {
    method: "POST"
  });

  setActiveOrderId(order.id);
  return order.id;
}

/* Termék hozzáadása kosárhoz */
export async function addOrderItem(orderId, productId, quantity = 1) {
  return request(`/orders/${orderId}/items`, {
    method: "POST",
    body: {
      product_id: productId,
      quantity: quantity
    }
  });
}

/* Kosár tételeinek lekérése */
export async function getOrderItems(orderId) {
  return request(`/orders/${orderId}/items`);
}

/* Mennyiség módosítása */
export async function updateOrderItem(orderId, itemId, quantity) {
  return request(`/orders/${orderId}/items/${itemId}`, {
    method: "PATCH",
    body: { quantity }
  });
}

/* Törlés */
export async function deleteOrderItem(orderId, itemId) {
  return request(`/orders/${orderId}/items/${itemId}`, {
    method: "DELETE"
  });
}
