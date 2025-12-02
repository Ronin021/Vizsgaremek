import { Router } from 'express';
import * as categoryController from '../controllers/categoryController';

const router = Router();

// GET - összes kategória
router.get('/', categoryController.getAllCategories);

// GET - egy kategória
router.get('/:id', categoryController.getCategory);

// POST - új kategória
router.post('/', categoryController.createCategory);

// PUT - kategória frissítése
router.put('/:id', categoryController.updateCategory);

// DELETE - kategória törlése
router.delete('/:id', categoryController.deleteCategory);

export default router;
