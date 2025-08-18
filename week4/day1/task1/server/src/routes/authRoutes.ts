import express from 'express';
import body  from 'express-validator';
import { register, login } from '../controllers/authController';
import {validateRequest} from '../middleware/validateRequest';

const router = express.Router();

router.post('/users/register', [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isString()
    .withMessage('Name must be a string'),
  body('email')
    .isEmail()
    .withMessage('Valid email is required')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters')
    .isString()
    .withMessage('Password must be a string')
], validateRequest, register);

router.post('/users/login', [
  body('email')
    .isEmail()
    .withMessage('Valid email is required')
    .normalizeEmail(),
  body('password')
    .exists()
    .withMessage('Password is required')
    .isString()
    .withMessage('Password must be a string')
], validateRequest, login);

export default router;