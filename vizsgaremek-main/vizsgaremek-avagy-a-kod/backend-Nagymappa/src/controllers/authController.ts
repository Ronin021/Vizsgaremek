import { Request, Response } from 'express';
import pool from '../db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { LoginRegisterDto } from '../dto/loginRegisterDto';

const JWT_SECRET = process.env.JWT_SECRET || 'CHANGE_THIS_SECRET';

export const register = async (req: Request, res: Response) => {
  try {
    const data: LoginRegisterDto = req.body;
    const { email, password, first_name, last_name } = data;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email és jelszó szükséges' });
    }

    // check existing
    const [rows]: any = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
    if (rows.length > 0) {
      return res.status(409).json({ error: 'Már létezik felhasználó ezzel az e-mail címmel' });
    }

    const hash = await bcrypt.hash(password, 10);
    const [result]: any = await pool.query(
      'INSERT INTO users (first_name, last_name, email, password_hash, is_admin) VALUES (?, ?, ?, ?, ?)',
      [first_name || null, last_name || null, email, hash, 0]
    );

    const insertId = result.insertId;
    res.status(201).json({ id: insertId, message: 'Felhasználó regisztrálva' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hiba történt a regisztráció során' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as LoginRegisterDto;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email és jelszó szükséges' });
    }

    const [rows]: any = await pool.query('SELECT id, email, password_hash, first_name, last_name, is_admin FROM users WHERE email = ?', [email]);
    if (rows.length === 0) {
      return res.status(401).json({ error: 'Helytelen hitelesítő adatok' });
    }

    const user = rows[0];
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return res.status(401).json({ error: 'Helytelen hitelesítő adatok' });
    }

    const payload = { id: user.id, email: user.email, is_admin: !!user.is_admin };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });

    res.json({ token, user: { id: user.id, email: user.email, first_name: user.first_name, last_name: user.last_name, is_admin: !!user.is_admin } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hiba történt a bejelentkezés során' });
  }
};

export default { register, login };
