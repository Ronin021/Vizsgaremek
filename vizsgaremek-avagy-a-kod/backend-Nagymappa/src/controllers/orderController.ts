import { Request, Response } from 'express';
import * as orderService from '../services/orderService';
import { OrderDto } from '../dto/orderDto';
import { getLocalDate, isValidDateFormat } from '../utils/dateUtils';

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

// Új rendelés hozzáadása (kosár létrehozás — vendég is, üres body-val)
export const createOrder = async (req: Request, res: Response) => {
  try {
    // A fallback értékek biztosítják, hogy üres body-val is létrejöhessen egy kezdeti kosár rendelés.
    const orderData: OrderDto = {
      user_id: req.body?.user_id || null,
      total_price: req.body?.total_price || 0,
      date: (req.body?.date && isValidDateFormat(req.body.date)) ? req.body.date : getLocalDate(),
      status: req.body?.status || 'Kosár',
      payment_method: req.body?.payment_method || 'Utánvét',
      shipping_address: req.body?.shipping_address || '',
      phone: req.body?.phone || '',
      customer_first_name: req.body?.customer_first_name || '',
      customer_last_name: req.body?.customer_last_name || '',
      customer_email: req.body?.customer_email || '',
    };
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
    // A checkout során a frontend teljes rendelésobjektummal frissíti a már létrejött kosarat.
    const orderData: OrderDto = {
      ...req.body,
      // Dátum validálása: ha érvényes YYYY-MM-DD formátum, akkor megtartjuk, különben helyi dátum
      date: (req.body?.date && isValidDateFormat(req.body.date)) ? req.body.date : getLocalDate(),
      customer_first_name: req.body?.customer_first_name || '',
      customer_last_name: req.body?.customer_last_name || '',
      customer_email: req.body?.customer_email || '',
    };
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
