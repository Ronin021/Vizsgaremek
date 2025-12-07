import { Request, Response } from 'express';
import * as orderService from '../services/orderService';
import { OrderDto } from '../dto/orderDto';

// Összes rendelés
export const getAllOrders = async (_req: Request, res: Response): Promise<void> => {
  try {
    const orders = await orderService.getAllOrders();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Hiba történt' });
  }
};

// Egy rendelés ID alapján
export const getOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const order = await orderService.getOrderById(id);
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ error: 'Rendelés nem található' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Hiba történt' });
  }
};

// Felhasználó rendeléseit lekérése
export const getOrdersByUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = parseInt(req.params.userId);
    const orders = await orderService.getOrdersByUserId(userId);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Hiba történt' });
  }
};

// Új rendelés hozzáadása
export const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const orderData: OrderDto = req.body;
    const id = await orderService.createOrder(orderData);
    res.status(201).json({ id, message: 'Rendelés sikeresen hozzáadva' });
  } catch (error) {
    res.status(500).json({ error: 'Hiba történt' });
  }
};

// Rendelés frissítése
export const updateOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const orderData: OrderDto = req.body;
    const success = await orderService.updateOrder(id, orderData);
    if (success) {
      res.json({ message: 'Rendelés sikeresen frissítve' });
    } else {
      res.status(404).json({ error: 'Rendelés nem található' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Hiba történt' });
  }
};

// Rendelés törlése
export const deleteOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const success = await orderService.deleteOrder(id);
    if (success) {
      res.json({ message: 'Rendelés sikeresen törölve' });
    } else {
      res.status(404).json({ error: 'Rendelés nem található' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Hiba történt' });
  }
};
