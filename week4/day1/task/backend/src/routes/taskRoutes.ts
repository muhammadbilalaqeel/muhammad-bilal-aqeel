import { Router } from "express"
import { taskController } from "../controllers/taskController"

const router = Router()

// GET /api/tasks/stats - Must come before /:id route
router.get("/stats", taskController.getTaskStats)

// GET /api/tasks - Get all tasks
router.get("/", taskController.getAllTasks)

// POST /api/tasks - Create a new task
router.post("/", taskController.createTask)

// PUT /api/tasks/:id - Update a task
router.put("/:id", taskController.updateTask)

// DELETE /api/tasks/:id - Delete a task
router.delete("/:id", taskController.deleteTask)

export { router as taskRoutes }
