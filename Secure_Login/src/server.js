import 'dotenv/config';
import app from './app.js';
import { connectDB } from './config/db.js';

const PORT = process.env.PORT || 4002;

if (!process.env.JWT_SECRET) {
  console.warn('Warning: JWT_SECRET is not set — auth tokens will fail until you configure .env');
}

await connectDB();

app.listen(PORT, () => {
  console.log(`Secure_Login API listening on http://localhost:${PORT}`);
});
