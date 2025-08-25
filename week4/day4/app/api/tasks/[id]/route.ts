import { NextResponse } from "next/server";
import { tasks, Task } from "@/types/task";

// PATCH /api/tasks/:id
export async function PATCH(req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const body: Partial<Task> = await req.json();

  const index = tasks.findIndex((t) => t.id === id);

  if (index === -1) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }

  tasks[index] = { ...tasks[index], ...body };
  return NextResponse.json(tasks[index]);
}

// DELETE /api/tasks/:id
export async function DELETE(_: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params; 

  const index = tasks.findIndex((t) => t.id === id);

  if (index === -1) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }

  const deleted = tasks[index];
  tasks.splice(index, 1);

  return NextResponse.json({ success: true, id: deleted.id });
}
