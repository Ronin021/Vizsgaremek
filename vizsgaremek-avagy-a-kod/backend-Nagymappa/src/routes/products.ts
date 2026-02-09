import { Router } from 'express';
import * as productController from '../controllers/productController';
import { authenticate } from '../middleware/auth';
import { requireAdmin } from '../middleware/authorize';

const router = Router();

// GET - összes termék
router.get('/', productController.getAllProducts);

// GET - egy termék
router.get('/:id', productController.getProduct);

// POST - új termék (admin csak)
router.post('/', authenticate, requireAdmin, productController.createProduct);

// PUT - termék frissítése (admin csak)
router.put('/:id', authenticate, requireAdmin, productController.updateProduct);

// DELETE - termék törlése (admin csak)
router.delete('/:id', authenticate, requireAdmin, productController.deleteProduct);

export default router;
