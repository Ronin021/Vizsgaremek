import { Request, Response } from 'express';
import * as userService from '../services/userService';
import { UserDto } from '../dto/userDto';

// Összes felhasználó
export const getAllUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Hiba történt' });
  }
};

// Egy felhasználó ID alapján
export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const user = await userService.getUserById(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'Felhasználó nem található' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Hiba történt' });
  }
};

// Új felhasználó hozzáadása
export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userData: UserDto = req.body;
    const id = await userService.createUser(userData);
    res.status(201).json({ id, message: 'Felhasználó sikeresen hozzáadva' });
  } catch (error) {
    res.status(500).json({ error: 'Hiba történt' });
  }
};

// Felhasználó frissítése
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const userData: UserDto = req.body;
    const success = await userService.updateUser(id, userData);
    if (success) {
      res.json({ message: 'Felhasználó sikeresen frissítve' });
    } else {
      res.status(404).json({ error: 'Felhasználó nem található' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Hiba történt' });
  }
};

// Felhasználó törlése
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const success = await userService.deleteUser(id);
    if (success) {
      res.json({ message: 'Felhasználó sikeresen törölve' });
    } else {
      res.status(404).json({ error: 'Felhasználó nem található' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Hiba történt' });
  }
};
