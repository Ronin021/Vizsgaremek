
import { request } from "./client.js";

// TELJES KOSÁR LEKÉRÉSE
export function getCart() {
  return request("/api/cart");
}

// ÚJ TÉTEL HOZZÁADÁSA
export function addCartItem(productId, quantity = 1) {
  return request("/api/cart", {
    method: "POST",
    body: JSON.stringify({ productId, quantity }),
  });
}

// MENNYISÉG MÓDOSÍTÁSA
export function updateCartItem(itemId, quantity) {
  return request(`/api/cart/${itemId}`, {
    method: "PATCH",
    body: JSON.stringify({ quantity }),
  });
}

// TÉTEL TÖRLÉSE
export function deleteCartItem(itemId) {
  return request(`/api/cart/${itemId}`, {
    method: "DELETE",
  });
}

// KOSÁR ÜRÍTÉSE
export function clearCartApi() {
  return request("/api/cart", {
    method: "DELETE",
  });
}
