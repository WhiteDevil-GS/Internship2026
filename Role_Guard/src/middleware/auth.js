import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

/** Validates JWT and sets req.user for downstream middleware and controllers. */
export async function protect(req, res, next) {
  try {
    const header = req.headers.authorization;
    if (!header?.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Not authorized, no token' });
    }
    const token = header.split(' ')[1];
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return res.status(500).json({ success: false, message: 'Server misconfiguration' });
    }
    const decoded = jwt.verify(token, secret);
    const user = await User.findById(decoded.sub).select('-password');
    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found' });
    }
    req.user = { id: user._id.toString(), role: user.role, email: user.email, name: user.name };
    next();
  } catch {
    res.status(401).json({ success: false, message: 'Not authorized, invalid token' });
  }
}
