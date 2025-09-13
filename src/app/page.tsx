"use client";

import { Info, LogIn } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion, AnimatePresence } from "framer-motion";
import "swiper/css";
import Image from "next/image";
import BarraHorizontal from "../components/BarraHorizontal";
import NavBottom from "../components/NavBottom";
import Link from "next/link";
import Footer from "../components/Footer";
import { useState } from "react";
import { FaMoneyBillWave, FaCreditCard } from "react-icons/fa";
import { SiPix } from "react-icons/si";

/**
 * Página inicial do sistema GBC Coffee.
 *
 * Exibe carrossel, informações, horários e formas de pagamento.
 * Utiliza animações e navegação com Next.js.
 *
 * @returns {JSX.Element} Elemento da página inicial
 */
export default function Inicio() {
  /**
   * Controla a exibição do modal de informações.
   */
  const [showInfo, setShowInfo] = useState(false);
  /**
   * Aba ativa do modal de informações.
   * Pode ser 'sobre', 'horario' ou 'pagamento'.
   */
  const [abaAtiva, setAbaAtiva] = useState<"Sobre" | "Horario" | "Pagamento">(
    "Sobre"
  );

  /**
   * Horários de funcionamento por dia da semana.
   */
  const horarios = {
    Segunda: "07:00 às 22:00",
    Terça: "07:00 às 22:00",
    Quarta: "07:00 às 22:00",
    Quinta: "07:00 às 22:00",
    Sexta: "07:00 às 22:00",
    Sábado: "07:00 às 13:00",
    Domingo: "Fechado",
  };
  return (
    <main className="min-h-screen px-4 pt-4 pb-20 w-full max-w-screen-xl mx-auto relative mt-3 text-gray-900 dark:text-white">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative flex items-center justify-between mb-6 px-2 py-2 rounded-xl"
      >
        <button
          onClick={() => setShowInfo(true)}
          className="text-[#4E2010] hover:text-white flex items-center gap-1 text-xs font-bold transition"
        >
          <Info size={18} />
          Info
        </button>

        <h1 className="text-[#4E2010] absolute left-1/2 transform -translate-x-1/2 text-2xl font-bold">
          GBC <span className="font-dancingScript">Coffee</span>
        </h1>

        <Link
          href="/login"
          className="flex items-center gap-2 font-bold text-xs cursor-pointer hover:text-white hover:underline text-[#4E2010] px-2 py-1 rounded-lg transition duration-300"
        >
          <LogIn size={20} />
        </Link>
      </motion.div>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl overflow-hidden shadow-lg mb-8"
      >
        <Swiper spaceBetween={10} slidesPerView={1}>
          {[1, 2, 3].map((_, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-[200px] md:h-[350px]">
                <Image
                  src="/Img/logocarrossel.png"
                  alt="Banner promocional"
                  fill
                  className="object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.section>

      <AnimatePresence>
        {showInfo && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowInfo(false)}
          >
            <motion.div
              className="bg-white dark:bg-[#29292980] text-white p-6 rounded-3xl shadow-2xl w-full max-w-3xl flex flex-col"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex border-b mb-4">
                {["Sobre", "Horario", "Pagamento"].map((aba) => (
                  <button
                    key={aba}
                    onClick={() => setAbaAtiva(aba as typeof abaAtiva)}
                    className={`flex-1 py-2 text-sm font-semibold text-center ${
                      abaAtiva === aba
                        ? "border-black text-black"
                        : "text-white"
                    }`}
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
                        alt="Logo"
                        width={100}
                        height={100}
                        className="!rounded-full !w-25 !h-25 object-cover"
                      />
                      <span className="text-sm">GBC Coffee</span>
                    </div>

                    <a
                      href="https://www.instagram.com/gbccoffee?igsh=dmY2bGV5YjF2a3Bo"
                      target="_blank"
                      className="inline-flex items-center gap-2 px-4 py-2 text-white bg-[#00000080] rounded-full "
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
                        <span className={hora === "Fechado" ? "text-red-500 font-semibold" : "font-medium"}>
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
                        icon: (
                          <FaMoneyBillWave className="text-green-700 text-xl" />
                        ),
                      },
                      {
                        nome: "Pix",
                        icon: <SiPix className="text-green-500 text-xl" />,
                      },
                      {
                        nome: "Cartão de débito",
                        icon: (
                          <FaCreditCard className="text-blue-700 text-xl" />
                        ),
                      },
                      {
                        nome: "Cartão de crédito",
                        icon: (
                          <FaCreditCard className="text-blue-700 text-xl" />
                        ),
                      },
                    ].map(({ nome, icon }) => (
                      <div
                        key={nome}
                        className="flex items-center gap-2 p-3 bg-[#00000080] rounded-full"
                      >
                        <span className="text-lg">{icon}</span>
                        <span className="text-base">{nome}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mb-8"
      >
        <BarraHorizontal />
      </motion.div>

      <Footer />
      <NavBottom />
    </main>
  );
}
