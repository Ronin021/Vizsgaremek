import pool from '../db';
import { Order } from '../models/Order';
import { OrderDto } from '../dto/orderDto';

let customerColumnsReady = false;

const ensureCustomerColumns = async (): Promise<void> => {
  if (customerColumnsReady) return;

  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query(
      `SELECT COLUMN_NAME
       FROM INFORMATION_SCHEMA.COLUMNS
       WHERE TABLE_SCHEMA = DATABASE()
         AND TABLE_NAME = 'orders'
         AND COLUMN_NAME IN ('customer_first_name', 'customer_last_name', 'customer_email')`
    );

    const existing = new Set((rows as Array<{ COLUMN_NAME: string }>).map((r) => r.COLUMN_NAME));

    if (!existing.has('customer_first_name')) {
      await connection.query("ALTER TABLE orders ADD COLUMN customer_first_name VARCHAR(100) DEFAULT NULL");
    }
    if (!existing.has('customer_last_name')) {
      await connection.query("ALTER TABLE orders ADD COLUMN customer_last_name VARCHAR(100) DEFAULT NULL");
    }
    if (!existing.has('customer_email')) {
      await connection.query("ALTER TABLE orders ADD COLUMN customer_email VARCHAR(200) DEFAULT NULL");
    }

    customerColumnsReady = true;
  } finally {
    connection.release();
  }
};

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
  await ensureCustomerColumns();
  const connection = await pool.getConnection();
  // A checkout adatai is ebbe a táblába kerülnek, ezért minden rendelési mezőt itt mentünk.
  const [result] = await connection.query(
    'INSERT INTO orders (user_id, total_price, date, status, payment_method, shipping_address, phone, customer_first_name, customer_last_name, customer_email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [
      order.user_id,
      order.total_price,
      order.date,
      order.status,
      order.payment_method,
      order.shipping_address,
      order.phone,
      order.customer_first_name || '',
      order.customer_last_name || '',
      order.customer_email || '',
    ]
  );
  connection.release();
  return (result as any).insertId;
};

// Rendelés frissítése
export const updateOrder = async (id: number, order: OrderDto): Promise<boolean> => {
  await ensureCustomerColumns();
  const connection = await pool.getConnection();
  // Az affectedRows alapján jelezzük vissza, hogy ténylegesen létezett-e frissíthető rekord.
  const [result] = await connection.query(
    'UPDATE orders SET user_id = ?, total_price = ?, date = ?, status = ?, payment_method = ?, shipping_address = ?, phone = ?, customer_first_name = ?, customer_last_name = ?, customer_email = ? WHERE id = ?',
    [
      order.user_id,
      order.total_price,
      order.date,
      order.status,
      order.payment_method,
      order.shipping_address,
      order.phone,
      order.customer_first_name || '',
      order.customer_last_name || '',
      order.customer_email || '',
      id,
    ]
  );
  connection.release();
  return (result as any).affectedRows > 0;
};

// Rendelés törlése
export const deleteOrder = async (id: number): Promise<boolean> => {
  const connection = await pool.getConnection();
  try {
    // Előbb az order_items-eket törlöm (FK constraint miatt)
    await connection.query('DELETE FROM order_items WHERE order_id = ?', [id]);
    // Utána az order-t
    const [result] = await connection.query('DELETE FROM orders WHERE id = ?', [id]);
    connection.release();
    return (result as any).affectedRows > 0;
  } catch (error) {
    connection.release();
    throw error;
  }
};
