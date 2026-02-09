import { Router } from 'express';
import * as orderItemController from '../controllers/orderItemController';
import { authenticate } from '../middleware/auth';

const router = Router();

// GET - összes rendelési tétel
router.get('/', orderItemController.getAllOrderItems);

// GET - egy rendelési tétel
router.get('/:id', orderItemController.getOrderItem);

// GET - rendeléshez tartozó tételek (auth ajánlott)
router.get('/order/:orderId', authenticate, orderItemController.getOrderItems);

// POST - új rendelési tétel (autentikáció szükséges)
router.post('/', authenticate, orderItemController.createOrderItem);

// PUT - rendelési tétel frissítése (auth, owner/admin ellenőrzés javasolt)
router.put('/:id', authenticate, orderItemController.updateOrderItem);

// DELETE - rendelési tétel törlése (auth, owner/admin ellenőrzés javasolt)
router.delete('/:id', authenticate, orderItemController.deleteOrderItem);

export default router;
