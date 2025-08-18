import type React from "react"
import type { Task } from "../types/Task"

interface TaskItemProps {
  task: Task
  onToggleComplete: (id: string) => void
  onDelete: (id: string) => void
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onToggleComplete, onDelete }) => {
  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      <input
        type="checkbox"
        className="task-checkbox"
        checked={task.completed}
        onChange={() => onToggleComplete(task.id)}
      />

      <div className="task-content">
        <div className={`task-title ${task.completed ? "completed" : ""}`}>{task.title}</div>
        {task.description && <div className="task-description">{task.description}</div>}
      </div>

      <div className="task-actions">
        <button onClick={() => onDelete(task.id)} className="btn btn-danger">
          Delete
        </button>
      </div>
    </div>
  )
}
