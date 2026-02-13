import { request } from "./client.js";

// === PRODUCTS ===

export async function getProducts() {
  return request("/api/products");
}

export async function createProduct(productData) {
  return request("/api/products", {
    method: "POST",
    body: productData
  });
}

export async function updateProduct(id, productData) {
  return request(`/api/products/${id}`, {
    method: "PUT",
    body: productData
  });
}

export async function deleteProduct(id) {
  return request(`/api/products/${id}`, {
    method: "DELETE"
  });
}

// === ORDERS ===

export async function getAllOrders() {
  return request("/api/orders");
}

export async function updateOrderStatus(id, status) {
  return request(`/api/orders/${id}`, {
    method: "PUT",
    body: { status }
  });
}

// === CATEGORIES ===

export async function getCategories() {
  return request("/api/categories");
}

// === USERS (for order display) ===

export async function getUsers() {
  return request("/api/users");
}
