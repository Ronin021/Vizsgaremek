import { Router } from 'express';
import * as orderController from '../controllers/orderController';

const router = Router();

// GET - összes rendelés
router.get('/', orderController.getAllOrders);

// GET - egy rendelés
router.get('/:id', orderController.getOrder);

// GET - felhasználó rendeléseit
router.get('/user/:userId', orderController.getOrdersByUser);

// POST - új rendelés
router.post('/', orderController.createOrder);

// PUT - rendelés frissítése
router.put('/:id', orderController.updateOrder);

// DELETE - rendelés törlése
router.delete('/:id', orderController.deleteOrder);

export default router;
