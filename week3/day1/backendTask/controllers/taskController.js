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
 *             schema:\\
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
