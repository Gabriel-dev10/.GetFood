"use client";

import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, Trophy } from "lucide-react";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export interface Conquista {
  id: number;
  titulo: string;
  descricao: string;
  icone: string;
  pontos_necessarios: number;
  desbloqueada: boolean;
  data_desbloqueio?: Date | null;
}

interface ConquistasListProps {
  conquistas: Conquista[];
  loading?: boolean;
  pontosUsuario?: number;
  onResgatar?: (conquistaId: number) => void;
}

export default function ConquistasList({
  conquistas,
  loading = false,
  pontosUsuario = 0,
  onResgatar,
}: ConquistasListProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  if (loading) {
    return (
      <section className="mb-10">
        <h2 className="text-lg text-[#4E2010] font-bold mb-4 uppercase tracking-wide">
          Conquistas
        </h2>
        <div className="flex justify-center items-center py-10">
          <Loader2 className="animate-spin text-[#4E2010]" size={40} />
        </div>
      </section>
    );
  }

  if (conquistas.length === 0) {
    return (
      <section className="mb-10">
        <h2 className="text-lg text-[#4E2010] font-bold mb-4 uppercase tracking-wide">
          Conquistas
        </h2>
        <div className="bg-black/50 p-6 rounded-xl text-center">
          <p className="text-white/70">Nenhuma conquista disponível no momento.</p>
        </div>
      </section>
    );
  }

  const conquistasDesbloqueadas = conquistas.filter((c) => c.desbloqueada);
  const conquistasBloqueadas = conquistas.filter((c) => !c.desbloqueada);

  return (
    <section className="mb-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg text-[#4E2010] font-bold uppercase tracking-wide">
          Conquistas {conquistas.length > 0 && `(${conquistasDesbloqueadas.length}/${conquistas.length})`}
        </h2>
        {conquistas.length > 2 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-[#4E2010] font-semibold text-sm hover:text-[#3c1c11] transition"
          >
            {isExpanded ? (
              <>
                <span>Mostrar Menos</span>
                <ChevronUp size={20} />
              </>
            ) : (
              <>
                <span>Ver Todas</span>
                <ChevronDown size={20} />
              </>
            )}
          </button>
        )}
      </div>

      {conquistasBloqueadas.length > 0 && (
        <div>
          <h3 className="text-sm text-[#4E2010] font-semibold mb-3 uppercase">
            Bloqueadas ({conquistasBloqueadas.length})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(isExpanded ? conquistasBloqueadas : conquistasBloqueadas.slice(0, 2)).map((conquista) => {
              const podeDesbloquear = pontosUsuario >= conquista.pontos_necessarios;
              
              return (
                <motion.div
                  key={conquista.id}
                  className={`flex items-center gap-4 p-4 bg-black/50 rounded-xl shadow-lg ${
                    podeDesbloquear ? 'border-2 border-yellow-500/30' : 'opacity-50'
                  }`}
                  whileHover={{ scale: 1.03 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="text-3xl">
                    <span className="text-white/30" aria-label={`Conquista: ${conquista.titulo}`}>
                      {getIconByName(conquista.icone)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-white">{conquista.titulo}</p>
                    <span className="text-sm text-white/70">{conquista.descricao}</span>
                    <p className={`text-xs mt-1 ${podeDesbloquear ? 'text-yellow-400' : 'text-white/50'}`}>
                      {podeDesbloquear 
                        ? 'Disponível para desbloquear!' 
                        : `${conquista.pontos_necessarios} pontos necessários`
                      }
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}

// Helper para renderizar ícones baseado no nome
function getIconByName(iconName: string) {
  const icons: { [key: string]: string } = {
    flame: "🔥",
    "trending-up": "📈",
    trophy: "🏆",
    star: "⭐",
    gift: "🎁",
    crown: "👑",
    medal: "🏅",
    rocket: "🚀",
    target: "🎯",
    heart: "❤️",
  };

  return icons[iconName.toLowerCase()] || "🏆";
}
