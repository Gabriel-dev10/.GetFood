"use client";

import { UserCircle } from "lucide-react";
import { getBordaNivel } from "@/utils/nivelSystem";
import { motion } from "framer-motion";

interface ProfileAvatarProps {
  foto: string | null;
  nivel: number;
  size?: "small" | "medium" | "large";
  onClick?: () => void;
  showLevelBadge?: boolean;
  timestamp?: number;
  imagemBorda?: string; // Caminho para borda customizada
  usarBordaCustomizada?: boolean; // Se true, usa imagem ao invés de CSS
}

export default function ProfileAvatar({
  foto,
  nivel,
  size = "large",
  onClick,
  showLevelBadge = false,
  timestamp = Date.now(),
  imagemBorda,
  usarBordaCustomizada = false,
}: ProfileAvatarProps) {
  const sizeClasses = {
    small: "w-10 h-10",
    medium: "w-24 h-24",
    large: "w-32 h-32 md:w-40 md:h-40",
  };

  const iconSizes = {
    small: 24,
    medium: 60,
    large: 80,
  };

  const badgeSizes = {
    small: "w-6 h-6 text-[10px]",
    medium: "w-8 h-8 text-xs",
    large: "w-10 h-10 text-sm",
  };

  const badgePositions = {
    small: "-bottom-1 -right-1",
    medium: "-bottom-2 -right-2",
    large: "-bottom-2 -right-2",
  };

  // Se usar borda customizada e existir imagem
  if (usarBordaCustomizada && imagemBorda) {
    return (
      <div className="relative inline-block">
        <motion.div
          onClick={onClick}
          className={`${sizeClasses[size]} ${
            onClick ? "cursor-pointer" : ""
          } relative flex-shrink-0`}
          whileHover={onClick ? { scale: 1.05 } : {}}
          whileTap={onClick ? { scale: 0.98 } : {}}
        >
          {/* Foto do usuário no fundo */}
          <div className="absolute inset-[4%] rounded-full overflow-hidden z-0 bg-[#2a1810]">
            {foto ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={foto.startsWith("blob:") ? foto : `${foto}?t=${timestamp}`}
                alt="Foto de perfil"
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.error("Erro ao carregar imagem:", foto);
                  e.currentTarget.style.display = "none";
                }}
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <UserCircle className="text-[#C9A882]/50" size={iconSizes[size] * 0.6} />
              </div>
            )}
          </div>

          {/* SVG da borda por cima usando img tag */}
          <div className="absolute inset-0 z-10 pointer-events-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imagemBorda}
              alt="Borda de nível"
              className="w-full h-full"
              style={{ objectFit: 'contain' }}
            />
          </div>
        </motion.div>

        {/* Badge de nível */}
        {showLevelBadge && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 25, delay: 0.2 }}
            className={`absolute ${badgePositions[size]} ${badgeSizes[size]} bg-gradient-to-br from-[#4E2010] to-[#2a1810] rounded-full flex items-center justify-center font-bold text-[#C9A882] border-2 border-[#C9A882] shadow-lg z-20`}
          >
            {nivel}
          </motion.div>
        )}
      </div>
    );
  }

  // Versão original com borda CSS
  return (
    <div className="relative inline-block">
      <motion.div
        onClick={onClick}
        className={`${sizeClasses[size]} ${
          onClick ? "cursor-pointer hover:scale-105" : ""
        } ${getBordaNivel(nivel)} rounded-full relative overflow-hidden shadow-lg transition flex-shrink-0`}
        whileHover={onClick ? { scale: 1.05 } : {}}
        whileTap={onClick ? { scale: 0.98 } : {}}
      >
        {foto ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={foto.startsWith("blob:") ? foto : `${foto}?t=${timestamp}`}
            alt="Foto de perfil"
            className="w-full h-full object-cover"
            onError={(e) => {
              console.error("Erro ao carregar imagem:", foto);
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-[#2a1810]">
            <UserCircle className="text-[#C9A882]/50" size={iconSizes[size]} />
          </div>
        )}
      </motion.div>

      {/* Badge de nível */}
      {showLevelBadge && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 25, delay: 0.2 }}
          className={`absolute ${badgePositions[size]} ${badgeSizes[size]} bg-gradient-to-br from-[#4E2010] to-[#2a1810] rounded-full flex items-center justify-center font-bold text-[#C9A882] border-2 border-[#C9A882] shadow-lg z-10`}
        >
          {nivel}
        </motion.div>
      )}
    </div>
  );
}
