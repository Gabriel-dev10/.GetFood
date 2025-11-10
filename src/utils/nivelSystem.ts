/**
 * Sistema de níveis baseado em conquistas desbloqueadas
 */

import { LucideIcon } from "lucide-react";
import { Coffee, Cookie, Medal, Trophy, Flame } from "lucide-react";

export interface NivelInfo {
  nivel: number;
  titulo: string;
  icon: LucideIcon;
  iconColor: string;
  cor: string;
  corBorda: string;
  gradiente: string;
  conquistasNecessarias: number;
  conquistasProximoNivel: number | null;
  progresso: number; // 0 a 100
  imagemBorda?: string; // Caminho para imagem customizada de borda
}

/**
 * Calcula o nível do usuário baseado nas conquistas desbloqueadas
 */
export function calcularNivel(conquistasDesbloqueadas: number): NivelInfo {
  // Níveis e suas configurações
  const niveis = [
    {
      nivel: 1,
      titulo: "Iniciante",
      icon: Coffee,
      iconColor: "#CD7F32",
      min: 0,
      max: 2,
      cor: "#CD7F32",
      corBorda: "#B87333",
      gradiente: "from-[#CD7F32] via-[#E6A055] to-[#CD7F32]",
      imagemBorda: "/Img/bordas/nivel-1.svg",
    },
    {
      nivel: 2,
      titulo: "Aprendiz",
      icon: Cookie,
      iconColor: "#C0C0C0",
      min: 3,
      max: 5,
      cor: "#C0C0C0",
      corBorda: "#A8A8A8",
      gradiente: "from-[#C0C0C0] via-[#E8E8E8] to-[#C0C0C0]",
      imagemBorda: "/Img/bordas/nivel-2.svg",
    },
    {
      nivel: 3,
      titulo: "Especialista",
      icon: Medal,
      iconColor: "#FFD700",
      min: 6,
      max: 9,
      cor: "#FFD700",
      corBorda: "#FFA500",
      gradiente: "from-[#FFD700] via-[#FFED4E] to-[#FFD700]",
      imagemBorda: "/Img/bordas/nivel-3.svg",
    },
    {
      nivel: 4,
      titulo: "Mestre",
      icon: Trophy,
      iconColor: "#E5E4E2",
      min: 10,
      max: 14,
      cor: "#E5E4E2",
      corBorda: "#D3D3D3",
      gradiente: "from-[#E5E4E2] via-[#F5F5F5] to-[#E5E4E2]",
      imagemBorda: "/Img/bordas/nivel-4.svg",
    },
    {
      nivel: 5,
      titulo: "Lendário",
      icon: Flame,
      iconColor: "#FF4500",
      min: 15,
      max: Infinity,
      cor: "#FF4500",
      corBorda: "#FF6347",
      gradiente: "from-[#FF4500] via-[#FF6347] to-[#FF4500]",
      imagemBorda: "/Img/bordas/nivel-5.svg",
    },
  ];

  // Encontra o nível atual
  const nivelAtual = niveis.find(
    (n) => conquistasDesbloqueadas >= n.min && conquistasDesbloqueadas <= n.max
  ) || niveis[0];

  // Encontra o próximo nível
  const proximoNivel = niveis.find((n) => n.min > conquistasDesbloqueadas);

  // Calcula o progresso para o próximo nível
  let progresso = 0;
  if (proximoNivel) {
    const conquistasNecessarias = proximoNivel.min - nivelAtual.min;
    const conquistasAtuais = conquistasDesbloqueadas - nivelAtual.min;
    progresso = Math.min((conquistasAtuais / conquistasNecessarias) * 100, 100);
  } else {
    progresso = 100; // Nível máximo alcançado
  }

  return {
    nivel: nivelAtual.nivel,
    titulo: nivelAtual.titulo,
    icon: nivelAtual.icon,
    iconColor: nivelAtual.iconColor,
    cor: nivelAtual.cor,
    corBorda: nivelAtual.corBorda,
    gradiente: nivelAtual.gradiente,
    conquistasNecessarias: conquistasDesbloqueadas,
    conquistasProximoNivel: proximoNivel ? proximoNivel.min : null,
    progresso: Math.round(progresso),
    imagemBorda: nivelAtual.imagemBorda,
  };
}

/**
 * Retorna a classe CSS da borda animada baseada no nível
 */
export function getBordaNivel(nivel: number): string {
  const bordas = {
    1: "border-4 border-[#8B7355] shadow-[0_0_15px_rgba(139,115,85,0.5)]",
    2: "border-4 border-[#D4A574] shadow-[0_0_15px_rgba(212,165,116,0.6)]",
    3: "border-4 border-[#FFD700] shadow-[0_0_20px_rgba(255,215,0,0.7)] animate-pulse",
    4: "border-4 border-[#C0C0C0] shadow-[0_0_25px_rgba(192,192,192,0.8)] animate-pulse",
    5: "border-[5px] border-[#FF4500] shadow-[0_0_30px_rgba(255,69,0,0.9)] animate-pulse",
  };

  return bordas[nivel as keyof typeof bordas] || bordas[1];
}
