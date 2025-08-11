/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - id
 *         - title
 *         - completed
 *         - createdAt
 *       properties:
 *         id:
 *           type: string
 *           description: Unique ID of the task
 *         title:
 *           type: string
 *           description: Title of the task
 *         completed:
 *           type: boolean
 *           description: Whether the task is completed or not
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Creation timestamp
 *     TaskInput:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: Task title
 *         completed:
 *           type: boolean
 *           description: Completion status (optional on create)
 */

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks or filter by title query param
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Partial title to filter tasks
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
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Task'
 *                 message:
 *                   type: string
 *       404:
 *         description: No tasks found matching title
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: "null"
 *                 message:
 *                   type: string
 *
 *   post:
 *     summary: Create a new task
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
 *                 data:
 *                   $ref: '#/components/schemas/Task'
 *                 message:
 *                   type: string
 *       400:
 *         description: Validation error
 *
 * /tasks/{id}:
 *   get:
 *     summary: Get a task by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Task found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Task'
 *                 message:
 *                   type: string
 *       404:
 *         description: Task not found
 *   put:
 *     summary: Update a task by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskInput'
 *     responses:
 *       200:
 *         description: Task updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Task'
 *                 message:
 *                   type: string
 *                 changes:
 *                   type: object
 *                   description: Changed fields with old and new values
 *       404:
 *         description: Task not found
 *   delete:
 *     summary: Delete a task by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Task deleted
 *       404:
 *         description: Task not found
 *
 * /tasks:
 *   delete:
 *     summary: Delete all tasks
 *     responses:
 *       200:
 *         description: All tasks deleted
 *
 * /stats:
 *   get:
 *     summary: Get statistics about tasks
 *     responses:
 *       200:
 *         description: Statistics fetched
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     Total Tasks:
 *                       type: integer
 *                     Total Completed Tasks:
 *                       type: integer
 *                     Total Incomplete Tasks:
 *                       type: integer
 *                 message:
 *                   type: string
 */


const express = require("express");
const {
  getTasks,
  createTask,
  getTaskByID,
  updateByID,
  deleteByID,
  deleteAll,
  taskStats,
} = require("../controllers/taskController");
const validateTask = require("../middlewares/validateTask");

const router = express.Router();

router.get("/tasks", getTasks);

router.post("/tasks", validateTask, createTask);

router.get("/tasks/:id", getTaskByID);

router.put("/tasks/:id", validateTask, updateByID);

router.delete("/tasks/:id", deleteByID);

router.delete("/tasks", deleteAll);

router.get("/stats", taskStats);

module.exports = router;
