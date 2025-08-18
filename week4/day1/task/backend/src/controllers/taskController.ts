import type { Request, Response } from "express"
import { taskModel } from "../models/TaskModel"
import type { CreateTaskRequest, UpdateTaskRequest } from "../types/Task"

export const taskController = {
  // GET /api/tasks - Get all tasks
  getAllTasks: (req: Request, res: Response) => {
    try {
      const tasks = taskModel.getAllTasks()
      res.json(tasks)
    } catch (error) {
      console.error("Error getting tasks:", error)
      res.status(500).json({ error: "Internal server error" })
    }
  },

  // POST /api/tasks - Create a new task
  createTask: (req: Request, res: Response) => {
    try {
      const taskData: CreateTaskRequest = req.body

      // Validation
      if (!taskData.title || taskData.title.trim().length === 0) {
        return res.status(400).json({ error: "Title is required" })
      }

      if (taskData.title.length > 200) {
        return res.status(400).json({ error: "Title must be less than 200 characters" })
      }

      if (taskData.description && taskData.description.length > 1000) {
        return res.status(400).json({ error: "Description must be less than 1000 characters" })
      }

      const newTask = taskModel.createTask({
        title: taskData.title.trim(),
        description: taskData.description?.trim(),
      })

      res.status(201).json(newTask)
    } catch (error) {
      console.error("Error creating task:", error)
      res.status(500).json({ error: "Internal server error" })
    }
  },

  // PUT /api/tasks/:id - Update a task
  updateTask: (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const updates: UpdateTaskRequest = req.body

      // Validation
      if (updates.title !== undefined) {
        if (!updates.title || updates.title.trim().length === 0) {
          return res.status(400).json({ error: "Title cannot be empty" })
        }
        if (updates.title.length > 200) {
          return res.status(400).json({ error: "Title must be less than 200 characters" })
        }
        updates.title = updates.title.trim()
      }

      if (updates.description !== undefined && updates.description.length > 1000) {
        return res.status(400).json({ error: "Description must be less than 1000 characters" })
      }

      const updatedTask = taskModel.updateTask(id, updates)

      if (!updatedTask) {
        return res.status(404).json({ error: "Task not found" })
      }

      res.json(updatedTask)
    } catch (error) {
      console.error("Error updating task:", error)
      res.status(500).json({ error: "Internal server error" })
    }
  },

  // DELETE /api/tasks/:id - Delete a task
  deleteTask: (req: Request, res: Response) => {
    try {
      const { id } = req.params

      const deleted = taskModel.deleteTask(id)

      if (!deleted) {
        return res.status(404).json({ error: "Task not found" })
      }

      res.status(204).send()
    } catch (error) {
      console.error("Error deleting task:", error)
      res.status(500).json({ error: "Internal server error" })
    }
  },

  // GET /api/tasks/stats - Get task statistics
  getTaskStats: (req: Request, res: Response) => {
    try {
      const stats = taskModel.getTaskStats()
      res.json(stats)
    } catch (error) {
      console.error("Error getting task stats:", error)
      res.status(500).json({ error: "Internal server error" })
    }
  },
}
