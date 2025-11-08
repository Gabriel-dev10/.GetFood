import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const recompensas = await prisma.recompensas_disponiveis.findMany({
      where: {
        ativo: true,
      },
      orderBy: {
        pontos: 'asc',
      },
    });

    return NextResponse.json(recompensas);
  } catch (error) {
    console.error("Erro ao buscar recompensas:", error);
    return NextResponse.json(
      { error: "Erro ao buscar recompensas" },
      { status: 500 }
    );
  }
}
