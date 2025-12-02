import { Request, Response } from 'express';
import * as orderItemService from '../services/orderItemService';

// Összes rendelési tétel
export const getAllOrderItems = async (_req: Request, res: Response): Promise<void> => {
  try {
    const items = await orderItemService.getAllOrderItems();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Hiba történt' });
  }
};

// Egy rendelési tétel ID alapján
export const getOrderItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const item = await orderItemService.getOrderItemById(id);
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ error: 'Rendelési tétel nem található' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Hiba történt' });
  }
};

// Rendeléshez tartozó tételek lekérése
export const getOrderItems = async (req: Request, res: Response): Promise<void> => {
  try {
    const orderId = parseInt(req.params.orderId);
    const items = await orderItemService.getOrderItemsByOrderId(orderId);
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Hiba történt' });
  }
};

// Új rendelési tétel hozzáadása
export const createOrderItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { orderId, productId, quantity } = req.body;
    const id = await orderItemService.createOrderItem(orderId, productId, quantity);
    res.status(201).json({ id, message: 'Rendelési tétel sikeresen hozzáadva' });
  } catch (error) {
    res.status(500).json({ error: 'Hiba történt' });
  }
};

// Rendelési tétel frissítése
export const updateOrderItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const { orderId, productId, quantity } = req.body;
    const success = await orderItemService.updateOrderItem(id, orderId, productId, quantity);
    if (success) {
      res.json({ message: 'Rendelési tétel sikeresen frissítve' });
    } else {
      res.status(404).json({ error: 'Rendelési tétel nem található' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Hiba történt' });
  }
};

// Rendelési tétel törlése
export const deleteOrderItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const success = await orderItemService.deleteOrderItem(id);
    if (success) {
      res.json({ message: 'Rendelési tétel sikeresen törölve' });
    } else {
      res.status(404).json({ error: 'Rendelési tétel nem található' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Hiba történt' });
  }
};
