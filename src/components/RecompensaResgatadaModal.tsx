"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Gift, Calendar, CheckCircle, Clock } from "lucide-react";
import { useEffect } from "react";

export interface RecompensaResgatada {
  id: number;
  titulo: string;
  descricao?: string | null;
  pontos_gastos: number;
  data_resgate: string;
  utilizado: boolean;
}

interface RecompensaResgatadaModalProps {
  recompensa: RecompensaResgatada | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function RecompensaResgatadaModal({
  recompensa,
  isOpen,
  onClose,
}: RecompensaResgatadaModalProps) {
  useEffect(() => {
    if (isOpen) {
      // Salvar posição atual do scroll
      const scrollY = window.scrollY;
      
      // Bloquear scroll
      document.documentElement.style.position = 'fixed';
      document.documentElement.style.top = `-${scrollY}px`;
      document.documentElement.style.width = '100%';
      document.body.style.overflow = 'hidden';
    } else {
      // Restaurar scroll
      const scrollY = document.documentElement.style.top;
      document.documentElement.style.position = '';
      document.documentElement.style.top = '';
      document.documentElement.style.width = '';
      document.body.style.overflow = '';
      
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }

    return () => {
      document.documentElement.style.position = '';
      document.documentElement.style.top = '';
      document.documentElement.style.width = '';
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!recompensa) return null;

  const formatarData = (dataString: string) => {
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ 
            position: 'fixed',
            overflow: 'hidden',
            touchAction: 'none'
          }}
        >
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm -z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative bg-[#2a1810] rounded-2xl shadow-2xl w-full max-w-md max-h-[85vh] sm:max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-[#C9A882] scrollbar-track-transparent"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-[#C9A882] to-[#b89670] p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-white/20 p-3 rounded-full">
                  <Gift size={32} className="text-[#4E2010]" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#4E2010]">
                    Recompensa Resgatada
                  </h2>
                  {recompensa.utilizado ? (
                    <p className="text-[#4E2010]/70 text-sm flex items-center gap-1">
                      <CheckCircle size={14} /> Utilizada
                    </p>
                  ) : (
                    <p className="text-[#4E2010]/70 text-sm flex items-center gap-1">
                      <Clock size={14} /> Disponível para uso
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6 bg-[#2a1810]">
              {/* Título */}
              <div>
                <h3 className="text-xl font-bold text-[#C9A882] mb-2">
                  {recompensa.titulo}
                </h3>
                {recompensa.descricao && (
                  <p className="text-white/80 text-sm leading-relaxed">
                    {recompensa.descricao}
                  </p>
                )}
              </div>

              {/* Informações */}
              <div className="bg-black/40 rounded-xl p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-white/70 text-sm font-medium flex items-center gap-2">
                    <Gift size={16} /> Pontos gastos:
                  </span>
                  <span className="text-[#C9A882] font-bold text-lg">
                    {recompensa.pontos_gastos}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70 text-sm font-medium flex items-center gap-2">
                    <Calendar size={16} /> Data do resgate:
                  </span>
                  <span className="text-white font-semibold text-sm">
                    {formatarData(recompensa.data_resgate)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70 text-sm font-medium flex items-center gap-2">
                    {recompensa.utilizado ? <CheckCircle size={16} /> : <Clock size={16} />}
                    Status:
                  </span>
                  <span
                    className={`font-semibold text-sm px-3 py-1 rounded-full ${
                      recompensa.utilizado
                        ? "bg-gray-600 text-gray-300"
                        : "bg-green-500/20 text-green-400"
                    }`}
                  >
                    {recompensa.utilizado ? "Utilizada" : "Ativo"}
                  </span>
                </div>
              </div>

              {/* Instruções */}
              {!recompensa.utilizado && (
                <div className="bg-[#C9A882]/10 rounded-xl p-4 border border-[#C9A882]/30">
                  <p className="text-[#C9A882] text-sm font-medium mb-2">
                    Como utilizar:
                  </p>
                  <p className="text-white/80 text-xs leading-relaxed">
                    Apresente esta recompensa no estabelecimento para utilizá-la.
                    Mostre esta tela para o atendente para validar seu resgate.
                  </p>
                </div>
              )}

              {/* Código/ID da recompensa */}
              <div className="text-center pt-2 border-t border-white/10">
                <p className="text-white/50 text-xs mb-1">Código da Recompensa</p>
                <p className="text-[#C9A882] font-mono font-bold text-lg tracking-wider">
                  #{recompensa.id.toString().padStart(6, '0')}
                </p>
              </div>

              {/* Botão */}
              <button
                onClick={onClose}
                className="w-full px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-[#C9A882] to-[#b89670] text-[#4E2010] hover:shadow-lg hover:scale-105 transition"
              >
                Fechar
              </button>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9A882]/10 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#b89670]/10 rounded-full blur-3xl -z-10" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
