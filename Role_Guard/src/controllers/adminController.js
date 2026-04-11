import { User } from '../models/User.js';

/** Dashboard-style metrics for admins only. */
export async function getStats(req, res, next) {
  try {
    const [total, admins, users] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ role: 'admin' }),
      User.countDocuments({ role: 'user' }),
    ]);
    res.json({
      success: true,
      stats: { totalUsers: total, admins, standardUsers: users },
    });
  } catch (err) {
    next(err);
  }
}

/** Admin-only list with optional role filter (?role=user|admin). */
export async function listUsersAdmin(req, res, next) {
  try {
    const { role } = req.query;
    const filter = {};
    if (role === 'admin' || role === 'user') {
      filter.role = role;
    }
    const data = await User.find(filter).select('-password').sort({ createdAt: -1 }).lean();
    res.json({ success: true, count: data.length, data });
  } catch (err) {
    next(err);
  }
}

/** Admin-only: remove a user by id (use with care). */
export async function removeUserAdmin(req, res, next) {
  try {
    const user = await User.findByIdAndDelete(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, message: 'User removed by admin', data: user });
  } catch (err) {
    next(err);
  }
}
