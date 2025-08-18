"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI is not defined in environment variables');
        }
        await mongoose_1.default.connect(process.env.MONGO_URI, {
            dbName: "taskManagement1"
        });
        console.log('MongoDB Connected');
    }
    catch (err) {
        console.error('MongoDB connection failed', err);
        process.exit(1);
    }
};
exports.default = connectDB;
