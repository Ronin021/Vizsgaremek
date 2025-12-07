import express from 'express';
import cors from 'cors';

// Routes importálása
import productRoutes from './routes/products';
import orderRoutes from './routes/orders';
import orderItemRoutes from './routes/orderItems';

const app = express();

// Middleware-ek
app.use(cors());
app.use(express.json());

// Routes-ok
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/orderItems', orderItemRoutes);

// Alap route
app.get('/', (_req, res) => {
  res.json({ message: 'Üdvözöllek az API-n!' });
});

export default app;
