import mongoose from 'mongoose';

/**
 * Connects to MongoDB using the URI from environment variables.
 * Exits the process if the connection fails (fail-fast for APIs).
 */
export async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('Missing MONGODB_URI in environment');
    process.exit(1);
  }
  try {
    await mongoose.connect(uri);
    console.log('MongoDB connected (CRUD_Lab)');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
}
