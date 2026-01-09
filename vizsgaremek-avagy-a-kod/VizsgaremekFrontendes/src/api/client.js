// Backend origin (HTTPS dev server)
const BASE_URL = "http://localhost:3000";

export async function request(url, options = {}) {
  const finalUrl = BASE_URL + url;
  const token = localStorage.getItem("token");

  const config = {
    ...options,
    headers: {
      ...(options.headers || {}),
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  };

  if (config.body && typeof config.body === "object" && !(config.body instanceof FormData)) {
    config.body = JSON.stringify(config.body);
  }

  const response = await fetch(finalUrl, config);

  // Ha nem OK, próbáljuk kiolvasni értelmesen (JSON vagy text)
  if (!response.ok) {
    const ct = response.headers.get("content-type") || "";
    const payload = ct.includes("application/json")
      ? JSON.stringify(await response.json())
      : await response.text();

    throw new Error(`API Error ${response.status}: ${payload}`);
  }

  if (response.status === 204) return null;

  // Védelem: ha HTML jönne, lásd rögtön
  const ct = response.headers.get("content-type") || "";
  if (!ct.includes("application/json")) {
    const text = await response.text();
    throw new Error(`Expected JSON but got ${ct}. First chars: ${text.slice(0, 120)}`);
  }

  return response.json();
}
