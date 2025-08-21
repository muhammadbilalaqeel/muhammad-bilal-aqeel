import { NextResponse } from "next/server";
import  data  from '@/app/components/data/games.json';



export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const game = data.find((g) => g.id === Number(id));

  if (!game) {
    return NextResponse.json({ error: "Game not found" }, { status: 404 });
  }

  return NextResponse.json(game);
}
