import { User } from '../models/User.js';

function isAdmin(req) {
  return req.user?.role === 'admin';
}

function isOwner(req, userId) {
  return req.user?.id === userId;
}

/** Admin-only: create a user (e.g. from admin panel). */
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

/** Admin-only: full list. */
export async function getUsers(req, res, next) {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 }).lean();
    res.json({ success: true, count: users.length, data: users });
  } catch (err) {
    next(err);
  }
}

/** Profile for the currently authenticated user (any role). */
export async function getMeProfile(req, res, next) {
  try {
    const user = await User.findById(req.user.id).select('-password').lean();
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
}

/** Get user by id — self or admin. */
export async function getUserById(req, res, next) {
  try {
    const { id } = req.params;
    if (!isAdmin(req) && !isOwner(req, id)) {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }
    const user = await User.findById(id).select('-password').lean();
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
}

/** Update user — self can update own profile; admin can update anyone. */
export async function updateUser(req, res, next) {
  try {
    const { id } = req.params;
    if (!isAdmin(req) && !isOwner(req, id)) {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }

    const { password, role, ...rest } = req.body;
    const update = { ...rest };

    // Only admins may change roles
    if (role !== undefined && isAdmin(req)) {
      update.role = role;
    }

    if (password) {
      update.password = password;
    }

    const user = await User.findByIdAndUpdate(id, update, {
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

/** Admin-only delete. */
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
