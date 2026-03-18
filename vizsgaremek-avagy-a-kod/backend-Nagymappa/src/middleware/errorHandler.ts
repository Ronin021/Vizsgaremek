import { Request, Response, NextFunction } from 'express';

// Error Handler middleware
export const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction): void => {
  // A központi log segít gyorsan visszakeresni a backend oldali kivételeket.
  console.error('Hiba:', err);
  
  // Egységes JSON hibaformátummal válaszolunk, hogy a frontend konzisztensen kezelhesse.
  res.status(err.status || 500).json({
    error: err.message || 'Szerver hiba',
    status: err.status || 500
  });
};
