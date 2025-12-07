import { Router } from 'express';
import * as orderItemController from '../controllers/orderItemController';

const router = Router();

// GET - összes rendelési tétel
router.get('/', orderItemController.getAllOrderItems);

// GET - egy rendelési tétel
router.get('/:id', orderItemController.getOrderItem);

// GET - rendeléshez tartozó tételek
router.get('/order/:orderId', orderItemController.getOrderItems);

// POST - új rendelési tétel
router.post('/', orderItemController.createOrderItem);

// PUT - rendelési tétel frissítése
router.put('/:id', orderItemController.updateOrderItem);

// DELETE - rendelési tétel törlése
router.delete('/:id', orderItemController.deleteOrderItem);

export default router;
