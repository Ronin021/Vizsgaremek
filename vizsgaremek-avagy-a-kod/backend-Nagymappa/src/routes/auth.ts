import { Router } from 'express';
import * as authController from '../controllers/authController';

const router = Router();

// A regisztráció endpoint új felhasználói fiókot hoz létre.
router.post('/register', authController.register);
// A login endpoint JWT tokent ad vissza sikeres hitelesítés esetén.
router.post('/login', authController.login);

export default router;
