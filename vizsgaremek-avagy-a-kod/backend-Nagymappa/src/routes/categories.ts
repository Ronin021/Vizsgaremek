import { Router } from 'express';
import * as categoryController from '../controllers/categoryController';
import { authenticate } from '../middleware/auth';
import { requireAdmin } from '../middleware/authorize';

const router = Router();

// GET - összes kategória
router.get('/', categoryController.getAllCategories);

// GET - egy kategória
router.get('/:id', categoryController.getCategory);

// POST - új kategória
router.post('/', authenticate, requireAdmin, categoryController.createCategory);

// PUT - kategória frissítése
router.put('/:id', authenticate, requireAdmin, categoryController.updateCategory);

// DELETE - kategória törlése
router.delete('/:id', authenticate, requireAdmin, categoryController.deleteCategory);

export default router;
