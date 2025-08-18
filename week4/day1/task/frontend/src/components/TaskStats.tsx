import type React from "react"
import type { TaskStats as TaskStatsType } from "../types/Task"

interface TaskStatsProps {
  stats: TaskStatsType
}

export const TaskStats: React.FC<TaskStatsProps> = ({ stats }) => {
  const completionPercentage = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0

  return (
    <div className="stats">
      <h2>Task Statistics</h2>
      <div className="stats-grid">
        <div className="stat-item">
          <div className="stat-number">{stats.total}</div>
          <div className="stat-label">Total Tasks</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">{stats.completed}</div>
          <div className="stat-label">Completed</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">{stats.pending}</div>
          <div className="stat-label">Pending</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">{completionPercentage}%</div>
          <div className="stat-label">Progress</div>
        </div>
      </div>
    </div>
  )
}
