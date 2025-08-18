"use client"

import type React from "react"
import { useState, useEffect } from "react"
import type { Task, CreateTaskRequest, TaskStats as TaskStatsType } from "./types/Task"
import { taskService } from "./services/taskService"
import { TaskForm } from "./components/TaskForm"
import { TaskItem } from "./components/TaskItem"
import { TaskStats } from "./components/TaskStats"

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [stats, setStats] = useState<TaskStatsType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  // Load tasks and stats on component mount
  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      setError(null)

      const [tasksData, statsData] = await Promise.all([taskService.getAllTasks(), taskService.getTaskStats()])

      setTasks(tasksData)
      setStats(statsData)
    } catch (err) {
      setError("Failed to load tasks. Please try again.")
      console.error("Error loading data:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateTask = async (taskData: CreateTaskRequest) => {
    try {
      setSubmitting(true)
      const newTask = await taskService.createTask(taskData)
      setTasks((prev) => [newTask, ...prev])

      // Update stats
      if (stats) {
        setStats({
          ...stats,
          total: stats.total + 1,
          pending: stats.pending + 1,
        })
      }
    } catch (err) {
      alert("Failed to create task. Please try again.")
      console.error("Error creating task:", err)
    } finally {
      setSubmitting(false)
    }
  }

  const handleToggleComplete = async (id: string) => {
    const task = tasks.find((t) => t.id === id)
    if (!task) return

    try {
      const updatedTask = await taskService.updateTask(id, {
        completed: !task.completed,
      })

      setTasks((prev) => prev.map((t) => (t.id === id ? updatedTask : t)))

      // Update stats
      if (stats) {
        const completedDelta = updatedTask.completed ? 1 : -1
        setStats({
          ...stats,
          completed: stats.completed + completedDelta,
          pending: stats.pending - completedDelta,
        })
      }
    } catch (err) {
      alert("Failed to update task. Please try again.")
      console.error("Error updating task:", err)
    }
  }

  const handleDeleteTask = async (id: string) => {
    const task = tasks.find((t) => t.id === id)
    if (!task) return

    if (!confirm("Are you sure you want to delete this task?")) {
      return
    }

    try {
      await taskService.deleteTask(id)
      setTasks((prev) => prev.filter((t) => t.id !== id))

      // Update stats
      if (stats) {
        setStats({
          ...stats,
          total: stats.total - 1,
          completed: task.completed ? stats.completed - 1 : stats.completed,
          pending: task.completed ? stats.pending : stats.pending - 1,
        })
      }
    } catch (err) {
      alert("Failed to delete task. Please try again.")
      console.error("Error deleting task:", err)
    }
  }

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Loading tasks...</div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="header">
        <h1>Todo App</h1>
        {/* <p>A simple todo application built with React, TypeScript, and Express</p> */}
      </div>

      {error && (
        <div className="error">
          {error}
          <button onClick={loadData} className="btn btn-primary" style={{ marginLeft: "10px" }}>
            Retry
          </button>
        </div>
      )}

      <TaskForm onSubmit={handleCreateTask} loading={submitting} />

      {stats && <TaskStats stats={stats} />}

      <div className="task-list">
        <h2>Tasks ({tasks.length})</h2>
        {tasks.length === 0 ? (
          <div className="empty-state">
            <p>No tasks yet. Create your first task above!</p>
          </div>
        ) : (
          tasks.map((task) => (
            <TaskItem key={task.id} task={task} onToggleComplete={handleToggleComplete} onDelete={handleDeleteTask} />
          ))
        )}
      </div>
    </div>
  )
}

export default App
