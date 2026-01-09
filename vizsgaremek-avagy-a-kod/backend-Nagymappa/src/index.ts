import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/errorHandler';
import { authMiddleware } from './middleware/auth';

// Routes import
import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import productRoutes from './routes/products';
import categoryRoutes from './routes/categories';
import orderRoutes from './routes/orders';
import orderItemRoutes from './routes/orderItems';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orders', authMiddleware, orderRoutes);
app.use('/api/order-items', authMiddleware, orderItemRoutes);

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response): void => {
  res.json({ status: 'OK', message: 'Backend működik' });
});

// 404 Handler
app.use((_req: Request, res: Response): void => {
  res.status(404).json({ error: 'Endpoint nem találva' });
});

// Error Handler (utolsónak kell lennie!)
app.use(errorHandler);

// Server Start
app.listen(PORT, (): void => {
  console.log(`🚀 Backend szerver futó: http://localhost:${PORT}`);
  console.log(`📝 API dokumentáció: http://localhost:${PORT}/api`);
});
