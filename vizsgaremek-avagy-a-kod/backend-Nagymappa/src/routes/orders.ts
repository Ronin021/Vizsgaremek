import { Router } from 'express';
import * as orderController from '../controllers/orderController';
import { authenticate } from '../middleware/auth';
import { requireAdmin } from '../middleware/authorize';

const router = Router();

// GET - összes rendelés
router.get('/', orderController.getAllOrders);

// GET - egy rendelés
router.get('/:id', orderController.getOrder);

// GET - felhasználó rendeléseit (autentikáció szükséges)
router.get('/user/:userId', authenticate, orderController.getOrdersByUser);

// POST - új rendelés (user-nek be kell jelentkeznie)
router.post('/', authenticate, orderController.createOrder);

// PUT - rendelés frissítése (admin vagy jogosult user szükséges)
router.put('/:id', authenticate, requireAdmin, orderController.updateOrder);

// DELETE - rendelés törlése (admin vagy jogosult user szükséges)
router.delete('/:id', authenticate, requireAdmin, orderController.deleteOrder);

export default router;
