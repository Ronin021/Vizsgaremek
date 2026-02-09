import { Router } from 'express';
import * as userController from '../controllers/userController';
import { authenticate } from '../middleware/auth';
import { requireAdmin } from '../middleware/authorize';

const router = Router();

// GET - összes felhasználó (admin only)
router.get('/', authenticate, requireAdmin, userController.getAllUsers);

// GET - egy felhasználó (owner vagy admin javasolt)
router.get('/:id', authenticate, userController.getUser);

// POST - új felhasználó (regisztrációt az /api/auth használja)
router.post('/', userController.createUser);

// PUT - felhasználó frissítése (owner vagy admin javasolt)
router.put('/:id', authenticate, userController.updateUser);

// DELETE - felhasználó törlése (admin only)
router.delete('/:id', authenticate, requireAdmin, userController.deleteUser);

// PATCH - admin státusz beállítása (admin only)
router.patch('/:id/make-admin', authenticate, requireAdmin, userController.setAdmin);

export default router;
