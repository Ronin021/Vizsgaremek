import { Request, Response, NextFunction } from 'express';

// Error Handler middleware
export const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction): void => {
  console.error('Hiba:', err);
  
  res.status(err.status || 500).json({
    error: err.message || 'Szerver hiba',
    status: err.status || 500
  });
};
