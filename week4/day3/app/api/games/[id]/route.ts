import { NextRequest, NextResponse } from "next/server";
import data from "@/app/components/data/games.json";
import type { Game } from "@/app/types/game";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }   
) {
  const { id } = await context.params;  

  const idNum = Number(id);
  if (isNaN(idNum)) {
    return NextResponse.json(
      { success: false, message: "Invalid game ID" },
      { status: 400 }
    );
  }

  const game: Game | undefined = data.find((g) => g.id === idNum);

  if (!game) {
    return NextResponse.json(
      { success: false, message: "Game not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, data: game }, { status: 200 });
}
