import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Usuário não autenticado' }, { status: 401 });
    }

    const userId = parseInt(session.user.id, 10);

    // Buscar resgates do usuário com informações da recompensa
    const resgates = await prisma.resgates.findMany({
      where: { usuario_id: userId },
      include: {
        recompensas_disponiveis: true,
      },
      orderBy: {
        data_resgate: 'desc',
      },
    });

    // Formatar dados para o frontend
    const recompensasResgatadas = resgates.map((resgate: {
      id: number;
      usuario_id: number;
      recompensa_id: number;
      data_resgate: Date | null;
      recompensas_disponiveis: {
        id: number;
        titulo: string;
        descricao: string | null;
        pontos: number;
        ativo: boolean | null;
        data_criacao: Date | null;
      };
    }) => ({
      id: resgate.id,
      titulo: resgate.recompensas_disponiveis.titulo,
      descricao: resgate.recompensas_disponiveis.descricao || '',
      pontos_gastos: resgate.recompensas_disponiveis.pontos,
      data_resgate: resgate.data_resgate,
      utilizado: false, // Por padrão, não está utilizado (pode ser implementado no futuro)
    }));

    return NextResponse.json(recompensasResgatadas);
  } catch (error) {
    console.error('Erro ao buscar recompensas resgatadas:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
