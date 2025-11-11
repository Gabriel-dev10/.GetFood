import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function POST(request: Request) {
  try {
    const session = await getServerSession();
    
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: "Usuário não autenticado" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { conquistaId } = body;

    if (!conquistaId) {
      return NextResponse.json(
        { error: "ID da conquista não fornecido" },
        { status: 400 }
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

    const conquistaUsuario = await prisma.User_conquistas.findUnique({
      where: {
        usuario_id_conquista_id: {
          usuario_id: usuario.id,
          conquista_id: parseInt(conquistaId),
        },
      },
      include: {
        conquistas: true,
      },
    });

    if (!conquistaUsuario) {
      return NextResponse.json(
        { error: "Conquista não encontrada ou não desbloqueada" },
        { status: 404 }
      );
    }

    if (!conquistaUsuario.desbloqueada) {
      return NextResponse.json(
        { error: "Esta conquista ainda não foi desbloqueada" },
        { status: 400 }
      );
    }

    await prisma.$executeRaw`
      UPDATE usuarios_conquistas 
      SET data_desbloqueio = NOW() 
      WHERE id = ${conquistaUsuario.id}
    `;

    return NextResponse.json({
      success: true,
      message: "Conquista resgatada com sucesso!",
      conquista: conquistaUsuario.conquistas,
    });
  } catch (error) {
    console.error("Erro ao resgatar conquista:", error);
    return NextResponse.json(
      { error: "Erro ao resgatar conquista" },
      { status: 500 }
    );
  }
}
