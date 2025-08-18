"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskStats = exports.updateByID = exports.deleteAll = exports.deleteByID = exports.getTaskByID = exports.createTask = exports.getTasks = void 0;
const Task_1 = __importDefault(require("../models/Task"));
const getTasks = async (req, res) => {
    try {
        const { title } = req.query;
        let query = { user: req.user._id };
        if (title) {
            query.title = { $regex: title, $options: "i" };
        }
        const tasks = await Task_1.default.find(query);
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            data: null,
            message: error.message,
        });
    }
};
exports.getTasks = getTasks;
const createTask = async (req, res) => {
    try {
        const { title } = req.body;
        const task = new Task_1.default({
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
    }
    catch (error) {
        res.status(400).json({
            success: false,
            data: null,
            message: error.message
        });
    }
};
exports.createTask = createTask;
const getTaskByID = async (req, res) => {
    try {
        const task = await Task_1.default.findOne({
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            data: null,
            message: error.message
        });
    }
};
exports.getTaskByID = getTaskByID;
const deleteByID = async (req, res) => {
    try {
        const task = await Task_1.default.findOneAndDelete({
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            data: null,
            message: error.message
        });
    }
};
exports.deleteByID = deleteByID;
const deleteAll = async (req, res) => {
    try {
        await Task_1.default.deleteMany({ user: req.user._id });
        res.status(200).json({
            success: true,
            data: [],
            message: "All Tasks Deleted Successfully"
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            data: null,
            message: error.message
        });
    }
};
exports.deleteAll = deleteAll;
const updateByID = async (req, res) => {
    try {
        const task = await Task_1.default.findOneAndUpdate({ _id: req.params.id, user: req.user._id }, req.body, { new: true });
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
    }
    catch (error) {
        res.status(400).json({
            success: false,
            data: null,
            message: error.message
        });
    }
};
exports.updateByID = updateByID;
const taskStats = async (req, res) => {
    try {
        const stats = await Task_1.default.aggregate([
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            data: null,
            message: error.message
        });
    }
};
exports.taskStats = taskStats;
