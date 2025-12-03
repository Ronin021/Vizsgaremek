import { Router } from 'express';
import * as productController from '../controllers/productController';

const router = Router();

// GET - összes termék
router.get('/', productController.getAllProducts);

// GET - egy termék
router.get('/:id', productController.getProduct);

// POST - új termék
router.post('/', productController.createProduct);

// PUT - termék frissítése
router.put('/:id', productController.updateProduct);

// DELETE - termék törlése
router.delete('/:id', productController.deleteProduct);

export default router;
