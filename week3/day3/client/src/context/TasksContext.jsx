import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
import { userContextValue } from "./userContext";
import { toast } from "react-toastify";

export const taskContextValue = createContext();

const TasksContext = ({ children }) => {
  const { userData } = useContext(userContextValue);
  const [tasks, setTasks] = useState([]);
  const [taskStats, setTaskStats] = useState(null);
  const getTasks = async () => {
    try {
      const req = await api.get("/tasks", {
        headers: {
          Authorization: `Bearer ${userData?.token}`,
        },
      });

      const data = req.data.data;
      setTasks(data);

      setTaskStats({
        totalTasks: data.length,
        totalCompletedTasks: data.filter((task) => task.completed === true)
          .length,
        totalPendingTasks: data.filter((task) => task.completed === false)
          .length,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const addTask = async (data) => {
    try {
      const req = await api.post("/tasks", data, {
        headers: {
          Authorization: `Bearer ${userData?.token}`,
        },
      });
      toast.success(req.data.message);
      getTasks();
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const updateTask = async (data, id) => {
    try {
      const req = await api.put(`/tasks/${id}`, data, {
        headers: {
          Authorization: `Bearer ${userData?.token}`,
        },
      });
      toast.success(req.data.message);
      getTasks();
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      const req = await api.delete(`/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${userData?.token}`,
        },
      });
      toast.success(req.data.message);
      getTasks();
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const deleteAllTasks = async () => {
    try {
      const req = await api.delete(`/tasks`, {
        headers: {
          Authorization: `Bearer ${userData?.token}`,
        },
      });
      toast.success(req.data.message);
      getTasks();
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    if (userData?.token) {
      getTasks();
    }
  }, [userData]);

  return (
    <taskContextValue.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        deleteAllTasks,
        taskStats,
      }}
    >
      {children}
    </taskContextValue.Provider>
  );
};

export default TasksContext;
