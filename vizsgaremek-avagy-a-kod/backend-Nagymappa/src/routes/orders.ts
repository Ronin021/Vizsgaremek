import { Router } from 'express';
import * as orderController from '../controllers/orderController';
import * as orderItemController from '../controllers/orderItemController';

const router = Router();

// GET - összes rendelés
router.get('/', orderController.getAllOrders);

// GET - egy rendelés
router.get('/:id', orderController.getOrder);

// GET - rendeléshez tartozó tételek (compat: /api/orders/:id/items)
router.get('/:id/items', orderItemController.getOrderItems);

// POST - új rendelési tétel (compat: /api/orders/:id/items)
router.post('/:id/items', orderItemController.createOrderItem);

// PATCH - rendelési tétel mennyiségét módosítása (compat: /api/orders/:orderId/items/:itemId)
router.patch('/:orderId/items/:itemId', orderItemController.updateOrderItem);

// DELETE - rendelési tétel törlése (compat: /api/orders/:orderId/items/:itemId)
router.delete('/:orderId/items/:itemId', orderItemController.deleteOrderItem);

// GET - felhasználó rendeléseit
router.get('/user/:userId', orderController.getOrdersByUser);

// POST - új rendelés
router.post('/', orderController.createOrder);

// PUT - rendelés frissítése
router.put('/:id', orderController.updateOrder);

// DELETE - rendelés törlése
router.delete('/:id', orderController.deleteOrder);

export default router;
