import { Request, Response, NextFunction } from 'express';

export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = (req as any).user;
  if (!user) {
    return res.status(401).json({ error: 'Nincs bejelentkezve' });
  }
  if (!user.is_admin) {
    return res.status(403).json({ error: 'Nincs jogosultsága' });
  }
  next();
};
