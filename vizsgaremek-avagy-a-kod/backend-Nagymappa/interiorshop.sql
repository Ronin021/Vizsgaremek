-- InteriorShop adatbázis séma + mintaadatok

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'Nappali'),
(2, 'Hálószoba'),
(3, 'Étkező'),
(4, 'Dekoráció'),
(5, 'Világítás');

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `total_price` int(11) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `payment_method` varchar(50) DEFAULT NULL,
  `shipping_address` varchar(500) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `customer_first_name` varchar(100) DEFAULT NULL,
  `customer_last_name` varchar(100) DEFAULT NULL,
  `customer_email` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

INSERT INTO `orders` (`id`, `user_id`, `total_price`, `date`, `status`, `payment_method`, `shipping_address`, `phone`) VALUES
(1, 1, 289900, '2025-10-15', 'Kiszállítva', NULL, NULL, NULL),
(2, 2, 549900, '2025-10-14', 'Feldolgozás alatt', NULL, NULL, NULL),
(3, 3, 124900, '2025-10-13', 'Szállítás alatt', NULL, NULL, NULL),
(4, NULL, 0, '2026-02-11', 'Kosár', 'Utánvét', '', ''),
(5, NULL, 0, '2026-02-11', 'Kosár', 'Utánvét', '', ''),
(6, NULL, 134700, '2026-02-11', 'Feldolgozás alatt', 'Bankkártya', 'asd, 1404 asd', ''),
(7, NULL, 134700, '2026-02-11', 'Feldolgozás alatt', 'Utánvét', ',  ', ''),
(8, NULL, 134700, '2026-02-11', 'Feldolgozás alatt', 'Utánvét', 'asd, 1010 asd', 'asdad'),
(9, 5, 449500, '2026-02-11', 'Feldolgozás alatt', 'Utánvét', 'ASD, 1111 DSA', '1111'),
(10, 5, 539400, '2026-02-11', 'Feldolgozás alatt', 'Utánvét', 'AAA, 0000 BBB', '0000'),
(11, 8, 524600, '2026-02-11', 'Feldolgozás alatt', 'Utánvét', 'RTA, 0101 TRA', '0101'),
(12, 8, 549000, '2026-02-11', 'Feldolgozás alatt', 'Utánvét', 'ASD, 1010 ASD', '1010'),
(13, 9, 2458000, '2026-02-11', 'Feldolgozás alatt', 'Utánvét', 'Kinidzsi utca 67, 6035 Szegvar', '+36305543835'),
(14, 10, 209700, '2026-02-11', 'Feldolgozás alatt', 'Utánvét', 'RityiRotyi utca 67, 6767 Bugyrosalsoujfalu', '0620707010'),
(15, 10, 2639200, '2026-02-11', 'Feldolgozás alatt', 'Utánvét', ',  ', ''),
(16, 5, 399700, '2026-02-13', 'Feldolgozás alatt', 'Utánvét', 'asd, 1214 asda', '132404');

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `quantity`) VALUES
(1, 1, 1, 1),
(2, 2, 1, 1),
(3, 2, 2, 2),
(4, 3, 9, 1),
(11, 5, 10, 1),
(12, 5, 10, 1),
(13, 5, 9, 1),
(14, 5, 9, 1),
(15, 5, 9, 1),
(16, 9, 9, 2),
(17, 9, 9, 2),
(18, 9, 9, 1),
(19, 9, 9, 1),
(24, 11, 6, 1),
(25, 11, 6, 1),
(26, 11, 6, 1),
(27, 11, 6, 1),
(28, 11, 6, 1),
(29, 11, 6, 1),
(30, 11, 6, 1),
(31, 11, 6, 1),
(32, 11, 6, 1),
(33, 11, 6, 1),
(45, 12, 9, 5),
(46, 12, 10, 5),
(52, 13, 5, 3),
(53, 13, 4, 16),
(54, 13, 3, 1),
(63, 14, 5, 3),
(66, 15, 9, 1),
(69, 16, 10, 1),
(70, 16, 9, 1),
(71, 16, 1, 1);

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `price` int(11) NOT NULL,
  `description` text DEFAULT NULL,
  `stock` int(11) DEFAULT 50,
  `image` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

INSERT INTO `products` (`id`, `name`, `category_id`, `price`, `description`, `stock`, `image`) VALUES
(1, 'Modern Kanapé', 1, 289900, 'Prémium minőségű, modern stílusú ülőgarnitúra', 50, '["https://img5.su-cdn.com/cdn-cgi/image/width=750,height=750/mall/file/2021/08/12/e1262e7d0fd94f1d8148fccd5717acbb.jpg"]'),
(2, 'Skandináv Fotel', 1, 159900, 'Kényelmes, letisztult fotel', 20, '["https://cdn.sicaan.com/products/STW-000287/STW-000287-main_image_web-fa1b70e3d18d4b36ad1150d155bc6974.jpg"]'),
(3, 'Tölgyfa Étkezőasztal', 3, 329900, 'Tömör fa étkezőasztal - 6 személyes', 9, '["https://res.cloudinary.com/castlery/image/private/w_1995,f_auto,q_auto,c_fit/v1705909062/crusader/variants/41960029/Vincent-Dining-Table-With-6-Dining-Chair-Walnut-Square-Set_2-1705909059.jpg"]'),
(4, 'Étkezőszék szett (4db)', 3, 119900, 'Modern étkezőszékek 4 darabos kiszerelésben', 17, '["https://www.laura-james.co.uk/cdn/shop/files/grey-chairs-willow-black_1.jpg?v=1753183886&width=1946"]'),
(5, 'Minimal Éjjeliszekrény', 2, 69900, 'Egyszerű, skandináv éjjeliszekrény', 23, '["https://s13emagst.akamaized.net/products/55850/55849729/images/res_bc0cf9a0e7001a28fe4c15f2e13f0b8e.jpg"]'),
(6, 'King Size Ágykeret', 2, 359900, 'Elegáns ágykeret 180x200 cm', 6, '["https://i5.walmartimages.com/seo/Allewie-King-Size-Bed-Frame-with-4-Storage-Drawers-and-Button-Tufted-Wingback-Headboard-Dark-Grey_a1a84cb1-c5a5-4c89-838e-1986076671fb.862a8ea902c1a0d44e66089abb4ef462.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF"]'),
(7, 'Falióra Loft Style', 4, 24900, 'Indusztriális stílusú fém falióra', 50, '["https://m.media-amazon.com/images/I/61MV6vEET9L._AC_UF894,1000_QL80_.jpg"]'),
(8, 'LED állólámpa', 5, 79900, 'Modern design állólámpa - melegfényű', 32, '["https://media.valuelights.co.uk/image/upload/t_vlpdp2/v1234567890/26271_DLIFE"]'),
(9, 'Szürke szőnyeg 200x300', 1, 89900, 'Nagyméretű nappali szőnyeg', 15, '["https://m.media-amazon.com/images/I/81sEoi+iytL._AC_UF894,1000_QL80_.jpg"]'),
(10, 'Dekorációs növény', 4, 19900, 'Műnövény kerámia kaspóban', 30, '["https://minimum-design.com/cdn/shop/collections/planters-minimum-design.jpg?v=1697535684&width=2048"]');

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL,
  `text` text DEFAULT NULL,
  `created_at` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

INSERT INTO `reviews` (`id`, `product_id`, `user_id`, `rating`, `text`, `created_at`) VALUES
(1, 1, 1, 5, 'Gigászi jó! Brutál kényelmes!', '2025-10-15'),
(2, 1, 2, 3, 'Közepes, de ár-érték arány rendben van.', '2025-10-14'),
(3, 2, 3, 4, 'Nagyon kényelmes, jól néz ki.', '2025-11-02'),
(4, 4, 1, 5, 'Szuper minőség, ajánlom!', '2025-11-06');

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `is_admin` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `is_admin`) VALUES
(1, 'Kiss', 'János', 'janos@example.com', 'janos123', 0),
(2, 'Nagy', 'Anna', 'anna@example.com', 'anna123', 0),
(3, 'Kovács', 'Péter', 'peter@example.com', 'peter123', 0),
(4, 'Admin', 'Admin', 'admin@example.com', 'admin123', 1),
(5, 'asd', 'asd', 'wrabel.boti@gmail.com', 'asd', 0),
(6, 'Teljes Nev', 'Vezeteknev', 'wraabel.boti@gmail.com', 'asd', 0),
(7, 'A', 'B', 'wraaabel.boti@gmail.com', 'asd', 0),
(8, 'AAA', 'BBB', 'aaa@gmail.com', 'asd', 0),
(9, 'Milan', 'Szojka', 'milanstricije@gmail.com', 'asd', 0),
(10, 'Anita', 'Bencsik', 'wraaaabel.boti@gmail.com', 'asd', 0);

ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `user_id` (`user_id`);

ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);

ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- Meglévő adatbázis frissítés: a products.image oszlop maradjon LONGTEXT (több kép JSON tömb támogatás)
ALTER TABLE `products` MODIFY COLUMN `image` LONGTEXT DEFAULT NULL;

