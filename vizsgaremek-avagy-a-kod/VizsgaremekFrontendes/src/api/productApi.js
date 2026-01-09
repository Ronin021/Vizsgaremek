import { request } from "./client.js";

export async function getProducts() {
  return request("/api/products");
}

export async function getProductById(id) {
  return request(`/api/products/${id}`);
}

export async function getProductsByCategory(categoryId) {
  return request(`/api/products?category_id=${categoryId}`);
}
