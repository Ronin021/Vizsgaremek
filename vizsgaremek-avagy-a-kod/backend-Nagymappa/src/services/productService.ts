import pool from '../db';
import { Product } from '../models/Product';
import { ProductDto } from '../dto/productDto';

// Összes termék lekérése
export const getAllProducts = async (): Promise<Product[]> => {
  const connection = await pool.getConnection();
  const [rows] = await connection.query(
    `SELECT p.*, c.name AS category_name 
     FROM products p 
     LEFT JOIN categories c ON p.category_id = c.id`
  );
  connection.release();
  return rows as Product[];
};

// Egy termék lekérése ID alapján
export const getProductById = async (id: number): Promise<Product | null> => {
  const connection = await pool.getConnection();
  const [rows] = await connection.query(
    `SELECT p.*, c.name AS category_name 
     FROM products p 
     LEFT JOIN categories c ON p.category_id = c.id 
     WHERE p.id = ?`,
    [id]
  );
  connection.release();
  const products = rows as Product[];
  return products.length > 0 ? products[0] : null;
};

// Új termék hozzáadása
export const createProduct = async (product: ProductDto): Promise<number> => {
  const connection = await pool.getConnection();
  const [result] = await connection.query(
    'INSERT INTO products (name, category_id, price, description, stock, image) VALUES (?, ?, ?, ?, ?, ?)',
    [product.name, product.category_id, product.price, product.description, product.stock, product.image || null]
  );
  connection.release();
  return (result as any).insertId;
};

// Termék frissítése
export const updateProduct = async (id: number, product: ProductDto): Promise<boolean> => {
  const connection = await pool.getConnection();
  const [result] = await connection.query(
    'UPDATE products SET name = ?, category_id = ?, price = ?, description = ?, stock = ?, image = ? WHERE id = ?',
    [product.name, product.category_id, product.price, product.description, product.stock, product.image || null, id]
  );
  connection.release();
  return (result as any).affectedRows > 0;
};

// Termék törlése
export const deleteProduct = async (id: number): Promise<boolean> => {
  const connection = await pool.getConnection();
  const [result] = await connection.query('DELETE FROM products WHERE id = ?', [id]);
  connection.release();
  return (result as any).affectedRows > 0;
};
