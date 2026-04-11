import { Router } from 'express';
import { body, param } from 'express-validator';
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from '../controllers/userController.js';
import { handleValidation } from '../middleware/validate.js';

const router = Router();

const idParam = param('id').isMongoId().withMessage('Invalid user id');

const createRules = [
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

router.post('/', createRules, handleValidation, createUser);
router.get('/', getUsers);
router.get('/:id', idParam, handleValidation, getUserById);
router.patch('/:id', updateRules, handleValidation, updateUser);
router.delete('/:id', idParam, handleValidation, deleteUser);

export default router;
