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

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management endpoints
 */

/**
 * @swagger
 * /stats:
 *   get:
 *     summary: Get task statistics
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Task statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalTasks:
 *                       type: number
 *                       example: 10
 *                     completedTasks:
 *                       type: number
 *                       example: 7
 *                     incompleteTasks:
 *                       type: number
 *                       example: 3
 *                     completionRate:
 *                       type: number
 *                       example: 70
 *                 message:
 *                   type: string
 *                   example: "Task statistics retrieved"
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get('/stats', auth, taskStats);

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Filter tasks by title
 *     responses:
 *       200:
 *         description: List of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Task'
 *                 message:
 *                   type: string
 *                   example: "Tasks retrieved successfully"
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 * 
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskInput'
 *     responses:
 *       201:
 *         description: Task created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Task'
 *                 message:
 *                   type: string
 *                   example: "Task created successfully"
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 * 
 *   delete:
 *     summary: Delete all tasks
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All tasks deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "All tasks deleted"
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.route('/tasks')
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

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get a task by ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Task details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Task'
 *                 message:
 *                   type: string
 *                   example: "Task retrieved"
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Task not found
 *       500:
 *         description: Server error
 * 
 *   put:
 *     summary: Update a task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskInput'
 *     responses:
 *       200:
 *         description: Updated task
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Task'
 *                 message:
 *                   type: string
 *                   example: "Task updated"
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Task not found
 *       500:
 *         description: Server error
 * 
 *   delete:
 *     summary: Delete a task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Task deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Task deleted"
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Task not found
 *       500:
 *         description: Server error
 */
router.route('/tasks/:id')
  .get(auth, getTaskByID)
  .put(auth, updateByID)
  .delete(auth, deleteByID);

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * 
 *   schemas:
 *     Task:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "60d5ec9f8e6b8f001f5e3b5a"
 *         title:
 *           type: string
 *           example: "Complete project"
 *         description:
 *           type: string
 *           example: "Finish all pending tasks"
 *         completed:
 *           type: boolean
 *           example: false
 *         user:
 *           type: string
 *           example: "60d5ec9f8e6b8f001f5e3b59"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2021-06-25T14:35:43.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2021-06-25T14:35:43.000Z"
 * 
 *     TaskInput:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         title:
 *           type: string
 *           maxLength: 100
 *           example: "Complete project"
 *         description:
 *           type: string
 *           maxLength: 500
 *           example: "Finish all pending tasks"
 *         completed:
 *           type: boolean
 *           example: false
 */

module.exports = router;