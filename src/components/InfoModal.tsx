import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaMoneyBillWave, FaCreditCard } from "react-icons/fa";
import { SiPix } from "react-icons/si";

interface InfoModalProps {
  showInfo: boolean;
  abaAtiva: "Sobre" | "Horario" | "Pagamento";
  setAbaAtiva: (aba: "Sobre" | "Horario" | "Pagamento") => void;
  horarios: Record<string, string>;
  onClose: () => void;
}

const InfoModal: React.FC<InfoModalProps> = ({
  showInfo,
  abaAtiva,
  setAbaAtiva,
  horarios,
  onClose,
}) => {
  if (!showInfo) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      aria-labelledby="info-modal-title"
      role="dialog"
      aria-modal="true"
    >
      <motion.div
        className="relative bg-gradient-to-br from-[#2a2e38] to-[#1f2229] text-white rounded-3xl shadow-2xl w-full max-w-lg flex flex-col mx-auto border border-white/5 overflow-hidden max-h-[90vh]"
        initial={{ scale: 0.9, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 30, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative px-4 sm:px-6 pt-6 sm:pt-8 pb-4 sm:pb-6">
          <button
            onClick={onClose}
            className="absolute top-3 sm:top-4 right-3 sm:right-4 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-white/70 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-all duration-200 focus:outline-none"
            aria-label="Fechar modal"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <h2 id="info-modal-title" className="text-lg sm:text-2xl font-bold tracking-tight text-white pr-8">
            Informações
          </h2>
        </div>

        {/* Abas */}
        <div className="flex px-3 sm:px-6 gap-1.5 sm:gap-3 mb-4 sm:mb-6 -mt-2 sm:-mt-3">
          {["Sobre", "Horario", "Pagamento"].map((aba) => (
            <button
              key={aba}
              onClick={() => setAbaAtiva(aba as typeof abaAtiva)}
              className={`flex-1 py-2.5 sm:py-3 px-1 sm:px-4 text-xs sm:text-sm font-semibold text-center rounded-lg sm:rounded-xl transition-all duration-200 focus:outline-none whitespace-nowrap
                ${abaAtiva === aba
                  ? "bg-slate-700 text-white shadow-lg shadow-slate-700/30"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-gray-200"}
              `}
              aria-current={abaAtiva === aba ? "page" : undefined}
            >
              {aba.charAt(0).toUpperCase() + aba.slice(1).toLowerCase()}
            </button>
          ))}
        </div>

        <div className="flex-1 px-4 sm:px-6 pb-6 sm:pb-8 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent hover:scrollbar-thumb-white/20">
          {abaAtiva === "Sobre" && (
            <div className="space-y-4 sm:space-y-6 animate-fadeIn">
              <div className="flex items-center gap-3 sm:gap-5 p-4 sm:p-5 bg-white/5 rounded-xl sm:rounded-2xl backdrop-blur-sm">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0">
                  <Image
                    src="/Img/logogbc.png"
                    alt="Logo GBC Coffee"
                    fill
                    className="rounded-full object-cover shadow-xl ring-2 ring-slate-600/30"
                  />
                </div>
                <div>
                  <span className="text-lg sm:text-xl font-bold tracking-tight text-white">GBC Coffee</span>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1">Cafeteria & Lanchonete</p>
                </div>
              </div>

              <a
                href="https://www.instagram.com/gbccoffee?igsh=dmY2bGV5YjF2a3Bo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 sm:gap-3 px-5 sm:px-6 py-3.5 sm:py-4 text-white bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl sm:rounded-2xl focus:outline-none hover:from-pink-600 hover:to-purple-700 transition-all duration-200 shadow-lg"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-5 h-5 sm:w-6 sm:h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z"
                  />
                  <circle cx="12" cy="12" r="3.2" />
                  <circle cx="17.5" cy="6.5" r="1.2" />
                </svg>
                <span className="font-semibold text-sm sm:text-base">Siga no Instagram</span>
              </a>

              <div className="p-4 sm:p-5 bg-white/5 rounded-xl sm:rounded-2xl backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-2.5 sm:mb-3">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <h3 className="font-semibold text-sm sm:text-base text-slate-300">Endereço</h3>
                </div>
                <p className="text-sm sm:text-base leading-relaxed text-gray-300">
                  Av. Roberto Silveira, 2082<br />
                  Flamengo, Maricá - RJ<br />
                  <span className="text-slate-400 text-xs sm:text-sm">Dentro da faculdade</span>
                </p>
              </div>
            </div>
          )}

          {abaAtiva === "Horario" && (
            <div className="space-y-2.5 sm:space-y-3 animate-fadeIn">
              {Object.entries(horarios).map(([dia, hora], index) => (
                <div
                  key={dia}
                  className="flex justify-between items-center p-3 sm:p-4 bg-white/5 rounded-lg sm:rounded-xl hover:bg-white/10 transition-all duration-200"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-slate-400"></div>
                    <span className="font-medium text-sm sm:text-base text-white">{dia}</span>
                  </div>
                  <span
                    className={`font-semibold px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm ${
                      hora === "Fechado"
                        ? "bg-red-500/20 text-red-400"
                        : "bg-emerald-500/20 text-emerald-400"
                    }`}
                  >
                    {hora}
                  </span>
                </div>
              ))}
            </div>
          )}

          {abaAtiva === "Pagamento" && (
            <div className="space-y-2.5 sm:space-y-3 animate-fadeIn">
              {[
                {
                  nome: "Dinheiro",
                  icon: <FaMoneyBillWave className="text-green-400 text-xl sm:text-2xl" />,
                  iconBg: "bg-green-500/10",
                },
                {
                  nome: "Pix",
                  icon: <SiPix className="text-teal-400 text-xl sm:text-2xl" />,
                  iconBg: "bg-teal-500/10",
                },
                {
                  nome: "Cartão de débito",
                  icon: <FaCreditCard className="text-blue-400 text-xl sm:text-2xl" />,
                  iconBg: "bg-blue-500/10",
                },
                {
                  nome: "Cartão de crédito",
                  icon: <FaCreditCard className="text-slate-400 text-xl sm:text-2xl" />,
                  iconBg: "bg-slate-500/10",
                },
              ].map(({ nome, icon, iconBg }) => (
                <div
                  key={nome}
                  className="flex items-center gap-3 sm:gap-5 p-4 sm:p-5 bg-white/5 rounded-xl sm:rounded-2xl border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all duration-200"
                >
                  <div className={`flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 ${iconBg} rounded-lg sm:rounded-xl flex-shrink-0`}>
                    {icon}
                  </div>
                  <span className="text-sm sm:text-base font-semibold text-white">{nome}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default InfoModal;
