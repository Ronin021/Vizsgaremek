import pool from '../db';
import { Product } from '../models/Product';
import { ProductDto } from '../dto/productDto';

// Összes termék lekérése
export const getAllProducts = async (): Promise<Product[]> => {
  const connection = await pool.getConnection();
  const [rows] = await connection.query('SELECT * FROM products');
  connection.release();
  return rows as Product[];
};

// Egy termék lekérése ID alapján
export const getProductById = async (id: number): Promise<Product | null> => {
  const connection = await pool.getConnection();
  const [rows] = await connection.query('SELECT * FROM products WHERE id = ?', [id]);
  connection.release();
  const products = rows as Product[];
  return products.length > 0 ? products[0] : null;
};

// Új termék hozzáadása
export const createProduct = async (product: ProductDto): Promise<number> => {
  const connection = await pool.getConnection();
  const [result] = await connection.query(
    'INSERT INTO products (name, category_id, price, description, stock) VALUES (?, ?, ?, ?, ?)',
    [product.name, product.category_id, product.price, product.description, product.stock]
  );
  connection.release();
  return (result as any).insertId;
};

// Termék frissítése
export const updateProduct = async (id: number, product: ProductDto): Promise<boolean> => {
  const connection = await pool.getConnection();
  const [result] = await connection.query(
    'UPDATE products SET name = ?, category_id = ?, price = ?, description = ?, stock = ? WHERE id = ?',
    [product.name, product.category_id, product.price, product.description, product.stock, id]
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
