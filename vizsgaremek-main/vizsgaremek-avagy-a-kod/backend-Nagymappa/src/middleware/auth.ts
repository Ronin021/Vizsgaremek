import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'CHANGE_THIS_SECRET';

export interface JwtPayloadShape {
  id: number;
  email: string;
  is_admin?: boolean;
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Nincs engedélyezve (token hiányzik)' });
  }

  const token = auth.split(' ')[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET) as JwtPayloadShape;
    // attach to req (loose typing)
    (req as any).user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Érvénytelen token' });
  }
};
