import { Router } from 'express';
import * as orderController from '../controllers/orderController';
import { authenticate } from '../middleware/auth';
import { requireAdmin } from '../middleware/authorize';

const router = Router();

// GET - összes rendelés
router.get('/', orderController.getAllOrders);

// GET - felhasználó rendeléseit (autentikáció szükséges)
// ⚠️ FONTOS: Ezt az `/:id` ELŐTT kell, mert Express az első matchelő route-ot használja!
router.get('/user/:userId', authenticate, orderController.getOrdersByUser);

// GET - egy rendelés
router.get('/:id', orderController.getOrder);

// POST - új rendelés (kosár létrehozás — vendég is)
router.post('/', orderController.createOrder);

// PUT - rendelés frissítése (autentikáció szükséges, nem csak admin)
router.put('/:id', authenticate, orderController.updateOrder);

// DELETE - rendelés törlése (csak admin)
router.delete('/:id', authenticate, requireAdmin, orderController.deleteOrder);

export default router;
