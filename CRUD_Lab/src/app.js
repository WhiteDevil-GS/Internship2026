import express from 'express';
import userRoutes from './routes/userRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

app.use(express.json());

// Health check for deployments and local sanity checks
app.get('/health', (req, res) => {
  res.json({ ok: true, service: 'CRUD_Lab' });
});

app.use('/api/users', userRoutes);

// 404 for unknown routes
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

app.use(errorHandler);

export default app;
