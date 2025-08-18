"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
// import taskRoutes from './routes/taskRoutes';
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config({ path: __dirname + '/.env' });
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "https://day3client.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));
// console.log("MONGO_URI from env:", process.env.MONGO_URI);
// connectDB();
app.use(express_1.default.json());
// app.use('/api', authRoutes);
// app.use('/api', taskRoutes);
exports.default = app;
