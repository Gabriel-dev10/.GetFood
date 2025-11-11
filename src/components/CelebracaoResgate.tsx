"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Gift, Sparkles, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";

interface CelebracaoResgateProps {
  isOpen: boolean;
  recompensaTitulo: string;
  onClose: () => void;
}

export default function CelebracaoResgate({
  isOpen,
  recompensaTitulo,
  onClose,
}: CelebracaoResgateProps) {
  const [confetti, setConfetti] = useState<Array<{ id: number; left: number; delay: number }>>([]);

  useEffect(() => {
    if (isOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      
      // Gerar confetes aleatórios
      const newConfetti = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
      }));
      setConfetti(newConfetti);

      // Auto-fechar após 3 segundos
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => {
        clearTimeout(timer);
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
      };
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ overflow: 'hidden' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Confetes */}
          {confetti.map((conf) => (
            <motion.div
              key={conf.id}
              className="absolute top-0 w-2 h-2 bg-[#C9A882] rounded-full"
              style={{ left: `${conf.left}%` }}
              initial={{ y: -20, opacity: 1, rotate: 0 }}
              animate={{
                y: window.innerHeight + 50,
                opacity: 0,
                rotate: 360,
              }}
              transition={{
                duration: 2 + Math.random(),
                delay: conf.delay,
                ease: "easeIn",
              }}
            />
          ))}

          {/* Modal de Celebração */}
          <motion.div
            className="relative bg-gradient-to-br from-[#2a1810] to-[#1a0f08] rounded-2xl shadow-2xl max-w-md w-full overflow-hidden p-8 text-center"
            initial={{ scale: 0.5, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0.5, rotate: 10 }}
            transition={{ type: "spring", duration: 0.6 }}
          >
            {/* Ícone de sucesso */}
            <motion.div
              className="mx-auto w-24 h-24 bg-gradient-to-br from-[#C9A882] to-[#b89670] rounded-full flex items-center justify-center mb-6 relative"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <CheckCircle size={48} className="text-[#4E2010]" />
              
              {/* Sparkles ao redor */}
              <motion.div
                className="absolute -top-2 -right-2"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles size={24} className="text-yellow-400" />
              </motion.div>
              <motion.div
                className="absolute -bottom-2 -left-2"
                animate={{ rotate: -360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles size={20} className="text-yellow-400" />
              </motion.div>
            </motion.div>

            {/* Texto */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-3xl font-bold text-[#C9A882] mb-3">
                Parabéns! 🎉
              </h2>
              <p className="text-white/90 text-lg mb-2">
                Você resgatou com sucesso:
              </p>
              <p className="text-[#C9A882] text-xl font-bold mb-4">
                {recompensaTitulo}
              </p>
              <div className="flex items-center justify-center gap-2 text-white/70">
                <Gift size={20} />
                <p className="text-sm">
                  Acesse &quot;Minhas Recompensas&quot; para visualizar
                </p>
              </div>
            </motion.div>

            {/* Efeito de brilho */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
              initial={{ x: "-100%" }}
              animate={{ x: "200%" }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
