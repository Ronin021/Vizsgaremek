import { Request, Response } from 'express';
import * as orderItemService from '../services/orderItemService';
import { OrderItemDto } from '../dto/orderItemDto';

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
    const raw = req.params.orderId ?? req.params.id;
    const orderId = parseInt(raw as string);
    if (isNaN(orderId)) {
      res.status(400).json({ error: 'Érvénytelen rendelés ID' });
      return;
    }
    const items = await orderItemService.getOrderItemsByOrderId(orderId);
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Hiba történt' });
  }
};

// Új rendelési tétel hozzáadása
export const createOrderItem = async (req: Request, res: Response): Promise<void> => {
  try {
    // orderId jöhet path paraméterből (/orders/:id/items) vagy body-ből (/order-items)
    const orderId = parseInt(req.params.id || req.body.order_id);
    const itemData: OrderItemDto = req.body;
    const id = await orderItemService.createOrderItem(orderId, itemData.product_id, itemData.quantity);
    res.status(201).json({ id, message: 'Rendelési tétel sikeresen hozzáadva' });
  } catch (error) {
    res.status(500).json({ error: 'Hiba történt' });
  }
};

// Rendelési tétel frissítése
export const updateOrderItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const itemId = parseInt(req.params.itemId || req.params.id);
    const quantity = req.body.quantity;
    const success = await orderItemService.updateOrderItem(itemId, 0, 0, quantity);
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
    const itemId = parseInt(req.params.itemId || req.params.id);
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
