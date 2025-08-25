"use client";
import { useState } from "react";
import {
  CheckCircle2,
  Clock,
  Plus,
  Trash2,
  Check,
  AlertCircle,
  ListTodo,
  BarChart3
} from "lucide-react";
import { useAddTaskMutation, useFetchTasksQuery, useRemoveTaskMutation, useToggleTaskMutation } from "./services/taskApi";



export default function HomePage() {
  const { data: tasks = [], error, isLoading } = useFetchTasksQuery();
  const [addTask] = useAddTaskMutation();
  const [toggleTask] = useToggleTaskMutation();
  const [removeTask] = useRemoveTaskMutation();
  const [title, setTitle] = useState("");
  const handleAdd = async () => {
    if (!title.trim()) return;
    await addTask(title);
    setTitle("");
  };
  const stats = {
    completed: tasks.filter((t) => t.completed).length,
    pending: tasks.filter((t) => !t.completed).length,
    total: tasks.length,
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-12 px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Task Manager
          </h1>
          <p className="text-gray-600 text-lg">
            Keep track of your daily tasks
          </p>
        </div>
        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border text-center">
            <CheckCircle2 className="w-8 h-8 text-green-500 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-800">{stats.completed}</div>
            <div className="text-gray-500 text-sm">Completed</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border text-center">
            <Clock className="w-8 h-8 text-orange-500 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-800">{stats.pending}</div>
            <div className="text-gray-500 text-sm">Pending</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border text-center">
            <BarChart3 className="w-8 h-8 text-blue-500 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-800">{stats.total}</div>
            <div className="text-gray-500 text-sm">Total</div>
          </div>
        </div>
        {/* Add Task */}
        <div className="bg-white rounded-xl p-6 shadow-sm border mb-8">
          <div className="flex gap-4">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Add a new task..."
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
              className="flex-1 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={handleAdd}
              disabled={!title.trim()}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>
        </div>
        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-500 mr-3" />
              <span className="text-red-700">Failed to load tasks</span>
            </div>
          </div>
        )}
        {/* Task List */}
        <div className="bg-white rounded-xl shadow-sm border">
          <div className="p-6">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <span className="text-gray-600">Loading tasks...</span>
              </div>
            ) : tasks.length === 0 ? (
              <div className="text-center py-16">
                <ListTodo className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-700 mb-2">No tasks yet</h3>
                <p className="text-gray-500">Add your first task to get started!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {tasks.map((t) => (
                  <div
                    key={t.id}
                    className={`flex items-center justify-between p-4 rounded-lg border-2 transition-colors ${
                      t.completed
                        ? 'border-green-200 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={t.completed}
                          onChange={() => toggleTask(t)}
                          className="sr-only"
                        />
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                          t.completed
                            ? 'border-green-500 bg-green-500'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}>
                          {t.completed && (
                            <Check className="w-3 h-3 text-white" />
                          )}
                        </div>
                      </label>
                      <span
                        className={`text-gray-800 transition-all ${
                          t.completed ? "line-through text-gray-500" : ""
                        }`}
                      >
                        {t.title}
                      </span>
                    </div>
                    <button
                      onClick={() => removeTask(t.id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                      title="Delete task"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}