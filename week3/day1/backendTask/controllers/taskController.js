const { v4: uuidv4 } = require("uuid");

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
 *       required:
 *         - title
 *       properties:
 *         id:
 *           type: string
 *           description: Unique task identifier
 *           example: de81d328ce5747c7868ea9e52cf80eef
 *         title:
 *           type: string
 *           description: The title or description of the task
 *           example: Buy groceries
 *         completed:
 *           type: boolean
 *           description: Whether the task is completed
 *           example: false
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The creation date of the task
 *           example: 2025-08-15T04:17:14.135Z
 *
 * /tasks:
 *   get:
 *     summary: Get all tasks or filter by title
 *     tags: [Tasks]
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Filter tasks by title (case-insensitive)
 *     responses:
 *       200:
 *         description: List of tasks (optionally filtered)
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       404:
 *         description: No task found for given title
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Finish homework
 *     responses:
 *       201:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *
 * /tasks/{id}:
 *   get:
 *     summary: Get a task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique task ID
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
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Updated task title
 *               completed:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       404:
 *         description: Task not found
 *   delete:
 *     summary: Delete a task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique task ID
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
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
 *         description: Task statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Total Tasks:
 *                   type: integer
 *                   example: 5
 *                 Total Completed Tasks:
 *                   type: integer
 *                   example: 2
 *                 Total Incomplete Tasks:
 *                   type: integer
 *                   example: 3
 */

let tasks = [];

function getTasks(req, res) {
  let { title } = req.query;

  if (title) {
    const lowerTitle = title.toLowerCase();
    let filteredTasks = tasks.filter((task) =>
      task.title.toLowerCase().includes(lowerTitle)
    );

    if (filteredTasks.length === 0) {
      return res.status(404).json({
        success: false,
        data: null,
        message: "No Task Found By this Title",
      });
    }

    return res.status(200).json({
      success: true,
      data: filteredTasks,
      message: `Tasks fetched successfully for title "${title}"`,
    });
  }
  return res.status(200).json({
    success: true,
    data: tasks,
    message: "Tasks fetched successfully",
  });
}

function createTask(req, res) {
  console.log(req.body);
  const { title } = req.body;

  let newTask = {
    id: uuidv4().replace(/-/g, ""),
    title,
    completed: false,
    createdAt: new Date().toISOString(),
  };

  tasks.push(newTask);

  return res.status(201).json({
    success: true,
    data: newTask,
    message: "Task Created Successfully",
  });
}

function getTaskByID(req, res) {
  let { id } = req.params;

  let existence = tasks.find((task) => task.id === id);

  if (!existence) {
    res.status(404).json({
      success: false,
      data: null,
      message: "Task not found with the given ID.",
    });
  }

  return res.status(200).json({
    success: true,
    data: existence,
    message: "Task with ID retrieved.",
  });
}

function deleteByID(req, res) {
  let { id } = req.params;
  let taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex === -1) {
    return res.status(404).json({
      success: false,
      data: null,
      message: "Task not found with the given ID.",
    });
  }

  let deletedTask = tasks[taskIndex];
  tasks.splice(taskIndex, 1);
  return res.status(200).json({
    success: true,
    data: deletedTask,
    message: "Task deleted successfully.",
  });
}

function deleteAll(req, res) {
  tasks = [];
  return res.status(200).json({
    success: true,
    data: tasks,
    message: "All Tasks Deleted Successfully",
  });
}

function updateByID(req, res) {
  const { id } = req.params;
  const updates = req.body;

  // Find the task by string comparison
  const taskIndex = tasks.findIndex((task) => task.id === String(id));
  if (taskIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Task not found with the given ID.",
    });
  }

  const task = tasks[taskIndex];
  const changedFields = {};

  // Fields you allow updating
  const allowedFields = ["title", "completed"];

  for (const key of Object.keys(updates)) {
    if (allowedFields.includes(key) && task[key] !== updates[key]) {
      changedFields[key] = { old: task[key], new: updates[key] };
      task[key] = updates[key];
    }
  }

  if (Object.keys(changedFields).length === 0) {
    return res.status(200).json({
      success: true,
      message: "No changes applied.",
      data: task,
    });
  }

  return res.status(200).json({
    success: true,
    data: task,
    message: "Task updated successfully.",
    changes: changedFields,
  });
}

function taskStats(req, res) {
  let totalTasks = tasks.length;
  let totalCompletedTask = tasks.filter(
    (task) => task.completed === true
  ).length;
  let totalIncompletedTask = tasks.filter(
    (task) => task.completed === false
  ).length;

  return res.status(200).json({
    success: true,
    data: {
      "Total Tasks": totalTasks,
      "Total Completed Tasks ": totalCompletedTask,
      "Total Incomplete Tasks ": totalIncompletedTask,
    },
    message: "Task Stats Fetched Successfully",
  });
}

module.exports = {
  getTasks,
  createTask,
  getTaskByID,
  deleteByID,
  updateByID,
  deleteAll,
  taskStats,
};
