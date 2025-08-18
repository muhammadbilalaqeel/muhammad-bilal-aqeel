import { v4 as uuidv4 } from "uuid"
import type { Task, CreateTaskRequest, UpdateTaskRequest } from "../types/Task"

class TaskModel {
  private tasks: Task[] = []


  getAllTasks(): Task[] {
    return this.tasks.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }


  getTaskById(id: string): Task | undefined {
    return this.tasks.find((task) => task.id === id)
  }

  createTask(taskData: CreateTaskRequest): Task {
    const now = new Date().toISOString()

    const newTask: Task = {
      id: uuidv4(),
      title: taskData.title,
      description: taskData.description,
      completed: false,
      createdAt: now,
      updatedAt: now,
    }

    this.tasks.push(newTask)
    return newTask
  }


  updateTask(id: string, updates: UpdateTaskRequest): Task | null {
    const taskIndex = this.tasks.findIndex((task) => task.id === id)

    if (taskIndex === -1) {
      return null
    }

    const updatedTask: Task = {
      ...this.tasks[taskIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    }

    this.tasks[taskIndex] = updatedTask
    return updatedTask
  }

  deleteTask(id: string): boolean {
    const taskIndex = this.tasks.findIndex((task) => task.id === id)

    if (taskIndex === -1) {
      return false
    }

    this.tasks.splice(taskIndex, 1)
    return true
  }

  getTaskStats() {
    const total = this.tasks.length
    const completed = this.tasks.filter((task) => task.completed).length
    const pending = total - completed

    return {
      total,
      completed,
      pending,
    }
  }
}

export const taskModel = new TaskModel()
