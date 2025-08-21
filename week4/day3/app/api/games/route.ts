// app/api/games/route.ts
import { NextResponse } from "next/server";
import data from "@/app/components/data/games.json";

export async function GET() {
  return NextResponse.json({
    data,
  });
}