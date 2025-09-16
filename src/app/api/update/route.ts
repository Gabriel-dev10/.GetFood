import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Usuário não autenticado' }, { status: 401 });
  }
  
  try {
    const { nome, email } = await req.json();

    if (!email || !nome) {
      return NextResponse.json({ error: 'Campos obrigatórios faltando' }, { status: 400 });
    }

    // Verifica se o email já existe para outro usuário
    const existingUser = await prisma.usuarios.findFirst({
      where: {
        email: email,
        id: { not: Number(session.user.id) }
      }
    });

    if (existingUser) {
      return NextResponse.json({ error: 'Este email já está em uso' }, { status: 409 });
    }

    const updatedUser = await prisma.usuarios.update({
      where: { id: Number(session.user.id) },
      data: { 
        nome,
        email 
      }
    });

    return NextResponse.json({ 
      message: "Usuário atualizado com sucesso",
      user: {
        id: updatedUser.id,
        name: updatedUser.nome,
        email: updatedUser.email
      }
    });
    
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    return NextResponse.json({ error: 'Erro no servidor' }, { status: 500 });
  }
}