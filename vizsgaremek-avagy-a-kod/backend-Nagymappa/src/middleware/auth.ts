import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'CHANGE_THIS_SECRET';

export interface JwtPayloadShape {
  id: number;
  email: string;
  is_admin?: boolean;
}

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const auth = req.headers.authorization;
  // A védett endpointokhoz kötelező a Bearer tokenes Authorization fejléc.
  if (!auth || !auth.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Nincs engedélyezve (token hiányzik)' });
    return;
  }

  const token = auth.split(' ')[1];
  try {
    // A token validálása után a payloadot eltároljuk a requesten a további middleware-eknek.
    const payload = jwt.verify(token, JWT_SECRET) as JwtPayloadShape;
    // attach to req (loose typing)
    (req as any).user = payload;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Érvénytelen token' });
    return;
  }
};
