CREATE TABLE IF NOT EXISTS categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

CREATE TABLE IF NOT EXISTS products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    category_id INT,
    price INT NOT NULL,
    description TEXT,
    stock INT DEFAULT 50,
    FOREIGN KEY (category_id) REFERENCES categories(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(200) UNIQUE,
    password VARCHAR(255),
    -- is_admin: 1 = admin, 0 = regular user
    is_admin TINYINT(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- MÉG NINCS BENT DE LEHET LESZ EZ A TÁBLA IS
CREATE TABLE IF NOT EXISTS reviews (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT,
    user_id INT,
    -- MariaDB/MySQL (XAMPP) kompatibilitás: CHECK constraint nem megbízható régi verziókon
    rating INT,
    text TEXT,
    created_at DATE,
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

CREATE TABLE IF NOT EXISTS orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    total_price INT,
    date DATE,
    status VARCHAR(50),
    FOREIGN KEY (user_id) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

CREATE TABLE IF NOT EXISTS order_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT,
    product_id INT,
    quantity INT,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;
INSERT INTO categories (name) VALUES
('Nappali'),
('Hálószoba'),
('Étkező'),
('Dekoráció'),
('Világítás');

INSERT INTO products (name, category_id, price, description, stock) VALUES
('Modern Kanapé', 1, 289900, 'Prémium minőségű, modern stílusú ülőgarnitúra', 14),
('Skandináv Fotel', 1, 159900, 'Kényelmes, letisztult fotel', 20),
('Tölgyfa Étkezőasztal', 3, 329900, 'Tömör fa étkezőasztal — 6 személyes', 9),
('Étkezőszék szett (4db)', 3, 119900, 'Modern étkezőszékek 4 darabos kiszerelésben', 17),
('Minimal Éjjeliszekrény', 2, 69900, 'Egyszerű, skandináv éjjeliszekrény', 23),
('King Size Ágykeret', 2, 359900, 'Elegáns ágykeret 180x200 cm', 6),
('Falióra Loft Style', 4, 24900, 'Indusztriális stílusú fém falióra', 50),
('LED állólámpa', 5, 79900, 'Modern design állólámpa – melegfényű', 32),
('Szürke szőnyeg 200x300', 1, 89900, 'Nagyméretű nappali szőnyeg', 15),
('Dekorációs növény', 4, 19900, 'Műnövény kerámia kaspóban', 30);

-- Seed user jelszavak (SHA-256 a backendben):
-- janos@example.com / janos123
-- anna@example.com / anna123
-- peter@example.com / peter123
-- admin@example.com / admin123

INSERT INTO users (first_name, last_name, email, password, is_admin) VALUES
('Kiss', 'János', 'janos@example.com', 'janos123', 0),
('Nagy', 'Anna', 'anna@example.com', 'anna123', 0),
('Kovács', 'Péter', 'peter@example.com', 'peter123', 0),
('Admin', 'Admin', 'admin@example.com', 'admin123', 1);



-- MÉG NINCS BENT DE LEHET LESZ EZ A TÁBLA IS
INSERT INTO reviews (product_id, user_id, rating, text, created_at) VALUES
(1, 1, 5, 'Gigászian jó! Brutál kényelmes!', '2025-10-15'),
(1, 2, 3, 'Közepes, de ár-érték arány rendben van.', '2025-10-14'),
(2, 3, 4, 'Nagyon kényelmes, jól néz ki.', '2025-11-02'),
(4, 1, 5, 'Szuper minőség, ajánlom!', '2025-11-06');

INSERT INTO orders (user_id, total_price, date, status) VALUES
(1, 289900, "2025-10-15", "Kiszállítva"),
(2, 549900, "2025-10-14", "Feldolgozás alatt"),
(3, 124900, "2025-10-13", "Szállítás alatt");

INSERT INTO order_items (order_id, product_id, quantity) VALUES
(1, 1, 1),
(2, 1, 1),
(2, 2, 2),
(3, 9, 1);