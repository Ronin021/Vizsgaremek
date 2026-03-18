import pool from '../db';
import { Order } from '../models/Order';
import { OrderDto } from '../dto/orderDto';

// Összes rendelés lekérése
export const getAllOrders = async (): Promise<Order[]> => {
  // Minden művelet külön connectiont kér, majd a végén visszaadja a poolnak.
  const connection = await pool.getConnection();
  const [rows] = await connection.query('SELECT * FROM orders');
  connection.release();
  return rows as Order[];
};

// Egy rendelés lekérése ID alapján
export const getOrderById = async (id: number): Promise<Order | null> => {
  const connection = await pool.getConnection();
  const [rows] = await connection.query('SELECT * FROM orders WHERE id = ?', [id]);
  connection.release();
  const orders = rows as Order[];
  return orders.length > 0 ? orders[0] : null;
};

// Felhasználó rendeléseit lekérése
export const getOrdersByUserId = async (userId: number): Promise<Order[]> => {
  const connection = await pool.getConnection();
  const [rows] = await connection.query('SELECT * FROM orders WHERE user_id = ?', [userId]);
  connection.release();
  return rows as Order[];
};

// Új rendelés hozzáadása
export const createOrder = async (order: OrderDto): Promise<number> => {
  const connection = await pool.getConnection();
  // A checkout adatai is ebbe a táblába kerülnek, ezért minden rendelési mezőt itt mentünk.
  const [result] = await connection.query(
    'INSERT INTO orders (user_id, total_price, date, status, payment_method, shipping_address, phone) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [order.user_id, order.total_price, order.date, order.status, order.payment_method, order.shipping_address, order.phone]
  );
  connection.release();
  return (result as any).insertId;
};

// Rendelés frissítése
export const updateOrder = async (id: number, order: OrderDto): Promise<boolean> => {
  const connection = await pool.getConnection();
  // Az affectedRows alapján jelezzük vissza, hogy ténylegesen létezett-e frissíthető rekord.
  const [result] = await connection.query(
    'UPDATE orders SET user_id = ?, total_price = ?, date = ?, status = ?, payment_method = ?, shipping_address = ?, phone = ? WHERE id = ?',
    [order.user_id, order.total_price, order.date, order.status, order.payment_method, order.shipping_address, order.phone, id]
  );
  connection.release();
  return (result as any).affectedRows > 0;
};

// Rendelés törlése
export const deleteOrder = async (id: number): Promise<boolean> => {
  const connection = await pool.getConnection();
  const [result] = await connection.query('DELETE FROM orders WHERE id = ?', [id]);
  connection.release();
  return (result as any).affectedRows > 0;
};
