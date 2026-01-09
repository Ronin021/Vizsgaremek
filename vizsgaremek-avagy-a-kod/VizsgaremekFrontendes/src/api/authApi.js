import { request } from "./client.js";

export async function login(email, password) {
  return request("/api/auth/login", {
    method: "POST",
    body: { email, password }
  });
}

export async function register(firstName, lastName, email, password) {
  return request("/api/auth/register", {
    method: "POST",
    body: {
      first_name: firstName,
      last_name: lastName,
      email,
      password
    }
  });
}

export function setToken(token) {
  localStorage.setItem("token", token);
}

export function getToken() {
  return localStorage.getItem("token");
}

export function removeToken() {
  localStorage.removeItem("token");
}

export function isAuthenticated() {
  return !!localStorage.getItem("token");
}
