const express = require('express');
const { body } = require('express-validator');
const {
  getTasks,
  createTask,
  updateByID,
  deleteByID,
  getTaskByID,
  deleteAll,
  taskStats
} = require('../controllers/taskController');
const auth = require('../middleware/auth');
const validateRequest = require('../middleware/validateRequest');
const router = express.Router();

router.get('/stats', auth, taskStats);

router.route('/')
  .get(auth, getTasks)
  .post(
    auth,
    [
      body('title')
        .notEmpty().withMessage('Title is required')
        .trim()
        .escape()
        .isLength({ max: 100 }).withMessage('Title must be less than 100 characters'),
      body('description')
        .optional()
        .trim()
        .escape()
        .isLength({ max: 500 }).withMessage('Description must be less than 500 characters')
    ],
    validateRequest,
    createTask
  )
  .delete(auth, deleteAll);

// Item routes
router.route('/:id')
  .get(auth, getTaskByID)
  .put(auth, updateByID)
  .delete(auth, deleteByID);

module.exports = router;