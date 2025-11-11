import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { recompensaId } = body;

    if (!recompensaId) {
      return NextResponse.json({ error: 'Recompensa ID é obrigatório' }, { status: 400 });
    }

    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Usuário não autenticado' }, { status: 401 });
    }

    const userId = parseInt(session.user.id, 10);

    const user = await prisma.usuarios.findUnique({
      where: { id: userId },
    });

    const recompensa = await prisma.recompensas_disponiveis.findUnique({
      where: { id: recompensaId },
    });

    if (!user || !recompensa) {
      return NextResponse.json({ error: 'Usuário ou recompensa não encontrados' }, { status: 404 });
    }

    if (user.pontos_total < recompensa.pontos) {
      return NextResponse.json({ error: 'Pontos insuficientes' }, { status: 400 });
    }

    const pontosRestantes = user.pontos_total - recompensa.pontos;

    await prisma.usuarios.update({
      where: { id: userId },
      data: { pontos_total: pontosRestantes },
    });

    await prisma.resgates.create({
      data: {
        usuario_id: userId,
        recompensa_id: recompensaId,
        data_resgate: new Date(),
      },
    });

    return NextResponse.json({ 
      message: 'Recompensa resgatada com sucesso',
      pontosRestantes 
    });
  } catch (error) {
    console.error('Erro ao resgatar recompensa:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}