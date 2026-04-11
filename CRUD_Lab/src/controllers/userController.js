import { User } from '../models/User.js';

/**
 * Create a new user (password stored as plain text in this lab only).
 */
export async function createUser(req, res, next) {
  try {
    const user = await User.create(req.body);
    const safe = user.toObject();
    delete safe.password;
    res.status(201).json({ success: true, data: safe });
  } catch (err) {
    if (err.code === 11000) {
      err.statusCode = 409;
      err.message = 'Email already registered';
    }
    next(err);
  }
}

/** List users (excludes password field). */
export async function getUsers(req, res, next) {
  try {
    const users = await User.find().select('-password').lean();
    res.json({ success: true, count: users.length, data: users });
  } catch (err) {
    next(err);
  }
}

/** Get one user by ID. */
export async function getUserById(req, res, next) {
  try {
    const user = await User.findById(req.params.id).select('-password').lean();
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
}

/** Update user by ID (partial updates supported). */
export async function updateUser(req, res, next) {
  try {
    const { password, ...rest } = req.body;
    const update = { ...rest };
    if (password !== undefined) update.password = password;

    const user = await User.findByIdAndUpdate(req.params.id, update, {
      new: true,
      runValidators: true,
    }).select('-password');

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, data: user });
  } catch (err) {
    if (err.code === 11000) {
      err.statusCode = 409;
      err.message = 'Email already registered';
    }
    next(err);
  }
}

/** Delete user by ID. */
export async function deleteUser(req, res, next) {
  try {
    const user = await User.findByIdAndDelete(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, message: 'User deleted', data: user });
  } catch (err) {
    next(err);
  }
}
