"use client";

import { Info, Loader2 } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import BarraHorizontal from "@/components/ui/BarraHorizontal";
import NavBottom from "@/components/ui/NavBottom";
import Footer from "@/components/ui/Footer";
import { useState, useEffect } from "react";
import LoginIcon from "@/components/auth/LoginIcon";
import UserBadge from "@/components/ui/UserBadge";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import InfoModal from "@/components/modals/InfoModal";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useModal } from "@/hooks/useModal";

type AbaType = "Sobre" | "Horario" | "Pagamento";

/**
 * Página inicial do sistema GBC Coffee.
 *
 * Esta página exibe o carrossel de imagens promocionais, informações sobre o café,
 * horários de funcionamento e formas de pagamento aceitas.
 *
 * @returns {JSX.Element} Componente da página inicial
 */
export default function Inicio() {
  const { session, status, isLoading } = useAuth();
  const searchParams = useSearchParams();
  const { isOpen: showInfo, open: openInfo, close: closeInfo } = useModal();
  const [abaAtiva, setAbaAtiva] = useState<AbaType>("Sobre");

  const horarios = {
    Segunda: "07:00 às 22:00",
    Terça: "07:00 às 22:00",
    Quarta: "07:00 às 22:00",
    Quinta: "07:00 às 22:00",
    Sexta: "07:00 às 22:00",
    Sábado: "07:00 às 13:00",
    Domingo: "Fechado",
  };

  // Verifica se deve abrir o modal de contato ao carregar
  useEffect(() => {
    const contato = searchParams.get("contato");
    if (contato === "true") {
      setAbaAtiva("Sobre");
      openInfo();
      // Remove o parâmetro da URL sem recarregar a página
      window.history.replaceState({}, "", "/");
    }
  }, [searchParams, openInfo]);

  const handleContatoClick = () => {
    setAbaAtiva("Sobre");
    openInfo();
  };

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#292929]/84 to-black/65">
        <Loader2 className="animate-spin text-[#4E2010]" size={60} />
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 pt-4 pb-20 w-full max-w-screen-xl mx-auto relative mt-3 text-white">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative flex items-center justify-between mb-6 px-2 py-2 rounded-xl"
      >
        <button
          onClick={openInfo}
          className="flex items-center gap-2 text-sm font-semibold text-[#4E2010] px-3 py-2 rounded-lg transition-all duration-300 hover:text-white hover:bg-[#4E2010]"
          aria-label="Informações"
        >
          <Info size={22} strokeWidth={2} className="sm:w-[20px] sm:h-[20px]" />
          <span className="hidden sm:inline">Info</span>
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

      {/* Carrossel */}
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

      {/* Modal de informações */}
      <InfoModal
        showInfo={showInfo}
        abaAtiva={abaAtiva}
        setAbaAtiva={setAbaAtiva}
        horarios={horarios}
        onClose={closeInfo}
      />

      {/* Barra horizontal de produtos */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mb-8"
      >
        <BarraHorizontal />
      </motion.div>

      {/* Footer e navegação */}
      <Footer onContatoClick={handleContatoClick} />
      <NavBottom />
    </main>
  );
}
