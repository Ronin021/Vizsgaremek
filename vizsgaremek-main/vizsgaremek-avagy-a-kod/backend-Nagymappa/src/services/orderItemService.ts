import pool from '../db';
import { OrderItem } from '../models/OrderItem';

// Összes rendelési tétel lekérése
export const getAllOrderItems = async (): Promise<OrderItem[]> => {
  const connection = await pool.getConnection();
  const [rows] = await connection.query('SELECT * FROM order_items');
  connection.release();
  return rows as OrderItem[];
};

// Egy rendelési tétel lekérése ID alapján
export const getOrderItemById = async (id: number): Promise<OrderItem | null> => {
  const connection = await pool.getConnection();
  const [rows] = await connection.query('SELECT * FROM order_items WHERE id = ?', [id]);
  connection.release();
  const items = rows as OrderItem[];
  return items.length > 0 ? items[0] : null;
};

// Rendeléshez tartozó tételek lekérése
export const getOrderItemsByOrderId = async (orderId: number): Promise<OrderItem[]> => {
  const connection = await pool.getConnection();
  const [rows] = await connection.query('SELECT * FROM order_items WHERE order_id = ?', [orderId]);
  connection.release();
  return rows as OrderItem[];
};

// Új rendelési tétel hozzáadása
export const createOrderItem = async (orderId: number, productId: number, quantity: number): Promise<number> => {
  const connection = await pool.getConnection();
  const [result] = await connection.query(
    'INSERT INTO order_items (order_id, product_id, quantity) VALUES (?, ?, ?)',
    [orderId, productId, quantity]
  );
  connection.release();
  return (result as any).insertId;
};

// Rendelési tétel frissítése
export const updateOrderItem = async (id: number, orderId: number, productId: number, quantity: number): Promise<boolean> => {
  const connection = await pool.getConnection();
  const [result] = await connection.query(
    'UPDATE order_items SET order_id = ?, product_id = ?, quantity = ? WHERE id = ?',
    [orderId, productId, quantity, id]
  );
  connection.release();
  return (result as any).affectedRows > 0;
};

// Rendelési tétel törlése
export const deleteOrderItem = async (id: number): Promise<boolean> => {
  const connection = await pool.getConnection();
  const [result] = await connection.query('DELETE FROM order_items WHERE id = ?', [id]);
  connection.release();
  return (result as any).affectedRows > 0;
};
