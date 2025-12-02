
# Vizsgaremek Backend

Express.js + TypeScript + MySQL vizsgaremek backend az Interior Shop alkalmazáshoz.

## Gyors start

### 1. Telepítés
```bash
npm install
```

### 2. Adatbázis beállítása
```bash
mysql -u root < vizsgaremek.sql
```

### 3. Environment beállítása
```bash
cp .env.example .env
# Szerkeszd az .env fájlt a saját adatbázis adataiddal
```

### 4. Futtatás fejlesztésben
```bash
npm run build  # TypeScript fordítása
node lib/index.js  # Server indítása
```

Vagy egyben:
```bash
npx ts-node src/index.ts
```

## API Dokumentáció

Teljes dokumentáció: [DOKUMENTACIO.txt](./DOKUMENTACIO.txt)

### Fő végpontok

| HTTP | URL | Leírás |
|------|-----|--------|
| GET | `/api/products` | Összes termék |
| GET | `/api/categories` | Összes kategória |
| GET | `/api/users` | Összes felhasználó |
| GET | `/api/orders` | Összes rendelés |
| GET | `/api/orderItems` | Összes rendelési tétel |
| POST | `/api/products` | Új termék hozzáadása |
| PUT | `/api/products/:id` | Termék módosítása |
| DELETE | `/api/products/:id` | Termék törlése |

## Projekt szerkezet

```
src/
├── controllers/     → Kérések kezelése
├── services/        → Adatbázis logika
├── routes/          → API végpontok
├── models/          → Adatstruktúrák
├── dto/             → Adatátvitel
├── middleware/      → Auth, error handling
├── utils/           → Helper funkciók
└── tests/           → Tesztek
```

## Technológiák

- Express.js - HTTP keretrendszer
- TypeScript - Típusossághoz
- MySQL2 - Adatbázis
- CORS - Cross-origin

## Fejlesztés

### Új endpoint hozzáadása

1. Model létrehozása (`models/`)
2. Service megírása (`services/`)
3. Controller írása (`controllers/`)
4. Route-ot hozzáadni (`routes/`)
5. `app.ts`-ben regisztrálni

## Checkpoint 1 ✅

- ✅ Alap CRUD műveletek
- ✅ Adatbázis kapcsolat
- ✅ API végpontok
- ✅ Error handling

## Checkpoint 2 (Kitervezett)

- ⏳ Authentikáció (JWT)
- ⏳ Input validáció
- ⏳ Tesztek
- ⏳ Admin panel
