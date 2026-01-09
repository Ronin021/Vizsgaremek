import pool from '../db';
import { User } from '../models/User';
import { UserDto } from '../dto/userDto';

// Összes felhasználó lekérése
export const getAllUsers = async (): Promise<User[]> => {
  const connection = await pool.getConnection();
  const [rows] = await connection.query('SELECT * FROM users');
  connection.release();
  return rows as User[];
};

// Egy felhasználó lekérése ID alapján
export const getUserById = async (id: number): Promise<User | null> => {
  const connection = await pool.getConnection();
  const [rows] = await connection.query('SELECT * FROM users WHERE id = ?', [id]);
  connection.release();
  const users = rows as User[];
  return users.length > 0 ? users[0] : null;
};

// Felhasználó lekérése email alapján
export const getUserByEmail = async (email: string): Promise<User | null> => {
  const connection = await pool.getConnection();
  const [rows] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);
  connection.release();
  const users = rows as User[];
  return users.length > 0 ? users[0] : null;
};

// Új felhasználó hozzáadása
export const createUser = async (user: UserDto): Promise<number> => {
  const connection = await pool.getConnection();
  const [result] = await connection.query(
    'INSERT INTO users (first_name, last_name, email, password_hash) VALUES (?, ?, ?, ?)',
    [user.first_name, user.last_name, user.email, user.password_hash]
  );
  connection.release();
  return (result as any).insertId;
};

// Felhasználó frissítése
export const updateUser = async (id: number, user: UserDto): Promise<boolean> => {
  const connection = await pool.getConnection();
  const [result] = await connection.query(
    'UPDATE users SET first_name = ?, last_name = ?, email = ?, password_hash = ? WHERE id = ?',
    [user.first_name, user.last_name, user.email, user.password_hash, id]
  );
  connection.release();
  return (result as any).affectedRows > 0;
};

// Felhasználó törlése
export const deleteUser = async (id: number): Promise<boolean> => {
  const connection = await pool.getConnection();
  const [result] = await connection.query('DELETE FROM users WHERE id = ?', [id]);
  connection.release();
  return (result as any).affectedRows > 0;
};
