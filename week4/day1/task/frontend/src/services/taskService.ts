import axios from "axios"
import type { Task, CreateTaskRequest, UpdateTaskRequest, TaskStats } from "../types/Task"

const API_BASE_URL = "/api"

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

export const taskService = {
  // Get all tasks
  async getAllTasks(): Promise<Task[]> {
    const response = await api.get<Task[]>("/tasks")
    return response.data
  },

  // Create a new task
  async createTask(task: CreateTaskRequest): Promise<Task> {
    const response = await api.post<Task>("/tasks", task)
    return response.data
  },

  // Update a task
  async updateTask(id: string, updates: UpdateTaskRequest): Promise<Task> {
    const response = await api.put<Task>(`/tasks/${id}`, updates)
    return response.data
  },

  // Delete a task
  async deleteTask(id: string): Promise<void> {
    await api.delete(`/tasks/${id}`)
  },

  // Get task statistics
  async getTaskStats(): Promise<TaskStats> {
    const response = await api.get<TaskStats>("/tasks/stats")
    return response.data
  },
}
