import { NextResponse } from "next/server";
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

    // Lista fixa das 13 conquistas do sistema
    // TODO: Buscar do banco e calcular desbloqueadas baseado em:
    // - QR Scans (tabela qr_scans)
    // - Resgates (tabela atividades_usuario tipo='resgate')
    // - Pontos (soma histórica de atividades_usuario.pontos_ganhos)
    const conquistas = [
      {
        id: 1,
        titulo: "Escaneie seu primeiro QR Code",
        descricao: "Faça seu primeiro scan de QR Code",
        icone: "Coffee",
        pontos_necessarios: 0,
        desbloqueada: false,
        data_desbloqueio: null,
      },
      {
        id: 2,
        titulo: "Resgate sua primeira recompensa",
        descricao: "Resgate sua primeira recompensa no sistema",
        icone: "Gift",
        pontos_necessarios: 0,
        desbloqueada: false,
        data_desbloqueio: null,
      },
      {
        id: 3,
        titulo: "Escaneie 5 QR Codes",
        descricao: "Escaneie 5 QR Codes diferentes",
        icone: "QrCode",
        pontos_necessarios: 0,
        desbloqueada: false,
        data_desbloqueio: null,
      },
      {
        id: 4,
        titulo: "Escaneie 10 QR Codes",
        descricao: "Escaneie 10 QR Codes diferentes",
        icone: "Scan",
        pontos_necessarios: 0,
        desbloqueada: false,
        data_desbloqueio: null,
      },
      {
        id: 5,
        titulo: "Resgate 5 recompensas",
        descricao: "Resgate 5 recompensas no sistema",
        icone: "Package",
        pontos_necessarios: 0,
        desbloqueada: false,
        data_desbloqueio: null,
      },
      {
        id: 6,
        titulo: "Acumule 100 pontos",
        descricao: "Acumule 100 pontos no total",
        icone: "Coins",
        pontos_necessarios: 0,
        desbloqueada: false,
        data_desbloqueio: null,
      },
      {
        id: 7,
        titulo: "Resgate 10 recompensas",
        descricao: "Resgate 10 recompensas no sistema",
        icone: "ShoppingBag",
        pontos_necessarios: 0,
        desbloqueada: false,
        data_desbloqueio: null,
      },
      {
        id: 8,
        titulo: "Escaneie 25 QR Codes",
        descricao: "Escaneie 25 QR Codes diferentes",
        icone: "Medal",
        pontos_necessarios: 0,
        desbloqueada: false,
        data_desbloqueio: null,
      },
      {
        id: 9,
        titulo: "Acumule 250 pontos",
        descricao: "Acumule 250 pontos no total",
        icone: "Wallet",
        pontos_necessarios: 0,
        desbloqueada: false,
        data_desbloqueio: null,
      },
      {
        id: 10,
        titulo: "Resgate 20 recompensas",
        descricao: "Resgate 20 recompensas no sistema",
        icone: "Award",
        pontos_necessarios: 0,
        desbloqueada: false,
        data_desbloqueio: null,
      },
      {
        id: 11,
        titulo: "Escaneie 50 QR Codes",
        descricao: "Escaneie 50 QR Codes diferentes",
        icone: "Trophy",
        pontos_necessarios: 0,
        desbloqueada: false,
        data_desbloqueio: null,
      },
      {
        id: 12,
        titulo: "Acumule 500 pontos",
        descricao: "Acumule 500 pontos no total",
        icone: "DollarSign",
        pontos_necessarios: 0,
        desbloqueada: false,
        data_desbloqueio: null,
      },
      {
        id: 13,
        titulo: "Acumule 1000 pontos",
        descricao: "Acumule 1000 pontos no total",
        icone: "Flame",
        pontos_necessarios: 0,
        desbloqueada: false,
        data_desbloqueio: null,
      },
    ];

    return NextResponse.json(conquistas);
  } catch (error) {
    console.error("Erro ao buscar conquistas:", error);
    return NextResponse.json(
      { error: "Erro ao buscar conquistas" },
      { status: 500 }
    );
  }
}
