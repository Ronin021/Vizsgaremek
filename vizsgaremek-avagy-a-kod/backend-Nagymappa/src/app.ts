import express from 'express';
import cors from 'cors';

// Routes importálása
import productRoutes from './routes/products';
import orderRoutes from './routes/orders';
import orderItemRoutes from './routes/orderItems';
import authRoutes from './routes/auth';
import categoryRoutes from './routes/categories';
import userRoutes from './routes/users';

const app = express();

// Middleware-ek
// CORS engedélyezése, hogy a frontend böngészőből elérhesse az API-t.
app.use(cors());
// JSON body parsing nagyobb payload támogatással (pl. admin oldali képadatok).
app.use(express.json({ limit: '50mb' }));

// Routes-ok
// Az API erőforrások prefixek alá szervezve maradnak, így a route-struktúra konzisztens.
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/orderItems', orderItemRoutes);
app.use('/api/users', userRoutes);
// Auth routes
app.use('/api/auth', authRoutes);

// Alap route
app.get('/api', (_req, res) => {
  res.json({ message: 'Üdvözöllek az API-n!' });
});

export default app;
