// app/api/jobs/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import data from "@/data/data.json"; 

export async function GET(req: NextRequest) {
  const { pathname } = new URL(req.url);
  const idStr = pathname.split("/").pop(); 
  const id = idStr ? parseInt(idStr) : null;

  if (!id) {
    return NextResponse.json({ error: "Invalid job ID" }, { status: 400 });
  }

  const job = data.find((j) => j.id === id);

  if (!job) {
    return NextResponse.json({ error: "Job not found" }, { status: 404 });
  }

  return NextResponse.json(job);
}
