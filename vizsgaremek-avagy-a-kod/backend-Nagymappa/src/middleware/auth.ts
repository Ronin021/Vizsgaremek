import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';

// Auth middleware - ellenőrzi a tokent
export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      res.status(401).json({ error: 'Token hiányzik' });
      return;
    }

    const decoded = verifyToken(token);
    
    if (!decoded) {
      res.status(401).json({ error: 'Érvénytelen token' });
      return;
    }

    (req as any).userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Hitelesítés sikertelen' });
  }
};
