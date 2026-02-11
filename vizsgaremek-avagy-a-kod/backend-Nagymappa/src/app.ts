import express from 'express';
import cors from 'cors';

// Routes importálása
import productRoutes from './routes/products';
import orderRoutes from './routes/orders';
import orderItemRoutes from './routes/orderItems';
import authRoutes from './routes/auth';
import categoryRoutes from './routes/categories';
import { authenticate } from './middleware/auth';

const app = express();

// Middleware-ek
app.use(cors());
app.use(express.json());

// Routes-ok
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/orderItems', orderItemRoutes);
// Auth routes
app.use('/api/auth', authRoutes);

// Alap route
app.get('/api', (_req, res) => {
  res.json({ message: 'Üdvözöllek az API-n!' });
});

export default app;
