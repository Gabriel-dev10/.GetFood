"use client";

import { Info, Loader2 } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import BarraHorizontal from "../components/BarraHorizontal";
import NavBottom from "../components/NavBottom";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import LoginIcon from "../components/LoginIcon";
import UserBadge from "../components/UserBadge";
import LoadingSkeleton from "../components/LoadingSkeleton";
import InfoModal from "../components/InfoModal";
import { motion } from "framer-motion";

/**
 * Página inicial do sistema GBC Coffee.
 *
 * Esta página exibe o carrossel de imagens promocionais, informações sobre o café,
 * horários de funcionamento e formas de pagamento aceitas.
 * Inclui animações e navegação utilizando Next.js.
 *
 * @returns {JSX.Element} Componente da página inicial
 */
export default function Inicio() {
  const { data: session, status } = useSession();
  const [showInfo, setShowInfo] = useState(false);
  const [abaAtiva, setAbaAtiva] = useState<"Sobre" | "Horario" | "Pagamento">(
    "Sobre"
  );

  const horarios = {
    Segunda: "07:00 às 22:00",
    Terça: "07:00 às 22:00",
    Quarta: "07:00 às 22:00",
    Quinta: "07:00 às 22:00",
    Sexta: "07:00 às 22:00",
    Sábado: "07:00 às 13:00",
    Domingo: "Fechado",
  };

  useEffect(() => {
    if (showInfo) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.overflow = "hidden";
      document.body.style.width = "100%";
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
      document.body.style.width = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
      document.body.style.width = "";
    };
  }, [showInfo]);

  if (status === "loading") {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#292929]/84 to-black/65">
        <Loader2 className="animate-spin text-[#4E2010]" size={60} />
      </main>
    );
  }

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

        <div className="relative">
          {status === undefined ? (
            <LoadingSkeleton />
          ) : !session ? (
            <LoginIcon />
          ) : (
            <UserBadge
              image={session.user?.image ?? null}
              name={session.user?.name ?? "Usuário"}
            />
          )}
        </div>
      </motion.div>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl overflow-hidden shadow-lg mb-8"
      >
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          modules={[Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          speed={1200}
        >
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

      <InfoModal
        showInfo={showInfo}
        abaAtiva={abaAtiva}
        setAbaAtiva={setAbaAtiva}
        horarios={horarios}
        onClose={() => setShowInfo(false)}
      />

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
