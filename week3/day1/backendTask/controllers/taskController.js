const { v4: uuidv4 } = require("uuid");

let tasks = [];


/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks or filter tasks by title query parameter
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
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       title:
 *                         type: string
 *                       completed:
 *                         type: boolean
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                 message:
 *                   type: string
 *       404:
 *         description: No tasks found matching title
 */

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
  res.status(200).json({
    success: true,
    data: tasks,
    message: "Tasks fetched successfully",
  });
}




/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     requestBody:
 *       description: Task object that needs to be added
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *     responses:
 *       201:
 *         description: Task created successfully
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
 *                     id:
 *                       type: string
 *                     title:
 *                       type: string
 *                     completed:
 *                       type: boolean
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                 message:
 *                   type: string
 */

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

  res.status(201).json({
    success: true,
    data: newTask,
    message: "Task Created Successfully",
  });
}



/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get task by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Task ID
 *         required: true
 *         schema:
 *           type: string
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
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     title:
 *                       type: string
 *                     completed:
 *                       type: boolean
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                 message:
 *                   type: string
 *       404:
 *         description: Task not found
 */

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

  res.status(200).json({
    success: true,
    data: existence,
    message: "Task with ID retrieved.",
  });
}




/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete task by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Task ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                 message:
 *                   type: string
 *       404:
 *         description: Task not found
 */

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
  res.status(200).json({
    success: true,
    data: deletedTask,
    message: "Task deleted successfully.",
  });
}




/**
 * @swagger
 * /tasks:
 *   delete:
 *     summary: Delete all tasks
 *     responses:
 *       200:
 *         description: All tasks deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items: {}
 *                 message:
 *                   type: string
 */

function deleteAll(req, res) {
  tasks = [];
  res.status(200).json({
    success: true,
    data: tasks,
    message: "All Tasks Deleted Successfully",
  });
}



/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update task by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Task ID
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Task fields to update (title, completed)
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               completed:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Task updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                 message:
 *                   type: string
 *                 changes:
 *                   type: object
 *                   description: Changed fields with old and new values
 *       404:
 *         description: Task not found
 */

function updateByID(req, res) {
  const { id } = req.params;
  const updates = req.body;

  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Task not found with the given ID.",
    });
  }

  const task = tasks[taskIndex];
  const changedFields = {};

  for (const key in updates) {
    if (task[key] !== updates[key]) {
      changedFields[key] = { old: task[key], new: updates[key] };
      task[key] = updates[key];
    }
  }

  res.status(200).json({
    success: true,
    data: task,
    message: "Task updated successfully.",
    changes: changedFields,
  });
}



/**
 * @swagger
 * /stats:
 *   get:
 *     summary: Get task statistics
 *     responses:
 *       200:
 *         description: Task statistics fetched successfully
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

function taskStats(req, res) {
  let totalTasks = tasks.length;
  let totalCompletedTask = tasks.filter((task) => task.completed === true).length;
  let totalIncompletedTask = tasks.filter((task) => task.completed === false).length;

  res.status(200).json({
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
