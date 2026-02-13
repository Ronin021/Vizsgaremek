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
    let errorMessage = "Ismeretlen hiba történt";

    // Próbáljuk meg kiolvasni a backend üzenetét
    if (ct.includes("application/json")) {
      const data = await response.json();
      errorMessage = data.error || data.message || errorMessage;
    } else {
      errorMessage = await response.text();
    }

    // Felhasználóbarát üzenetek specifikus hibakódokhoz
    if (response.status === 401) {
      errorMessage = "Hibás e-mail cím vagy jelszó.";
    } else if (response.status === 403) {
      errorMessage = "Nincs jogosultságod ehhez a művelethez.";
    } else if (response.status === 404) {
      errorMessage = "A keresett erőforrás nem található.";
    } else if (response.status === 409) {
      errorMessage = "Ez az e-mail cím már regisztrálva van.";
    } else if (response.status >= 500) {
      errorMessage = "Szerverhiba történt. Kérjük, próbáld újra később.";
    }

    throw new Error(errorMessage);
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
