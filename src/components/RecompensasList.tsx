"use client";

import { motion } from "framer-motion";
import { Gift, Loader2 } from "lucide-react";

export interface Recompensa {
  id: number;
  titulo: string;
  descricao?: string | null;
  pontos: number;
  ativo: boolean;
}

interface RecompensasListProps {
  recompensas: Recompensa[];
  loading?: boolean;
  pontosUsuario?: number;
  onResgatar?: (recompensaId: number) => void;
}

export default function RecompensasList({
  recompensas,
  loading = false,
  pontosUsuario = 0,
}: RecompensasListProps) {
  if (loading) {
    return (
      <section className="mb-10">
        <h2 className="text-lg text-[#4E2010] font-bold mb-4 uppercase tracking-wide">
          Recompensas Disponíveis
        </h2>
        <div className="flex justify-center items-center py-10">
          <Loader2 className="animate-spin text-[#4E2010]" size={40} />
        </div>
      </section>
    );
  }

  if (recompensas.length === 0) {
    return (
      <section className="mb-10">
        <h2 className="text-lg text-[#4E2010] font-bold mb-4 uppercase tracking-wide">
          Recompensas Disponíveis
        </h2>
        <div className="bg-black/50 p-6 rounded-xl text-center">
          <p className="text-white/70">
            Nenhuma recompensa disponível no momento.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-10">
      <h2 className="text-lg text-[#4E2010] font-bold mb-4 uppercase tracking-wide">
        Recompensas Disponíveis
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {recompensas.map((recompensa) => {
          const podeResgatar = pontosUsuario >= recompensa.pontos;

          return (
            <motion.div
              key={recompensa.id}
              className={`bg-black/50 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition group ${
                podeResgatar ? "border-2 border-green-500/30" : ""
              }`}
              whileHover={{ scale: 1.03 }}
            >
              <div className="p-4 text-sm">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-bold text-white">{recompensa.titulo}</p>
                  {podeResgatar && (
                    <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full">
                      ✓
                    </span>
                  )}
                </div>
                {recompensa.descricao && (
                  <p className="text-xs text-white/50 mb-2 line-clamp-2">
                    {recompensa.descricao}
                  </p>
                )}
                <p className="text-xs text-white/70 flex items-center gap-1 mb-3">
                  <Gift size={14} aria-label="Ícone de presente" />{" "}
                  {recompensa.pontos} pontos
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
