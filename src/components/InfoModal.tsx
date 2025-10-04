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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      aria-labelledby="info-modal-title"
      role="dialog"
      aria-modal="true"
    >
      <motion.div
        className="bg-white/90 dark:bg-[#292929e6] text-white p-6 rounded-3xl shadow-2xl w-[90%] max-w-md sm:max-w-lg flex flex-col mx-auto"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 id="info-modal-title" className="text-lg font-bold">
            Informações
          </h2>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white focus:outline-none focus:ring-2 focus:ring-white rounded-full"
            aria-label="Fechar modal"
          >
            ✕
          </button>
        </div>

        <div className="flex border-b border-white/20 mb-4">
          {["Sobre", "Horario", "Pagamento"].map((aba) => (
            <button
              key={aba}
              onClick={() => setAbaAtiva(aba as typeof abaAtiva)}
              className={`flex-1 py-2 text-sm font-semibold text-center border-b-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white rounded-sm ${
                abaAtiva === aba
                  ? "border-white text-white"
                  : "border-transparent text-white/80 hover:text-white"
              }`}
              aria-current={abaAtiva === aba ? "page" : undefined}
            >
              {aba.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="space-y-4 text-sm min-h-[280px]">
          {abaAtiva === "Sobre" && (
            <>
              <div className="flex items-center gap-2 mt-4">
                <Image
                  src="/Img/logogbc.png"
                  alt="Logo GBC Coffee"
                  width={100}
                  height={100}
                  className="!rounded-full !w-25 !h-25 object-cover"
                />
                <span className="text-sm">GBC Coffee</span>
              </div>

              <a
                href="https://www.instagram.com/gbccoffee?igsh=dmY2bGV5YjF2a3Bo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-white bg-[#00000080] rounded-full focus:outline-none focus:ring-2 focus:ring-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  width={18}
                  height={18}
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
                @gbc.coffee
              </a>

              <div>
                <h3 className="font-semibold mt-4">Endereço</h3>
                <p className="text-sm leading-snug mt-1">
                  Av. Roberto Silveira, 2082
                  <br />
                  Flamengo, Maricá - RJ
                  <br />
                  Dentro da faculdade
                </p>
              </div>
            </>
          )}

          {abaAtiva === "Horario" && (
            <ul className="text-sm divide-y divide-gray-300/30 dark:divide-zinc-700/40">
              {Object.entries(horarios).map(([dia, hora]) => (
                <li
                  key={dia}
                  className="py-2 px-2 flex justify-between items-center"
                >
                  <span>{dia}</span>
                  <span
                    className={
                      hora === "Fechado"
                        ? "text-red-500 font-semibold"
                        : "font-medium"
                    }
                  >
                    {hora}
                  </span>
                </li>
              ))}
            </ul>
          )}

          {abaAtiva === "Pagamento" && (
            <div className="flex flex-col gap-3">
              {[
                {
                  nome: "Dinheiro",
                  icon: <FaMoneyBillWave className="text-green-700 text-xl" />,
                },
                {
                  nome: "Pix",
                  icon: <SiPix className="text-green-500 text-xl" />,
                },
                {
                  nome: "Cartão de débito",
                  icon: <FaCreditCard className="text-blue-700 text-xl" />,
                },
                {
                  nome: "Cartão de crédito",
                  icon: <FaCreditCard className="text-blue-700 text-xl" />,
                },
              ].map(({ nome, icon }) => (
                <div
                  key={nome}
                  className="flex items-center gap-2 p-3 bg-[#00000080] rounded-full"
                >
                  <span className="text-lg" aria-hidden="true">
                    {icon}
                  </span>
                  <span className="text-base">{nome}</span>
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
