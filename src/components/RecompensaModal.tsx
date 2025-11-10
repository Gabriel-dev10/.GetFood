"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Gift, AlertCircle, Check } from "lucide-react";
import { useState, useEffect } from "react";

export interface Recompensa {
  id: number;
  titulo: string;
  descricao?: string | null;
  pontos: number;
  ativo: boolean;
}

interface RecompensaModalProps {
  recompensa: Recompensa | null;
  isOpen: boolean;
  onClose: () => void;
  pontosUsuario: number;
  onResgatar: (recompensaId: number) => Promise<void>;
}

export default function RecompensaModal({
  recompensa,
  isOpen,
  onClose,
  pontosUsuario,
  onResgatar,
}: RecompensaModalProps) {
  const [isResgatando, setIsResgatando] = useState(false);

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

  const podeResgatar = pontosUsuario >= recompensa.pontos;
  const pontosFaltantes = recompensa.pontos - pontosUsuario;

  const handleResgatar = async () => {
    if (!podeResgatar || isResgatando) return;

    setIsResgatando(true);
    try {
      await onResgatar(recompensa.id);
      onClose();
    } catch (error) {
      console.error("Erro ao resgatar recompensa:", error);
    } finally {
      setIsResgatando(false);
    }
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
            <div className="sticky top-0 z-10 bg-gradient-to-r from-[#C9A882] to-[#b89670] p-4 sm:p-6">
              <div className="flex items-center gap-2 sm:gap-3 mb-2">
                <div className="bg-white/20 p-2 sm:p-3 rounded-full flex-shrink-0">
                  <Gift size={24} className="sm:w-8 sm:h-8 text-[#4E2010]" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-xl sm:text-2xl font-bold text-[#4E2010] truncate">
                    Recompensa
                  </h2>
                  <p className="text-[#4E2010]/70 text-xs sm:text-sm">
                    {recompensa.pontos} pontos
                  </p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 bg-[#2a1810]">
              {/* Título */}
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-[#C9A882] mb-2">
                  {recompensa.titulo}
                </h3>
                {recompensa.descricao && (
                  <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
                    {recompensa.descricao}
                  </p>
                )}
              </div>

              {/* Informações de pontos */}
              <div className="bg-black/40 rounded-xl p-3 sm:p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-white/70 text-xs sm:text-sm font-medium">Seus pontos:</span>
                  <span className="text-white font-bold text-base sm:text-lg">
                    {pontosUsuario}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70 text-xs sm:text-sm font-medium">Custo:</span>
                  <span className="text-[#C9A882] font-bold text-base sm:text-lg">
                    {recompensa.pontos}
                  </span>
                </div>
                
                {!podeResgatar && (
                  <div className="flex items-start gap-2 pt-2 border-t border-white/10">
                    <AlertCircle size={14} className="text-orange-400 mt-0.5 flex-shrink-0 sm:w-4 sm:h-4" />
                    <p className="text-orange-400 text-[10px] sm:text-xs leading-tight">
                      Você precisa de mais <strong>{pontosFaltantes}</strong> pontos
                      para resgatar esta recompensa.
                    </p>
                  </div>
                )}
              </div>

              {/* Status */}
              {podeResgatar && (
                <div className="flex items-center gap-2 text-green-400 text-xs sm:text-sm bg-green-500/20 p-2.5 sm:p-3 rounded-lg">
                  <Check size={16} className="flex-shrink-0 sm:w-[18px] sm:h-[18px]" />
                  <span className="font-medium">Você pode resgatar esta recompensa!</span>
                </div>
              )}

              {/* Botões */}
              <div className="flex gap-2 sm:gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-semibold border-2 border-[#C9A882]/50 text-[#C9A882] hover:bg-[#C9A882]/10 transition active:scale-95"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleResgatar}
                  disabled={!podeResgatar || isResgatando}
                  className={`flex-1 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-semibold transition ${
                    podeResgatar
                      ? "bg-gradient-to-r from-[#C9A882] to-[#b89670] text-[#4E2010] hover:shadow-lg active:scale-95"
                      : "bg-gray-700 text-gray-500 cursor-not-allowed"
                  } ${isResgatando ? "opacity-50 cursor-wait" : ""}`}
                >
                  {isResgatando ? "Resgatando..." : "Resgatar"}
                </button>
              </div>
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
