import 'dotenv/config';
import app from './app.js';
import { connectDB } from './config/db.js';

const PORT = process.env.PORT || 5000;

if (!process.env.JWT_SECRET) {
  console.warn('Warning: JWT_SECRET is not set');
}

await connectDB();

app.listen(PORT, () => {
  console.log(`Connect_Stack API listening on http://localhost:${PORT}`);
});
