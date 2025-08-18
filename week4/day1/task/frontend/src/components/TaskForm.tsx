import type React from "react"
import { useState } from "react"
import type { CreateTaskRequest, Task } from "../types/Task"

interface TaskFormProps {
  onSubmit: (taskData: CreateTaskRequest | Task) => void
  loading: boolean
  initialData?: Task | null
  onCancel?: () => void
}

export const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, loading = false }) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim()) {
      alert("Please enter a task title")
      return
    }

    onSubmit({
      title: title.trim(),
      description: description.trim() || undefined,
    })

    // Reset form
    setTitle("")
    setDescription("")
  }

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h2>Add New Task</h2>

      <div className="form-group">
        <label htmlFor="title">Title *</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title..."
          disabled={loading}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter task description (optional)..."
          disabled={loading}
        />
      </div>

      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? "Adding..." : "Add Task"}
      </button>
    </form>
  )
}
