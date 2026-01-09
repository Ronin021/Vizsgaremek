# Interior Shop Backend - API Dokumentáció

## Telepítés

```bash
npm install
```

## Fejlesztés indítása

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Termelés

```bash
npm start
```

---

## API Endpoints

### Health Check
- **GET** `/api/health` - Backend státusz ellenőrzés

---

## Auth Endpoints

### Regisztráció
- **POST** `/api/auth/register`
- Body:
```json
{
  "first_name": "János",
  "last_name": "Kiss",
  "email": "janos@example.com",
  "password": "jelszó123"
}
```
- Response: `{ token, userId, user }`

### Bejelentkezés
- **POST** `/api/auth/login`
- Body:
```json
{
  "email": "janos@example.com",
  "password": "jelszó123"
}
```
- Response: `{ token, user }`

### Aktuális felhasználó (Protected)
- **GET** `/api/auth/me`
- Header: `Authorization: Bearer <token>`
- Response: `{ id, first_name, last_name, email }`

---

## Termékek (Products)

### Összes termék lekérése
- **GET** `/api/products`
- Response: `Product[]`

### Egy termék lekérése
- **GET** `/api/products/:id`
- Response: `Product`

### Új termék hozzáadása
- **POST** `/api/products`
- Body: `ProductDto`
- Response: `{ id, message }`

### Termék frissítése
- **PUT** `/api/products/:id`
- Body: `ProductDto`
- Response: `{ message }`

### Termék törlése
- **DELETE** `/api/products/:id`
- Response: `{ message }`

---

## Kategóriák (Categories)

### Összes kategória
- **GET** `/api/categories`
- Response: `Category[]`

### Egy kategória
- **GET** `/api/categories/:id`
- Response: `Category`

### Új kategória hozzáadása
- **POST** `/api/categories`
- Body: `{ name }`
- Response: `{ id, message }`

### Kategória frissítése
- **PUT** `/api/categories/:id`
- Body: `{ name }`
- Response: `{ message }`

### Kategória törlése
- **DELETE** `/api/categories/:id`
- Response: `{ message }`

---

## Rendelések (Orders) - Protected Routes

### Összes rendelés
- **GET** `/api/orders`
- Header: `Authorization: Bearer <token>`
- Response: `Order[]`

### Egy rendelés
- **GET** `/api/orders/:id`
- Header: `Authorization: Bearer <token>`
- Response: `Order`

### Felhasználó rendelései
- **GET** `/api/orders/user/:userId`
- Header: `Authorization: Bearer <token>`
- Response: `Order[]`

### Új rendelés
- **POST** `/api/orders`
- Header: `Authorization: Bearer <token>`
- Body: `OrderDto`
- Response: `{ id, message }`

### Rendelés frissítése
- **PUT** `/api/orders/:id`
- Header: `Authorization: Bearer <token>`
- Body: `OrderDto`
- Response: `{ message }`

### Rendelés törlése
- **DELETE** `/api/orders/:id`
- Header: `Authorization: Bearer <token>`
- Response: `{ message }`

---

## Rendelési tételek (Order Items) - Protected Routes

### Összes tétel
- **GET** `/api/order-items`
- Header: `Authorization: Bearer <token>`
- Response: `OrderItem[]`

### Egy tétel
- **GET** `/api/order-items/:id`
- Header: `Authorization: Bearer <token>`
- Response: `OrderItem`

### Rendeléshez tartozó tételek
- **GET** `/api/order-items/order/:orderId`
- Header: `Authorization: Bearer <token>`
- Response: `OrderItem[]`

### Új tétel hozzáadása
- **POST** `/api/order-items`
- Header: `Authorization: Bearer <token>`
- Body: `OrderItemDto`
- Response: `{ id, message }`

### Tétel frissítése
- **PUT** `/api/order-items/:id`
- Header: `Authorization: Bearer <token>`
- Body: `OrderItemDto`
- Response: `{ message }`

### Tétel törlése
- **DELETE** `/api/order-items/:id`
- Header: `Authorization: Bearer <token>`
- Response: `{ message }`

---

## Bejelentkezés nélküli (Public) Routes

- `GET /api/health`
- `GET /api/products` - összes termék
- `GET /api/products/:id` - egy termék
- `GET /api/categories` - összes kategória
- `GET /api/categories/:id` - egy kategória
- `POST /api/auth/register` - regisztráció
- `POST /api/auth/login` - bejelentkezés

## Bejelentkezéssel (Protected) Szükséges Routes

- Minden `/api/orders` route
- Minden `/api/order-items` route
- `GET /api/auth/me`

---

## Environment Változók

```
DB_HOST=localhost           # MySQL host
DB_USER=root               # MySQL user
DB_PASSWORD=               # MySQL password
DB_NAME=interiorshop       # Database name
JWT_SECRET=your-secret     # JWT titkos kulcs
PORT=3000                  # Server port
FRONTEND_URL=...           # Frontend URL (CORS)
NODE_ENV=development       # Fejlesztési/termelési mód
```

---

## Hiba Kezelés

Az API JSON formátumban ad vissza hibákat:

```json
{
  "error": "Hibaleírás",
  "status": 400
}
```

Közös HTTP státusz kódok:
- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `409` - Conflict
- `500` - Server Error

---

## Frontend Integrációs Tippek

### Token Tárolása
```javascript
// Bejelentkezés után
localStorage.setItem('token', response.token);
```

### API Kérések
```javascript
const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('token')}`
};
```

### CORS
Az API már konfigurálva van CORS-hoz az `http://localhost:5173` címről (Vite dev szerver).
