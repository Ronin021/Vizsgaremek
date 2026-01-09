import { Router } from 'express';
import * as userController from '../controllers/userController';

const router = Router();

// GET - összes felhasználó
router.get('/', userController.getAllUsers);

// GET - egy felhasználó
router.get('/:id', userController.getUser);

// POST - új felhasználó
router.post('/', userController.createUser);

// PUT - felhasználó frissítése
router.put('/:id', userController.updateUser);

// DELETE - felhasználó törlése
router.delete('/:id', userController.deleteUser);

export default router;
