"use client";

import { motion } from "framer-motion";

interface ProgressCardProps {
  userName?: string | null;
  pontos: number;
  nivel: number;
  meta: number;
  validade: string;
}

export default function ProgressCard({
  userName,
  pontos,
  nivel,
  meta,
  validade,
}: ProgressCardProps) {
  const progresso = (pontos / meta) * 100;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-black/50 p-7 rounded-2xl shadow-lg mb-10 relative overflow-hidden"
    >
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-xl font-bold text-white">
            Olá,{" "}
            <span className="text-[#C9A882]">{userName ?? "User"}!</span>
          </p>
          <p className="text-sm text-white/80">Nível {nivel}</p>
        </div>
        <div className="text-right">
          <span className="text-xs text-white/70">Pontos</span>
          <p className="text-3xl font-extrabold text-[#4E2010]">{pontos}</p>
          <p className="text-xs text-white/70">Válido até {validade}</p>
        </div>
      </div>

      <div className="w-full h-2 bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A] rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-[#8B4513]"
          initial={{ width: 0 }}
          animate={{ width: `${progresso}%` }}
          transition={{ duration: 1 }}
        />
      </div>
      <p className="text-xs text-right mt-1 text-white/70">
        {progresso.toFixed(1)}% até o próximo nível ({meta} pontos)
      </p>
    </motion.section>
  );
}
