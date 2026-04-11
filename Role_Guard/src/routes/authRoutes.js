import { Router } from 'express';
import { body } from 'express-validator';
import { login, me, signup } from '../controllers/authController.js';
import { handleValidation } from '../middleware/validate.js';
import { protect } from '../middleware/auth.js';

const router = Router();

const signupRules = [
  body('name').trim().notEmpty(),
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
];

const loginRules = [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty(),
];

router.post('/signup', signupRules, handleValidation, signup);
router.post('/login', loginRules, handleValidation, login);
router.get('/me', protect, me);

export default router;
