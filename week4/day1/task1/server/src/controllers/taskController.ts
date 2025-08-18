import { Request, Response } from 'express';
import Task from '../models/Task';

interface TaskResponse {
  success: boolean;
  data: any;
  message: string;
}

interface StatsResult {
  totalTasks: number;
  totalCompleted: number;
  totalIncomplete: number;
}

interface AuthenticatedRequest extends Request {
  user: {
    _id: string;
  };
}

export const getTasks = async (req: AuthenticatedRequest, res: Response<TaskResponse>): Promise<void> => {
  try {
    const { title } = req.query as { title?: string };

    let query: any = { user: req.user._id };

    if (title) {
      query.title = { $regex: title, $options: "i" };
    }

    const tasks = await Task.find(query);

    if (title && tasks.length === 0) {
      res.status(404).json({
        success: false,
        data: null,
        message: "No Task Found By this Title",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: tasks,
      message: title
        ? `Tasks fetched successfully for title "${title}"`
        : "Tasks fetched successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      data: null,
      message: error.message,
    });
  }
};

export const createTask = async (req: AuthenticatedRequest, res: Response<TaskResponse>): Promise<void> => {
  try {
    const { title } = req.body as { title: string };
    const task = new Task({ 
      title,
      completed: false,
      user: req.user._id 
    });
    
    await task.save();

    res.status(201).json({
      success: true,
      data: task,
      message: "Task Created Successfully"
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      data: null,
      message: error.message
    });
  }
};

export const getTaskByID = async (req: AuthenticatedRequest, res: Response<TaskResponse>): Promise<void> => {
  try {
    const task = await Task.findOne({ 
      _id: req.params.id, 
      user: req.user._id 
    });

    if (!task) {
      res.status(404).json({
        success: false,
        data: null,
        message: "Task not found with the given ID."
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: task,
      message: "Task with ID retrieved."
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      data: null,
      message: error.message
    });
  }
};

export const deleteByID = async (req: AuthenticatedRequest, res: Response<TaskResponse>): Promise<void> => {
  try {
    const task = await Task.findOneAndDelete({ 
      _id: req.params.id, 
      user: req.user._id 
    });

    if (!task) {
      res.status(404).json({
        success: false,
        data: null,
        message: "Task not found with the given ID."
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: task,
      message: "Task deleted successfully."
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      data: null,
      message: error.message
    });
  }
};

export const deleteAll = async (req: AuthenticatedRequest, res: Response<TaskResponse>): Promise<void> => {
  try {
    await Task.deleteMany({ user: req.user._id });
    
    res.status(200).json({
      success: true,
      data: [],
      message: "All Tasks Deleted Successfully"
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      data: null,
      message: error.message
    });
  }
};

export const updateByID = async (req: AuthenticatedRequest, res: Response<TaskResponse>): Promise<void> => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );

    if (!task) {
      res.status(404).json({
        success: false,
        data: null,
        message: "Task not found with the given ID."
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: task,
      message: "Task updated successfully."
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      data: null,
      message: error.message
    });
  }
};

export const taskStats = async (req: AuthenticatedRequest, res: Response<TaskResponse>): Promise<void> => {
  try {
    const stats = await Task.aggregate<StatsResult>([
      { $match: { user: req.user._id } },
      {
        $group: {
          _id: null,
          totalTasks: { $sum: 1 },
          totalCompleted: { 
            $sum: { $cond: ["$completed", 1, 0] } 
          },
          totalIncomplete: { 
            $sum: { $cond: ["$completed", 0, 1] } 
          }
        }
      }
    ]);

    const result = stats[0] || {
      totalTasks: 0,
      totalCompleted: 0,
      totalIncomplete: 0
    };

    res.status(200).json({
      success: true,
      data: {
        "Total Tasks": result.totalTasks,
        "Total Completed Tasks": result.totalCompleted,
        "Total Incomplete Tasks": result.totalIncomplete
      },
      message: "Task Stats Fetched Successfully"
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      data: null,
      message: error.message
    });
  }
};