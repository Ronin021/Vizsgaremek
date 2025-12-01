CREATE TABLE categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    category_id INT,
    price INT NOT NULL,
    description TEXT,
    stock INT DEFAULT 50,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(200) UNIQUE,
    password_hash VARCHAR(255)
);

--MÉG NINCS BENT DE LEHET LESZ EZ A TÁBLA IS
CREATE TABLE reviews (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT,
    user_id INT,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    text TEXT,
    created_at DATE,
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    total_price INT,
    date DATE,
    status VARCHAR(50),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE order_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT,
    product_id INT,
    quantity INT,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);
INSERT INTO categories (name) VALUES
("Nappali"),
("Hálószoba"),
("Étkező"),
("Dekoráció"),
("Világítás");

INSERT INTO products (name, category_id, price, description, stock) VALUES
("Modern Kanapé", 1, 289900, "Prémium minőségű, modern stílusú ülőgarnitúra", 14),
("Skandináv Fotel", 1, 159900, "Kényelmes, letisztult fotel", 20),
("Tölgyfa Étkezőasztal", 3, 329900, "Tömör fa étkezőasztal — 6 személyes", 9),
("Étkezőszék szett (4db)", 3, 119900, "Modern étkezőszékek 4 darabos kiszerelésben", 17),
("Minimal Éjjeliszekrény", 2, 69900, "Egyszerű, skandináv éjjeliszekrény", 23),
("King Size Ágykeret", 2, 359900, "Elegáns ágykeret 180x200 cm", 6),
("Falióra Loft Style", 4, 24900, "Indusztriális stílusú fém falióra", 50),
("LED állólámpa", 5, 79900, "Modern design állólámpa – melegfényű", 32),
("Szürke szőnyeg 200x300", 1, 89900, "Nagyméretű nappali szőnyeg", 15),
("Dekorációs növény", 4, 19900, "Műnövény kerámia kaspóban", 30);

INSERT INTO users (first_name, last_name, email, password_hash) VALUES
("Kiss", "János", "janos@example.com", "hash1"),
("Nagy", "Anna", "anna@example.com", "hash2"),
("Kovács", "Péter", "peter@example.com", "hash3");



--MÉG NINCS BENT DE LEHET LESZ EZ A TÁBLA IS
INSERT INTO reviews (product_id, user_id, rating, text, created_at) VALUES
(1, 1, 5, "Gigászian jó! Brutál kényelmes!", "2025-10-15"),
(1, 2, 3, "Közepes, de ár-érték arány rendben van.", "2025-10-14"),
(2, 3, 4, "Nagyon kényelmes, jól néz ki.", "2025-11-02"),
(4, 1, 5, "Szuper minőség, ajánlom!", "2025-11-06");

INSERT INTO orders (user_id, total_price, date, status) VALUES
(1, 289900, "2025-10-15", "Kiszállítva"),
(2, 549900, "2025-10-14", "Feldolgozás alatt"),
(3, 124900, "2025-10-13", "Szállítás alatt");

INSERT INTO order_items (order_id, product_id, quantity) VALUES
(1, 1, 1),
(2, 1, 1),
(2, 2, 2),
(3, 9, 1);
