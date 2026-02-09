import { Request, Response } from 'express';
import * as orderService from '../services/orderService';
import { OrderDto } from '../dto/orderDto';
import * as orderItemService from '../services/orderItemService';

// Összes rendelés
export const getAllOrders = async (_req: Request, res: Response) => {
  try {
    const orders = await orderService.getAllOrders();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Hiba történt' });
  }
};

// Egy rendelés ID alapján
export const getOrder = async (req: Request, res: Response) => {
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
export const getOrdersByUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const orders = await orderService.getOrdersByUserId(userId);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Hiba történt' });
  }
};

// Új rendelés hozzáadása
export const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData: OrderDto = req.body;
    const id = await orderService.createOrder(orderData);
    res.status(201).json({ id, message: 'Rendelés sikeresen hozzáadva' });
  } catch (error) {
    res.status(500).json({ error: 'Hiba történt' });
  }
};

// Rendelés frissítése
export const updateOrder = async (req: Request, res: Response) => {
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
export const deleteOrder = async (req: Request, res: Response) => {
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

// Rendelés befejezése (státusz módosítása)
export const completeOrder = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    // Alapértelmezett státusz: Feldolgozás alatt
    const status = req.body?.status || 'Feldolgozás alatt';
    const success = await orderService.completeOrder(id, status);
    if (success) {
      res.json({ message: 'Rendelés sikeresen befejezve' });
    } else {
      res.status(404).json({ error: 'Rendelés nem található' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Hiba történt' });
  }
};

// --- Belső proxy végpontok a frontend REST konvenciójához (nested order items)
export const getOrderItemsForOrder = async (req: Request, res: Response) => {
  try {
    const orderId = parseInt(req.params.id);
    const items = await orderItemService.getOrderItemsByOrderId(orderId);
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Hiba történt' });
  }
};

export const addOrderItemToOrder = async (req: Request, res: Response) => {
  try {
    const orderId = parseInt(req.params.id);
    const { product_id, quantity } = req.body;
    const id = await orderItemService.createOrderItem(orderId, product_id, quantity || 1);
    res.status(201).json({ id, message: 'Rendelési tétel sikeresen hozzáadva' });
  } catch (error) {
    res.status(500).json({ error: 'Hiba történt' });
  }
};

export const updateOrderItemQuantityForOrder = async (req: Request, res: Response) => {
  try {
    const itemId = parseInt(req.params.itemId);
    const { quantity } = req.body;
    const success = await orderItemService.updateOrderItemQuantity(itemId, quantity);
    if (success) {
      res.json({ message: 'Rendelési tétel mennyiség frissítve' });
    } else {
      res.status(404).json({ error: 'Rendelési tétel nem található' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Hiba történt' });
  }
};

export const deleteOrderItemFromOrder = async (req: Request, res: Response) => {
  try {
    const itemId = parseInt(req.params.itemId);
    const success = await orderItemService.deleteOrderItem(itemId);
    if (success) {
      res.json({ message: 'Rendelési tétel sikeresen törölve' });
    } else {
      res.status(404).json({ error: 'Rendelési tétel nem található' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Hiba történt' });
  }
};
