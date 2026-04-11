import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

// CORS: allow configured frontend origins (comma-separated)
const raw = process.env.CLIENT_ORIGIN || 'http://localhost:5173';
const origins = raw.split(',').map((s) => s.trim()).filter(Boolean);

app.use(
  cors({
    origin: origins,
    credentials: true,
  })
);

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ ok: true, service: 'Connect_Stack_API' });
});

/**
 * Browsers opening http://localhost:5000/ see this — the UI is the Vite app (port 5173).
 */
app.get('/', (req, res) => {
  res.type('html').send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>Connect Stack API</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 40rem; margin: 3rem auto; padding: 0 1rem; line-height: 1.5; color: #0f172a; }
    code { background: #f1f5f9; padding: 0.15rem 0.4rem; border-radius: 4px; }
    a { color: #4f46e5; }
  </style>
</head>
<body>
  <h1>Connect Stack — API is running</h1>
  <p>This URL is the <strong>REST API</strong> only. The web interface is served separately.</p>
  <p>Open the React app at <a href="http://localhost:5173"><code>http://localhost:5173</code></a> (run <code>npm run dev</code> in <code>Connect_Stack/frontend</code>).</p>
  <p>Health check: <a href="/health"><code>/health</code></a></p>
</body>
</html>`);
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

app.use(errorHandler);

export default app;
