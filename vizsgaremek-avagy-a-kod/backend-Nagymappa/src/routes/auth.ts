import { Router } from 'express';
import * as authController from '../controllers/authController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// POST - Regisztráció
router.post('/register', authController.register);

// POST - Bejelentkezés
router.post('/login', authController.login);

// GET - Aktuális felhasználó (védett route)
router.get('/me', authMiddleware, authController.getCurrentUser);

export default router;
