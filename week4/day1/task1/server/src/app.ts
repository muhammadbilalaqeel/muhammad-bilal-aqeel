import express, { Express } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
// import taskRoutes from './routes/taskRoutes';
import cors from 'cors';

dotenv.config({ path: __dirname + '/.env' });

const app: Express = express();

app.use(cors({
  origin: "https://day3client.vercel.app", 
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));

// console.log("MONGO_URI from env:", process.env.MONGO_URI);

// connectDB();

app.use(express.json());

// app.use('/api', authRoutes);
// app.use('/api', taskRoutes);

export default app;

