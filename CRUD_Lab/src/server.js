import 'dotenv/config';
import app from './app.js';
import { connectDB } from './config/db.js';

const PORT = process.env.PORT || 4001;

await connectDB();

app.listen(PORT, () => {
  console.log(`CRUD_Lab API listening on http://localhost:${PORT}`);
});
