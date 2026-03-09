-- Migráció: image mező kiterjesztése LONGTEXT-re (több kép támogatásához)
-- Futtasd ezt, ha már van meglévő adatbázisod!

ALTER TABLE `products` MODIFY COLUMN `image` LONGTEXT DEFAULT NULL;

-- Opcionális: meglévő egyedi URL-ek átalakítása JSON tömbbé
-- UPDATE `products` SET `image` = CONCAT('["', `image`, '"]') WHERE `image` IS NOT NULL AND `image` != '' AND `image` NOT LIKE '[%';
