"use client";

import { motion } from "framer-motion";
import { 
  ChevronDown, 
  ChevronUp, 
  Loader2,
  Trophy,
  Flame,
  Star,
  Gift,
  Medal,
  Lock,
  CheckCircle2,
  Coffee,
  QrCode,
  Scan,
  Package,
  Coins,
  ShoppingBag,
  Award,
  Wallet,
  DollarSign
} from "lucide-react";
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
}: ConquistasListProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  if (loading) {
    return (
      <section className="mb-10">
        <h2 className="text-2xl text-white font-bold mb-6 flex items-center gap-3">
          <Trophy className="text-yellow-400" size={28} />
          Conquistas
        </h2>
        <div className="flex justify-center items-center py-10 bg-gradient-to-br from-[#2a1810]/80 to-[#1a0f08]/90 rounded-2xl border border-white/10">
          <Loader2 className="animate-spin text-[#C9A882]" size={40} />
        </div>
      </section>
    );
  }

  if (conquistas.length === 0) {
    return (
      <section className="mb-10">
        <h2 className="text-2xl text-white font-bold mb-6 flex items-center gap-3">
          <Trophy className="text-yellow-400" size={28} />
          Conquistas
        </h2>
        <div className="bg-gradient-to-br from-[#2a1810]/80 to-[#1a0f08]/90 border border-white/10 p-8 rounded-2xl text-center shadow-xl">
          <p className="text-white/50 text-lg">Nenhuma conquista disponível no momento.</p>
        </div>
      </section>
    );
  }

  const conquistasDesbloqueadas = conquistas.filter((c) => c.desbloqueada);
  const conquistasBloqueadas = conquistas.filter((c) => !c.desbloqueada);

  return (
    <section className="mb-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl text-[#4E2010] font-bold flex items-center gap-3">
          Conquistas
          {conquistas.length > 0 && (
            <span className="text-lg text-[#4E2010] font-normal">
              ({conquistasDesbloqueadas.length}/{conquistas.length})
            </span>
          )}
        </h2>
        {conquistas.length > 4 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-white font-semibold text-sm hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-white/5"
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

      {/* Conquistas Bloqueadas */}
      {conquistasBloqueadas.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg text-[#4E2010] font-semibold mb-4 flex items-center gap-2">
            Disponiveis ({conquistasBloqueadas.length})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(isExpanded ? conquistasBloqueadas : conquistasBloqueadas.slice(0, 6)).map((conquista) => {
              const podeDesbloquear = pontosUsuario >= conquista.pontos_necessarios;
              const IconComponent = getIconComponent(conquista.icone);
              
              return (
                <motion.div
                  key={conquista.id}
                  className={`relative flex items-center gap-4 p-5 rounded-2xl shadow-lg overflow-hidden bg-black/50 ${
                    podeDesbloquear 
                      ? '' 
                      : 'opacity-70'
                  }`}
                  whileHover={{ scale: podeDesbloquear ? 1.03 : 1.01, y: -2 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="z-10">
                    <IconComponent 
                      size={40} 
                      className={podeDesbloquear ? "text-white" : "text-white/30"}
                    />
                  </div>
                  <div className="flex-1 z-10">
                    <p className="font-bold text-white/90 text-base mb-1">{conquista.titulo}</p>
                    <span className="text-sm text-white/50 line-clamp-2">{conquista.descricao}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Conquistas Desbloqueadas */}
      {conquistasDesbloqueadas.length > 0 && (
        <div>
          <h3 className="text-lg text-[#4E2010] font-semibold mb-4 flex items-center gap-2">
            Concluidas ({conquistasDesbloqueadas.length})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {conquistasDesbloqueadas.map((conquista) => {
              const IconComponent = getIconComponent(conquista.icone);
              
              return (
                <motion.div
                  key={conquista.id}
                  className="relative flex items-center gap-4 p-5 bg-black/50 rounded-2xl shadow-lg overflow-hidden group"
                  whileHover={{ scale: 1.03, y: -4 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Efeito de brilho no hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C9A882]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="z-10">
                    <IconComponent 
                      size={40} 
                      className="text-white drop-shadow-lg"
                    />
                  </div>
                  <div className="flex-1 z-10">
                    <p className="font-bold text-white text-base mb-1">{conquista.titulo}</p>
                    <span className="text-sm text-white/60 line-clamp-2">{conquista.descricao}</span>
                    {conquista.data_desbloqueio && (
                      <p className="text-xs text-[#C9A882]/70 mt-2">
                        Desbloqueada em {new Date(conquista.data_desbloqueio).toLocaleDateString()}
                      </p>
                    )}
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

// Helper para renderizar ícones do Lucide React baseado no nome
function getIconComponent(iconName: string): React.FC<{ size: number; className?: string }> {
  const icons: { [key: string]: React.FC<{ size: number; className?: string }> } = {
    Coffee: Coffee,
    Gift: Gift,
    QrCode: QrCode,
    Scan: Scan,
    Package: Package,
    Coins: Coins,
    ShoppingBag: ShoppingBag,
    Medal: Medal,
    Wallet: Wallet,
    Award: Award,
    Trophy: Trophy,
    DollarSign: DollarSign,
    Flame: Flame,
    Star: Star,
    Lock: Lock,
    CheckCircle2: CheckCircle2,
  };

  return icons[iconName] || Trophy;
}
