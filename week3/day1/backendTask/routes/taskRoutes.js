
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
