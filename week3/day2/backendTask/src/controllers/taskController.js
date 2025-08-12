const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
  try {
    const { title } = req.query;
    let query = { user: req.user };

    if (title) {
      query.title = { $regex: title, $options: 'i' };
    }

    const tasks = await Task.find(query);
    
    if (title && tasks.length === 0) {
      return res.status(404).json({
        success: false,
        data: null,
        message: "No Task Found By this Title"
      });
    }

    res.status(200).json({
      success: true,
      data: tasks,
      message: title 
        ? `Tasks fetched successfully for title "${title}"`
        : "Tasks fetched successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      message: error.message
    });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title } = req.body;
    const task = new Task({ 
      title,
      completed: false,
      user: req.user 
    });
    
    await task.save();

    res.status(201).json({
      success: true,
      data: task,
      message: "Task Created Successfully"
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      data: null,
      message: error.message
    });
  }
};

exports.getTaskByID = async (req, res) => {
  try {
    const task = await Task.findOne({ 
      _id: req.params.id, 
      user: req.user 
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        data: null,
        message: "Task not found with the given ID."
      });
    }

    res.status(200).json({
      success: true,
      data: task,
      message: "Task with ID retrieved."
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      message: error.message
    });
  }
};

exports.deleteByID = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ 
      _id: req.params.id, 
      user: req.user 
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        data: null,
        message: "Task not found with the given ID."
      });
    }

    res.status(200).json({
      success: true,
      data: task,
      message: "Task deleted successfully."
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      message: error.message
    });
  }
};

exports.deleteAll = async (req, res) => {
  try {
    await Task.deleteMany({ user: req.user });
    
    res.status(200).json({
      success: true,
      data: [],
      message: "All Tasks Deleted Successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      message: error.message
    });
  }
};

exports.updateByID = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user },
      req.body,
      { new: true }
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        data: null,
        message: "Task not found with the given ID."
      });
    }

    res.status(200).json({
      success: true,
      data: task,
      message: "Task updated successfully."
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      data: null,
      message: error.message
    });
  }
};

exports.taskStats = async (req, res) => {
  try {
    const stats = await Task.aggregate([
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
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      message: error.message
    });
  }
};