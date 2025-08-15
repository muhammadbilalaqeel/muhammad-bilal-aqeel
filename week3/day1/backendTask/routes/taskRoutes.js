/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: API for managing tasks
 *
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: de81d328ce5747c7868ea9e52cf80eef
 *         title:
 *           type: string
 *           example: Buy groceries
 *         completed:
 *           type: boolean
 *           example: false
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2025-08-15T04:17:14.135Z
 *
 * /tasks:
 *   get:
 *     summary: Get all tasks
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: List of all tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       201:
 *         description: Task created successfully
 *
 * /tasks/{id}:
 *   get:
 *     summary: Get a task by ID
 *     tags: [Tasks]
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
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Task not found
 *   put:
 *     summary: Update a task by ID
 *     tags: [Tasks]
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
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       200:
 *         description: Task updated successfully
 *   delete:
 *     summary: Delete a task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *
 * /tasks:
 *   delete:
 *     summary: Delete all tasks
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: All tasks deleted successfully
 *
 * /stats:
 *   get:
 *     summary: Get task statistics
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: Statistics of tasks
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
