import express from 'express';
import { body } from 'express-validator';
import { register, login, me } from '../controllers/authController.js';
import validate from '../middleware/validate.js';
import protect from '../middleware/auth.js';

const router = express.Router();

/**
 * @route POST /api/auth/register
 */
router.post(
  '/register',
  [
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    body('role').optional().isIn(['admin', 'buyer'])
  ],
  validate,
  register
);

/**
 * @route POST /api/auth/login
 */
router.post(
  '/login',
  [ body('email').isEmail(), body('password').exists() ],
  validate,
  login
);

router.get('/me', protect, me);

export default router;
