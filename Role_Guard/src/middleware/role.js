/**
 * Factory: returns middleware that allows only users whose role is in `allowedRoles`.
 * Must run after `protect` so `req.user` exists.
 */
export function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Not authenticated' });
    }
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: 'Forbidden — insufficient role' });
    }
    next();
  };
}
