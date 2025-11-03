"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, Eye, EyeOff } from "lucide-react";

interface EncerrarContaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (password: string) => Promise<void>;
  userName?: string;
}

/**
 * Modal para confirmar o encerramento da conta do usuário.
 * 
 * @param isOpen - Estado de abertura do modal
 * @param onClose - Função para fechar o modal
 * @param onConfirm - Função assíncrona para confirmar o encerramento com senha
 * @param userName - Nome do usuário (opcional)
 * @returns {JSX.Element} Modal de confirmação
 */
export default function EncerrarContaModal({
  isOpen,
  onClose,
  onConfirm,
  userName,
}: EncerrarContaModalProps) {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  // Bloqueia o scroll do body quando o modal está aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup: garante que o overflow seja restaurado ao desmontar
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleConfirm = async () => {
    if (!password.trim()) {
      setError("Por favor, insira sua senha");
      return;
    }

    setLoading(true);
    setError("");
    try {
      await onConfirm(password);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Senha incorreta. Tente novamente.";
      setError(errorMessage);
      setLoading(false);
    }
  };

  const handleClose = () => {
    setPassword("");
    setError("");
    setShowPassword(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center"
          onClick={handleClose}
          style={{ 
            top: '-10px', 
            left: '-10px', 
            right: '-10px', 
            bottom: '-10px',
            width: 'calc(100vw + 20px)',
            height: 'calc(100vh + 20px)',
            position: 'fixed',
            margin: 0,
            padding: '10px 14px'
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-gradient-to-tr from-[#292929]/85 to-black/65 p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-lg relative max-h-[95vh] overflow-y-auto mx-3 sm:mx-0"
          >
            {/* Botão de fechar */}
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-400 hover:text-white transition z-10"
              disabled={loading}
            >
              <X size={20} className="sm:w-6 sm:h-6" />
            </button>

            {/* Título */}
            <h2 className="text-xl sm:text-2xl font-bold text-center text-white mb-4 sm:mb-6 pr-6">
              Encerrar Conta
            </h2>

            {/* Mensagem de aviso */}
            <div className="bg-[#4E2010]/20 border border-[#4E2010]/30 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
              <p className="text-white text-center text-xs sm:text-sm leading-relaxed">
                <strong className="text-red-600">Atenção!</strong> Esta ação é{" "}
                <strong>irreversível</strong>.
                {userName && (
                  <>
                    <br />A sua conta será permanentemente excluída.
                  </>
                )}
              </p>
            </div>

            {/* Lista de consequências */}
            <div className="bg-black/30 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
              <p className="text-gray-300 text-xs sm:text-sm mb-2 sm:mb-3 font-semibold">
                Você perderá:
              </p>
              <ul className="text-white text-xs sm:text-sm space-y-1.5 sm:space-y-2">
                <li className="flex items-start">
                  <span className="text-[#dcbd8f] mr-2">•</span>
                  <span>Todos os seus dados pessoais</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#dcbd8f] mr-2">•</span>
                  <span>Histórico de pedidos e cupons</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#dcbd8f] mr-2">•</span>
                  <span>Títulos de fidelidade e conquistas</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#dcbd8f] mr-2">•</span>
                  <span>Acesso a promoções e benefícios</span>
                </li>
              </ul>
            </div>

            {/* Campo de confirmação */}
            <div className="mb-4 sm:mb-6">
              <label className="block text-white text-xs sm:text-sm mb-2">
                Digite sua <strong className="text-[#dcbd8f] underline">senha</strong> para
                confirmar:
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="Digite sua senha"
                  disabled={loading}
                  className="bg-black/30 w-full px-3 sm:px-4 py-2.5 sm:py-3 pr-10 sm:pr-12 rounded-lg sm:rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#dcbd8f]/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                  className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition disabled:opacity-50"
                >
                  {showPassword ? <EyeOff size={18} className="sm:w-5 sm:h-5" /> : <Eye size={18} className="sm:w-5 sm:h-5" />}
                </button>
              </div>
              {error && (
                <p className="text-red-400 text-xs sm:text-sm mt-2">{error}</p>
              )}
            </div>

            {/* Botões */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <button
                onClick={handleClose}
                disabled={loading}
                className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-gray-700 text-white hover:bg-gray-600 transition font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirm}
                disabled={loading || !password.trim()}
                className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-red-600 text-white hover:bg-red-700 transition font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={18} />
                    Encerrando...
                  </>
                ) : (
                  "Encerrar Conta"
                )}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
