import pool from '../db';
import { Category } from '../models/Category';

// Összes kategória lekérése
export const getAllCategories = async (): Promise<Category[]> => {
  const connection = await pool.getConnection();
  const [rows] = await connection.query('SELECT * FROM categories');
  connection.release();
  return rows as Category[];
};

// Egy kategória lekérése ID alapján
export const getCategoryById = async (id: number): Promise<Category | null> => {
  const connection = await pool.getConnection();
  const [rows] = await connection.query('SELECT * FROM categories WHERE id = ?', [id]);
  connection.release();
  const categories = rows as Category[];
  return categories.length > 0 ? categories[0] : null;
};

// Új kategória hozzáadása
export const createCategory = async (name: string): Promise<number> => {
  const connection = await pool.getConnection();
  const [result] = await connection.query('INSERT INTO categories (name) VALUES (?)', [name]);
  connection.release();
  return (result as any).insertId;
};

// Kategória frissítése
export const updateCategory = async (id: number, name: string): Promise<boolean> => {
  const connection = await pool.getConnection();
  const [result] = await connection.query('UPDATE categories SET name = ? WHERE id = ?', [name, id]);
  connection.release();
  return (result as any).affectedRows > 0;
};

// Kategória törlése
export const deleteCategory = async (id: number): Promise<boolean> => {
  const connection = await pool.getConnection();
  const [result] = await connection.query('DELETE FROM categories WHERE id = ?', [id]);
  connection.release();
  return (result as any).affectedRows > 0;
};
