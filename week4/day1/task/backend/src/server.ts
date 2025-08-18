import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { taskRoutes } from "./routes/taskRoutes";

const app = express();
const PORT: number | string =  5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/tasks", taskRoutes);

// Health check endpoint
app.get("/api/health", (req: Request, res: Response) => {
  res.json({
    status: "OK",
    message: "Todo API is running",
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use("*", (req: Request, res: Response) => {
  res.status(404).json({ error: "Route not found" });
});

// Global error handler
app.use(
  (err: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error("Unhandled error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
);

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });


export default app;
