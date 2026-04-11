import { User } from '../models/User.js';
import { signToken } from '../utils/token.js';

/**
 * Register — password is hashed by User model pre-save hook.
 */
export async function signup(req, res, next) {
  try {
    const { name, email, password } = req.body;
    // New accounts are always "user"; promote admins via DB or an internal tool only.
    const user = await User.create({
      name,
      email,
      password,
      role: 'user',
    });
    const token = signToken({ sub: user._id.toString(), role: user.role });
    const safe = user.toObject();
    delete safe.password;
    res.status(201).json({ success: true, token, user: safe });
  } catch (err) {
    if (err.code === 11000) {
      err.statusCode = 409;
      err.message = 'Email already registered';
    }
    next(err);
  }
}

/**
 * Login — loads user with password field for bcrypt compare.
 */
export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
    const token = signToken({ sub: user._id.toString(), role: user.role });
    const safe = user.toObject();
    delete safe.password;
    res.json({ success: true, token, user: safe });
  } catch (err) {
    next(err);
  }
}

/** Current user from JWT (requires protect middleware). */
export async function me(req, res) {
  const user = await User.findById(req.user.id).select('-password').lean();
  res.json({ success: true, user });
}
