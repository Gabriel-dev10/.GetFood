/**
 * @openapi
 * /api/auth/deleta-conta:
 *   delete:
 *     summary: Encerra a conta do usuário autenticado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 description: Senha do usuário para confirmação
 *     responses:
 *       200:
 *         description: Conta encerrada com sucesso
 *       401:
 *         description: Senha incorreta ou usuário não autenticado
 *       500:
 *         description: Erro no servidor
 */
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user) {
    return NextResponse.json(
      { message: "Usuário não autenticado" },
      { status: 401 }
    );
  }

  try {
    const { password } = await req.json();

    if (!password) {
      return NextResponse.json(
        { message: "Senha é obrigatória para confirmar o encerramento" },
        { status: 400 }
      );
    }

    const user = await prisma.User.findUnique({
      where: { id: Number(session.user.id) },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    if (!user.senha) {
      return NextResponse.json(
        { message: "Usuário não possui senha definida" },
        { status: 400 }
      );
    }

    const passwordMatch = await bcrypt.compare(password, user.senha);

    if (!passwordMatch) {
      return NextResponse.json(
        { message: "Senha incorreta" },
        { status: 401 }
      );
    }

    await prisma.User.delete({
      where: { id: Number(session.user.id) },
    });

    return NextResponse.json(
      { message: "Conta encerrada com sucesso" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao encerrar conta:", error);
    return NextResponse.json(
      { message: "Erro ao encerrar conta" },
      { status: 500 }
    );
  }
}
