import { Request, Response } from 'express';
import * as categoryService from '../services/categoryService';

// Összes kategória
export const getAllCategories = async (_req: Request, res: Response): Promise<void> => {
  try {
    const categories = await categoryService.getAllCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Hiba történt' });
  }
};

// Egy kategória ID alapján
export const getCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const category = await categoryService.getCategoryById(id);
    if (category) {
      res.json(category);
    } else {
      res.status(404).json({ error: 'Kategória nem található' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Hiba történt' });
  }
};

// Új kategória hozzáadása
export const createCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name } = req.body;
    const id = await categoryService.createCategory(name);
    res.status(201).json({ id, message: 'Kategória sikeresen hozzáadva' });
  } catch (error) {
    res.status(500).json({ error: 'Hiba történt' });
  }
};

// Kategória frissítése
export const updateCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const { name } = req.body;
    const success = await categoryService.updateCategory(id, name);
    if (success) {
      res.json({ message: 'Kategória sikeresen frissítve' });
    } else {
      res.status(404).json({ error: 'Kategória nem található' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Hiba történt' });
  }
};

// Kategória törlése
export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const success = await categoryService.deleteCategory(id);
    if (success) {
      res.json({ message: 'Kategória sikeresen törölve' });
    } else {
      res.status(404).json({ error: 'Kategória nem található' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Hiba történt' });
  }
};
