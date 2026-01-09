import { Request, Response } from 'express';
import * as userService from '../services/userService';
import { hashPassword, comparePassword } from '../utils/password';
import { generateToken } from '../utils/jwt';
import { UserDto } from '../dto/userDto';

/**
 * Felhasználó regisztrációja
 */
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { first_name, last_name, email, password } = req.body;

    // Validáció
    if (!email || !password || !first_name || !last_name) {
      res.status(400).json({ error: 'Hiányzó adatok' });
      return;
    }

    // Email ellenőrzés
    const existingUser = await userService.getUserByEmail(email);
    if (existingUser) {
      res.status(409).json({ error: 'Ez az email már regisztrálva van' });
      return;
    }

    // Jelszó hashelése
    const hashedPassword = hashPassword(password);

    // Felhasználó létrehozása
    const userData: UserDto = {
      first_name,
      last_name,
      email,
      password_hash: hashedPassword,
    };

    const userId = await userService.createUser(userData);

    // Token generálása
    const token = generateToken(userId, email);

    res.status(201).json({
      message: 'Sikeres regisztráció',
      userId,
      token,
      user: {
        id: userId,
        first_name,
        last_name,
        email,
      },
    });
  } catch (error) {
    console.error('Regisztráció hiba:', error);
    res.status(500).json({ error: 'Regisztráció sikertelen' });
  }
};

/**
 * Felhasználó bejelentkezése
 */
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Validáció
    if (!email || !password) {
      res.status(400).json({ error: 'Email és jelszó szükséges' });
      return;
    }

    // Felhasználó keresése
    const user = await userService.getUserByEmail(email);
    if (!user) {
      res.status(401).json({ error: 'Hibás email vagy jelszó' });
      return;
    }

    // Jelszó ellenőrzése
    const passwordValid = comparePassword(password, user.password_hash);
    if (!passwordValid) {
      res.status(401).json({ error: 'Hibás email vagy jelszó' });
      return;
    }

    // Token generálása
    const token = generateToken(user.id, user.email);

    res.json({
      message: 'Sikeres bejelentkezés',
      token,
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Bejelentkezési hiba:', error);
    res.status(500).json({ error: 'Bejelentkezés sikertelen' });
  }
};

/**
 * Jelenlegi felhasználó info lekérése
 */
export const getCurrentUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).userId;

    if (!userId) {
      res.status(401).json({ error: 'Nincs bejelentkezve' });
      return;
    }

    const user = await userService.getUserById(userId);
    if (!user) {
      res.status(404).json({ error: 'Felhasználó nem található' });
      return;
    }

    res.json({
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    });
  } catch (error) {
    console.error('Felhasználó info hiba:', error);
    res.status(500).json({ error: 'Hiba történt' });
  }
};
