import { Router } from 'express';
import { param } from 'express-validator';
import { getStats, listUsersAdmin, removeUserAdmin } from '../controllers/adminController.js';
import { protect } from '../middleware/auth.js';
import { requireRole } from '../middleware/role.js';
import { handleValidation } from '../middleware/validate.js';

const router = Router();

// All routes here require a valid JWT *and* the admin role
router.use(protect, requireRole('admin'));

router.get('/stats', getStats);
router.get('/users', listUsersAdmin);
router.delete(
  '/users/:id',
  param('id').isMongoId().withMessage('Invalid user id'),
  handleValidation,
  removeUserAdmin
);

export default router;
