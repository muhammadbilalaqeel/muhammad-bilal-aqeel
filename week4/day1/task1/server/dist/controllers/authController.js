"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = __importDefault(require("../models/User"));
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let user = await User_1.default.findOne({ email });
        if (user) {
            res.status(400).json({
                success: false,
                data: null,
                message: 'User already exists'
            });
            return;
        }
        user = new User_1.default({ name, email, password });
        await user.save();
        const responseData = {
            id: user._id.toString(),
            name: user.name,
            email: user.email
        };
        res.status(201).json({
            success: true,
            data: responseData,
            message: 'User registered successfully'
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            data: null,
            message: err.message
        });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User_1.default.findOne({ email });
        if (!user) {
            res.status(400).json({
                success: false,
                data: null,
                message: 'Invalid credentials'
            });
            return;
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({
                success: false,
                data: null,
                message: 'Invalid credentials'
            });
            return;
        }
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined');
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        const responseData = {
            token,
            user: {
                id: user._id.toString(),
                name: user.name,
                email: user.email
            }
        };
        res.json({
            success: true,
            data: responseData,
            message: 'Login successful'
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            data: null,
            message: err.message
        });
    }
};
exports.login = login;
