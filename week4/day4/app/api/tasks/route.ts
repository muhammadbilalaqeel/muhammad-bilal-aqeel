import { NextResponse } from "next/server";
import { tasks, Task } from "@/types/task";

// GET /api/tasks
export async function GET() {
  return NextResponse.json(tasks);
}

// POST /api/tasks
export async function POST(req: Request) {
  const body: Partial<Task> = await req.json();

  if (!body.title) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  const newTask: Task = {
    id: Date.now().toString(),
    title: body.title,
    completed: false,
  };

  tasks.unshift(newTask);
  return NextResponse.json(newTask);
}
