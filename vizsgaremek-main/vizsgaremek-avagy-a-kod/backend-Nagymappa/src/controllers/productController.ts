import { Request, Response } from 'express';
import * as productService from '../services/productService';
import { ProductDto } from '../dto/productDto';

// Összes termék
export const getAllProducts = async (_req: Request, res: Response): Promise<void> => {
  try {
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Hiba történt' });
  }
};

// Egy termék ID alapján
export const getProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const product = await productService.getProductById(id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Termék nem található' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Hiba történt' });
  }
};

// Új termék hozzáadása
export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const productData: ProductDto = req.body;
    const id = await productService.createProduct(productData);
    res.status(201).json({ id, message: 'Termék sikeresen hozzáadva' });
  } catch (error) {
    res.status(500).json({ error: 'Hiba történt' });
  }
};

// Termék frissítése
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const productData: ProductDto = req.body;
    const success = await productService.updateProduct(id, productData);
    if (success) {
      res.json({ message: 'Termék sikeresen frissítve' });
    } else {
      res.status(404).json({ error: 'Termék nem található' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Hiba történt' });
  }
};

// Termék törlése
export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const success = await productService.deleteProduct(id);
    if (success) {
      res.json({ message: 'Termék sikeresen törölve' });
    } else {
      res.status(404).json({ error: 'Termék nem található' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Hiba történt' });
  }
};
