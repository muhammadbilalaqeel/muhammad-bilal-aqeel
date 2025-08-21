import  data  from '@/app/components/data/games.json';
import { NextResponse } from 'next/server';
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title");

  if (!title) {
    return NextResponse.json(
      { error: "Please provide a title query parameter" },
      { status: 400 }
    );
  }

  // Case-insensitive search
  const result = data.filter((game) =>
    game.title.toLowerCase().includes(title.toLowerCase())
  );

  return NextResponse.json(result);
}