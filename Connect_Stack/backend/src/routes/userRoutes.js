import { Router } from 'express';
import { body, param } from 'express-validator';
import {
  createUser,
  deleteUser,
  getMeProfile,
  getUserById,
  getUsers,
  updateUser,
} from '../controllers/userController.js';
import { handleValidation } from '../middleware/validate.js';
import { protect } from '../middleware/auth.js';
import { requireRole } from '../middleware/role.js';

const router = Router();

const idParam = param('id').isMongoId().withMessage('Invalid user id');

const adminCreateRules = [
  body('name').trim().notEmpty(),
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('role').optional().isIn(['user', 'admin']),
];

const updateRules = [
  idParam,
  body('name').optional().trim().notEmpty(),
  body('email').optional().isEmail().normalizeEmail(),
  body('password').optional().isLength({ min: 6 }),
  body('role').optional().isIn(['user', 'admin']),
];

// Current user profile (used by dashboard)
router.get('/me/profile', protect, getMeProfile);

// Admin CRUD surface
router.get('/', protect, requireRole('admin'), getUsers);
router.post('/', protect, requireRole('admin'), adminCreateRules, handleValidation, createUser);

// Single-user operations
router.get('/:id', protect, idParam, handleValidation, getUserById);
router.patch('/:id', protect, updateRules, handleValidation, updateUser);
router.delete('/:id', protect, requireRole('admin'), idParam, handleValidation, deleteUser);

export default router;
