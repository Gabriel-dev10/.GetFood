"use client";

import { Gift, TrendingUp, Flame, ScanLine, X } from "lucide-react";
import { motion } from "framer-motion";
import NavBottom from "../../components/NavBottom";
import Footer from "@/components/Footer";
import { useSession } from "next-auth/react";
import PopupLogin from "../../components/PopupLogin";
import { Loader2 } from "lucide-react";
import { BrowserQRCodeReader } from "@zxing/browser";
import { useEffect, useState, useRef } from "react";

/**
 * Página de painel de pontos e recompensas do usuário.
 *
 * Exibe progresso, conquistas e recompensas disponíveis.
 *
 * @returns {JSX.Element} Elemento da página de pontos
 */
export default function PagPontos() {
  const { data: session, status } = useSession();
  const [showScanner, setShowScanner] = useState(false);
  const [scanning, setScanning] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const codeReaderRef = useRef<BrowserQRCodeReader | null>(null);

  const pontos = 0;
  const nivel = 1;
  const meta = 1000;
  const progresso = (pontos / meta) * 100;
  const validade = "26/08/2026";

  useEffect(() => {
    if (!showScanner || !videoRef.current) {
      // Se o scanner foi fechado, parar a câmera
      stopScanning();
      return;
    }

    const codeReader = new BrowserQRCodeReader();
    codeReaderRef.current = codeReader;
    setScanning(true);

    codeReader
      .decodeFromVideoDevice(undefined, videoRef.current, (result, error) => {
        if (result) {
          alert(`QR Code escaneado: ${result.getText()}`);
          stopScanning();
          setShowScanner(false);
        }
        if (error && error.name !== "NotFoundException") {
          console.error("Erro ao escanear:", error);
        }
      })
      .catch((err) => {
        console.error("Erro ao iniciar scanner:", err);
        setScanning(false);
      });

    return () => {
      stopScanning();
    };
  }, [showScanner]);

  const stopScanning = () => {

    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }

    if (codeReaderRef.current) {
      codeReaderRef.current = null;
    }

    setScanning(false);
  };

  if (status === "loading") {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#C9A882]">
        <Loader2 className="animate-spin text-[#4E2010]" size={60} />
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 pt-4 pb-20 w-full max-w-screen-xl mx-auto relative">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl text-[#4E2010] font-bold text-center flex-1 uppercase tracking-wide">
          Painel de Recompensas
        </h1>
      </div>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-black/50 p-7 rounded-2xl shadow-lg mb-10 relative overflow-hidden"
      >
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-xl font-bold text-white">
              Olá,{" "}
              <span className="text-[#C9A882]">
                {session?.user?.name ?? "User"}!
              </span>
            </p>
            <p className="text-sm text-white/80">Nível {nivel}</p>
          </div>
          <div className="text-right">
            <span className="text-xs text-white/70">Pontos</span>
            <p className="text-3xl font-extrabold text-[#4E2010]">{pontos}</p>
            <p className="text-xs text-white/70">Válido até {validade}</p>
          </div>
        </div>

        <div className="w-full h-2 bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[#8B4513]"
            initial={{ width: 0 }}
            animate={{ width: `${progresso}%` }}
            transition={{ duration: 1 }}
          />
        </div>
        <p className="text-xs text-right mt-1 text-white/70">
          {progresso.toFixed(1)}% até o próximo nível ({meta} pontos)
        </p>
      </motion.section>

      <section className="mb-10">
        <h2 className="text-lg text-[#4E2010] font-bold mb-4 uppercase tracking-wide">
          Resgatar Cupom
        </h2>
        <div className="flex flex-col sm:flex-row w-full max-w-xl bg-black/50 rounded-2xl sm:rounded-full shadow p-2 gap-2">
          <input
            type="text"
            placeholder="CADASTRE O CÓDIGO DO CUPOM"
            className="w-full flex-1 bg-black/70 text-white placeholder-white/70 px-4 py-3 rounded-full focus:outline-none text-sm"
          />
          <div className="flex gap-2 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none bg-[#4E2010] hover:bg-[#3c1c11] text-white text-sm font-bold px-6 py-3 rounded-full transition uppercase">
              Enviar
            </button>
            <button
              className="hover:bg-black/50 cursor-pointer text-white p-3 rounded-full transition flex items-center justify-center"
              onClick={() => setShowScanner(!showScanner)}
            >
              <ScanLine size={22} />
            </button>
          </div>
        </div>
      </section>

      {showScanner && (
        <section className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg text-[#4E2010] font-bold uppercase tracking-wide">
              Scanner QR Code
            </h2>
            <button
              onClick={() => {
                stopScanning();
                setShowScanner(false);
              }}
              className="text-[#4E2010] hover:text-[#3c1c11] font-bold text-sm flex items-center gap-1"
            >
              <X size={20} /> Fechar
            </button>
          </div>
          <div className="bg-black/50 p-6 rounded-2xl shadow-lg">
            <video
              ref={videoRef}
              className="w-full max-w-md mx-auto rounded-xl"
              style={{ maxHeight: "400px" }}
            />
            {scanning && (
              <p className="text-center text-white mt-4 text-sm">
                Aponte a câmera para o QR Code...
              </p>
            )}
          </div>
        </section>
      )}

      <section className="mb-10">
        <h2 className="text-lg text-[#4E2010] font-bold mb-4 uppercase tracking-wide">
          Conquistas Recentes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              icon: (
                <Flame
                  className="text-[#FF6347]"
                  aria-label="Conquista: Combo Semanal"
                />
              ),
              title: "Combo Semanal",
              desc: "5 compras em menos de 7 dias",
            },
            {
              icon: (
                <TrendingUp
                  className="text-white"
                  aria-label="Conquista: Fidelidade Ouro"
                />
              ),
              title: "Fidelidade Ouro",
              desc: "Mais de R$500 em compras",
            },
          ].map((achieve, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-4 p-4 bg-black/50 rounded-xl shadow-lg"
              whileHover={{ scale: 1.03 }}
            >
              <div className="text-3xl">{achieve.icon}</div>
              <div>
                <p className="font-bold text-white">{achieve.title}</p>
                <span className="text-sm text-white/70">{achieve.desc}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-lg text-[#4E2010] font-bold mb-4 uppercase tracking-wide">
          Recompensas Disponíveis
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { title: "10% de desconto", points: 1000 },
            { title: "Café Grátis", points: 1000 },
            { title: "Ganhe um Combo", points: 2000 },
          ].map((promo, i) => (
            <motion.div
              key={i}
              className="bg-black/50 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition group"
              whileHover={{ scale: 1.03 }}
            >
              <div className="p-4 text-sm">
                <p className="font-bold mb-2 text-white">{promo.title}</p>
                <p className="text-xs text-white/70 flex items-center gap-1">
                  <Gift size={14} aria-label="Ícone de presente" />{" "}
                  {promo.points} pontos
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
      <NavBottom />

      {!session && (
        <div>
          <PopupLogin />
        </div>
      )}
    </main>
  );
}
