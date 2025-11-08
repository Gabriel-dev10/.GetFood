import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
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
    const { codigoQR } = body;

    if (!codigoQR) {
      return NextResponse.json(
        { error: "Código QR não fornecido" },
        { status: 400 }
      );
    }

    // Verificar se o QR Code está cadastrado no banco
    const qrCodeValido = await prisma.qr_codes.findUnique({
      where: { codigo: codigoQR },
    });

    if (!qrCodeValido) {
      return NextResponse.json(
        { error: "QR Code inválido ou não cadastrado" },
        { status: 400 }
      );
    }

    const usuario = await prisma.usuarios.findUnique({
      where: { email: session.user.email },
      select: { id: true, pontos_total: true },
    });

    if (!usuario) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    const scanExistente = await prisma.$queryRaw`
      SELECT * FROM qr_scans 
      WHERE usuario_id = ${usuario.id} 
      AND codigo_qr = ${codigoQR}
      AND DATE(data_scan) = CURDATE()
    `;

    if (Array.isArray(scanExistente) && scanExistente.length > 0) {
      return NextResponse.json(
        { error: "Você já escaneou este QR Code hoje!", jaScanneado: true },
        { status: 400 }
      );
    }

    const pontosGanhos = 10;

    await prisma.$executeRaw`
      INSERT INTO qr_scans (usuario_id, codigo_qr, pontos_ganhos, data_scan)
      VALUES (${usuario.id}, ${codigoQR}, ${pontosGanhos}, NOW())
    `;

    const usuarioAtualizado = await prisma.usuarios.update({
      where: { id: usuario.id },
      data: {
        pontos_total: {
          increment: pontosGanhos,
        },
      },
      select: {
        id: true,
        nome: true,
        pontos_total: true,
      },
    });

    await prisma.$executeRaw`
      INSERT INTO estatisticas_usuario (usuario_id, total_qr_scans, ultima_atividade)
      VALUES (${usuario.id}, 1, NOW())
      ON DUPLICATE KEY UPDATE 
        total_qr_scans = total_qr_scans + 1,
        ultima_atividade = NOW()
    `;

    await prisma.$executeRaw`
      INSERT INTO atividades_usuario (usuario_id, tipo_atividade, descricao, pontos_ganhos)
      VALUES (${usuario.id}, 'scan_qr', 'QR Code escaneado', ${pontosGanhos})
    `;

    try {
      await fetch(`${request.url.split('/api')[0]}/api/conquistas/desbloquear`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.warn("Erro ao desbloquear conquistas:", error);
    }

    return NextResponse.json({
      success: true,
      message: `+${pontosGanhos} pontos!`,
      pontosGanhos,
      pontosTotal: usuarioAtualizado.pontos_total,
      usuario: usuarioAtualizado,
    });
  } catch (error: any) {
    console.error("Erro ao registrar scan:", error);
    return NextResponse.json(
      { error: "Erro ao registrar scan", details: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const session = await getServerSession();
    
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: "Usuário não autenticado" },
        { status: 401 }
      );
    }

    const usuario = await prisma.usuarios.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    });

    if (!usuario) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    const scans = await prisma.$queryRaw`
      SELECT * FROM qr_scans 
      WHERE usuario_id = ${usuario.id}
      ORDER BY data_scan DESC
      LIMIT 50
    `;

    const estatisticas = await prisma.$queryRaw`
      SELECT * FROM estatisticas_usuario
      WHERE usuario_id = ${usuario.id}
    `;

    return NextResponse.json({
      scans,
      estatisticas: Array.isArray(estatisticas) && estatisticas.length > 0 ? estatisticas[0] : null,
    });
  } catch (error: any) {
    console.error("Erro ao buscar histórico:", error);
    return NextResponse.json(
      { error: "Erro ao buscar histórico", details: error.message },
      { status: 500 }
    );
  }
}
