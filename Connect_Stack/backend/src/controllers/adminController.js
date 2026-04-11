import { User } from '../models/User.js';

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

export async function removeUserAdmin(req, res, next) {
  try {
    if (req.params.id === req.user.id) {
      return res.status(400).json({ success: false, message: 'Cannot delete your own account here' });
    }
    const user = await User.findByIdAndDelete(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, message: 'User removed', data: user });
  } catch (err) {
    next(err);
  }
}
