const BASE_URL = "http://localhost:3000/api"; 


export async function request(url, options = {}) {
  const finalUrl = BASE_URL + url;

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  };


  if (config.body && typeof config.body === "object") {
    config.body = JSON.stringify(config.body);
  }

  const response = await fetch(finalUrl, config);

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`API Error ${response.status}: ${errText}`);
  }


  if (response.status === 204) return null;

  return response.json();
}
