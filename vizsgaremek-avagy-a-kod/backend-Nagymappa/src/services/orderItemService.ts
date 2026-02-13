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

// Rendeléshez tartozó tételek lekérése (JOIN products — frontend i.product.price-t vár)
export const getOrderItemsByOrderId = async (orderId: number): Promise<any[]> => {
  const connection = await pool.getConnection();
  const [rows] = await connection.query(
    `SELECT oi.id, oi.order_id, oi.product_id, oi.quantity,
            p.id AS p_id, p.name AS p_name, p.price AS p_price,
            p.description AS p_description, p.stock AS p_stock,
            p.category_id AS p_category_id, p.image AS p_image
     FROM order_items oi
     LEFT JOIN products p ON oi.product_id = p.id
     WHERE oi.order_id = ?`,
    [orderId]
  );
  connection.release();

  return (rows as any[]).map(r => ({
    id: r.id,
    order_id: r.order_id,
    product_id: r.product_id,
    quantity: r.quantity,
    product: {
      id: r.p_id,
      name: r.p_name,
      price: r.p_price,
      description: r.p_description,
      stock: r.p_stock,
      category_id: r.p_category_id,
      image: r.p_image,
    }
  }));
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

// Rendelési tétel frissítése (teljes)
export const updateOrderItem = async (id: number, orderId: number, productId: number, quantity: number): Promise<boolean> => {
  const connection = await pool.getConnection();
  const [result] = await connection.query(
    'UPDATE order_items SET order_id = ?, product_id = ?, quantity = ? WHERE id = ?',
    [orderId, productId, quantity, id]
  );
  connection.release();
  return (result as any).affectedRows > 0;
};

// Csak mennyiség frissítése
export const updateOrderItemQuantity = async (id: number, quantity: number): Promise<boolean> => {
  const connection = await pool.getConnection();
  const [result] = await connection.query(
    'UPDATE order_items SET quantity = ? WHERE id = ?',
    [quantity, id]
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
