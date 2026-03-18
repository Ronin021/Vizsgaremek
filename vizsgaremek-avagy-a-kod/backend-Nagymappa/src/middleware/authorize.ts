import { Request, Response, NextFunction } from 'express';

export const requireAdmin = (req: Request, res: Response, next: NextFunction): void => {
  const user = (req as any).user;
  // Először bejelentkezett felhasználót várunk, különben nincs mit jogosultság szerint ellenőrizni.
  if (!user) {
    res.status(401).json({ error: 'Nincs bejelentkezve' });
    return;
  }
  // Csak admin szerepkörrel engedjük tovább az admin funkciókhoz tartozó kéréseket.
  if (!user.is_admin) {
    res.status(403).json({ error: 'Nincs jogosultsága' });
    return;
  }
  next();
};
