const express = require('express');
const { body } = require('express-validator');
const { register, login } = require('../controllers/authController');
const validateRequest = require('../middleware/validateRequest');

const router = express.Router();




router.post('/users/register', [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], validateRequest, register);


router.post('/users/login', [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').exists().withMessage('Password is required')
], validateRequest, login);



module.exports = router;