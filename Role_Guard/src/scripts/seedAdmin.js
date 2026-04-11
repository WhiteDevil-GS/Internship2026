/**
 * One-off script: creates an admin user from environment variables.
 * Usage: set ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME in .env then run:
 *   npm run seed:admin
 */
import 'dotenv/config';
import mongoose from 'mongoose';
import { User } from '../models/User.js';

async function main() {
  const uri = process.env.MONGODB_URI;
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME || 'Admin';

  if (!uri || !email || !password) {
    console.error('Need MONGODB_URI, ADMIN_EMAIL, and ADMIN_PASSWORD in .env');
    process.exit(1);
  }

  await mongoose.connect(uri);

  const existing = await User.findOne({ email });
  if (existing) {
    if (existing.role !== 'admin') {
      existing.role = 'admin';
      if (password) {
        existing.password = password;
      }
      await existing.save();
      console.log('Existing user promoted to admin and password updated.');
    } else {
      console.log('Admin already exists for this email.');
    }
    await mongoose.disconnect();
    return;
  }

  await User.create({ name, email, password, role: 'admin' });
  console.log('Admin user created:', email);
  await mongoose.disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
