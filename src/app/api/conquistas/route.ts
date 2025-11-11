import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

/**
 * GET /api/conquistas
 * Retorna lista de conquistas do sistema
 * TODO: Integrar com banco de dados e calcular desbloqueios automaticamente
 */
export async function GET() {
  try {
    const session = await getServerSession();
    
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: "Usuário não autenticado" },
        { status: 401 }
      );
    }

    const usuario = await prisma.User.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    });

    if (!usuario) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    const conquistas = await prisma.conquistas.findMany({
      where: { ativo: true },
      include: {
        usuarios_conquistas: {
          where: { usuario_id: usuario.id },
        },
      },
      orderBy: { pontos_necessarios: "asc" },
    });

    const conquistasFormatadas = conquistas.map((conquista) => ({
      id: conquista.id,
      titulo: conquista.titulo,
      descricao: conquista.descricao,
      icone: conquista.icone,
      pontos_necessarios: conquista.pontos_necessarios,
      desbloqueada: conquista.usuarios_conquistas.length > 0 
        ? conquista.usuarios_conquistas[0].desbloqueada 
        : false,
      data_desbloqueio: conquista.usuarios_conquistas.length > 0
        ? conquista.usuarios_conquistas[0].data_desbloqueio
        : null,
    }));

    return NextResponse.json(conquistas);
  } catch (error) {
    console.error("Erro ao buscar conquistas:", error);
    return NextResponse.json(
      { error: "Erro ao buscar conquistas" },
      { status: 500 }
    );
  }
}
