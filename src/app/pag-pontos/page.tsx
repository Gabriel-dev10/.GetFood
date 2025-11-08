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
  const [codigoCupom, setCodigoCupom] = useState("");
  const [cameraError, setCameraError] = useState("");
  const [recompensas, setRecompensas] = useState<any[]>([]);
  const [loadingRecompensas, setLoadingRecompensas] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const codeReaderRef = useRef<BrowserQRCodeReader | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const pontos = 0;
  const nivel = 1;
  const meta = 1000;
  const progresso = (pontos / meta) * 100;
  const validade = "26/08/2026";

  // Buscar recompensas do banco
  useEffect(() => {
    const fetchRecompensas = async () => {
      try {
        const response = await fetch("/api/recompensas");
        if (response.ok) {
          const data = await response.json();
          setRecompensas(data);
        } else {
          console.error("Erro ao buscar recompensas");
        }
      } catch (error) {
        console.error("Erro ao buscar recompensas:", error);
      } finally {
        setLoadingRecompensas(false);
      }
    };

    fetchRecompensas();
  }, []);

  const startCamera = async () => {
    if (!videoRef.current) return;

    try {
      setCameraError("");
      setScanning(true);

      // Para qualquer stream anterior
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }

      // Verifica se getUserMedia está disponível
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Seu navegador não suporta acesso à câmera. Use Chrome ou Safari atualizado.");
      }

      // Tenta primeiro com a câmera traseira, depois qualquer câmera disponível
      let stream: MediaStream | null = null;
      
      try {
        // Tenta câmera traseira primeiro
        const constraints = {
          video: {
            facingMode: { exact: "environment" },
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
          audio: false,
        };
        stream = await navigator.mediaDevices.getUserMedia(constraints);
      } catch (err) {
        console.log("Câmera traseira não disponível, tentando qualquer câmera...");
        // Se falhar, tenta qualquer câmera
        const constraints = {
          video: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
          audio: false,
        };
        stream = await navigator.mediaDevices.getUserMedia(constraints);
      }

      if (!stream) {
        throw new Error("Não foi possível obter acesso à câmera");
      }

      streamRef.current = stream;
      videoRef.current.srcObject = stream;
      videoRef.current.setAttribute("playsinline", "");
      videoRef.current.setAttribute("autoplay", "");
      videoRef.current.setAttribute("muted", "");
      videoRef.current.muted = true;
      videoRef.current.controls = false;
      
      await videoRef.current.play();
      
      console.log("Câmera iniciada com sucesso");
    } catch (error: any) {
      console.error("Erro ao acessar a câmera:", error);
      let errorMessage = "Não foi possível acessar a câmera. ";
      
      if (error.name === "NotAllowedError" || error.name === "PermissionDeniedError") {
        errorMessage += "Permissão negada. Clique em 'Permitir' quando o navegador solicitar acesso à câmera.";
      } else if (error.name === "NotFoundError" || error.name === "DevicesNotFoundError") {
        errorMessage += "Nenhuma câmera encontrada no dispositivo.";
      } else if (error.name === "NotReadableError" || error.name === "TrackStartError") {
        errorMessage += "A câmera está sendo usada por outro aplicativo. Feche outros apps que usam câmera.";
      } else if (error.name === "NotSupportedError") {
        errorMessage += "Acesso à câmera não suportado. Certifique-se de estar usando HTTPS ou localhost.";
      } else if (error.message) {
        errorMessage += error.message;
      } else {
        errorMessage += "Erro desconhecido. Tente usar o navegador Chrome ou Safari.";
      }
      
      setCameraError(errorMessage);
      setScanning(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    if (codeReaderRef.current) {
      codeReaderRef.current = null;
    }

    setScanning(false);
    setCameraError("");
  };

  useEffect(() => {
    if (showScanner) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [showScanner]);

  if (status === "loading") {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#C9A882]">
        <Loader2 className="animate-spin text-[#4E2010]" size={60} />
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 pt-4 mt-3 pb-20 w-full max-w-screen-xl mx-auto relative">
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
        <div className="bg-black/50 p-6 rounded-2xl shadow-lg space-y-4">
          <div>
            <h3 className="text-white font-semibold mb-3 text-sm">
              Inserir Código do Cupom
            </h3>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="Digite o código do cupom"
                value={codigoCupom}
                onChange={(e) => setCodigoCupom(e.target.value.toUpperCase())}
                className="w-full flex-1 bg-black/70 text-white placeholder-white/50 px-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-[#C9A882] text-sm uppercase"
              />
              <button className="bg-[#4E2010] hover:bg-[#3c1c11] text-white text-sm font-bold px-8 py-3 rounded-full transition uppercase w-full sm:w-auto">
                Resgatar
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-5">
            <div className="flex-1 h-px bg-white/20"></div>
            <span className="text-white/50 text-xs uppercase">Ou</span>
            <div className="flex-1 h-px bg-white/20"></div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3 text-sm">
              Escanear QR Code
            </h3>
            <button
              onClick={() => setShowScanner(!showScanner)}
              className="w-full bg-[#C9A882] hover:bg-[#b89870] text-[#4E2010] font-bold px-6 py-4 rounded-xl transition flex items-center justify-center gap-3"
            >
              <ScanLine size={24} />
              <span className="uppercase text-sm">
                {showScanner ? "Fechar Scanner" : "Abrir Scanner de QR Code"}
              </span>
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
                stopCamera();
                setShowScanner(false);
              }}
              className="text-[#4E2010] hover:text-[#3c1c11] font-bold text-sm flex items-center gap-1"
            >
              <X size={20} /> Fechar
            </button>
          </div>
          <div className="bg-black/50 p-6 rounded-2xl shadow-lg">
            {cameraError && (
              <div className="bg-red-500/20 border border-red-500 text-white p-4 rounded-xl mb-4">
                <p className="text-sm">{cameraError}</p>
                <button
                  onClick={startCamera}
                  className="mt-2 bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg text-xs font-bold"
                >
                  Tentar Novamente
                </button>
              </div>
            )}
            <video
              ref={videoRef}
              playsInline
              autoPlay
              muted
              className="w-full max-w-md mx-auto rounded-xl bg-black"
              style={{ maxHeight: "400px", minHeight: "300px" }}
            />
            {scanning && !cameraError && (
              <p className="text-center text-white mt-4 text-sm">
                Câmera ativa - Aponte para o QR Code...
              </p>
            )}
            {!scanning && !cameraError && (
              <p className="text-center text-white/50 mt-4 text-sm">
                Iniciando câmera...
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
        {loadingRecompensas ? (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="animate-spin text-[#4E2010]" size={40} />
          </div>
        ) : recompensas.length === 0 ? (
          <div className="bg-black/50 p-6 rounded-xl text-center">
            <p className="text-white/70">Nenhuma recompensa disponível no momento.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {recompensas.map((recompensa) => (
              <motion.div
                key={recompensa.id}
                className="bg-black/50 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition group"
                whileHover={{ scale: 1.03 }}
              >
                <div className="p-4 text-sm">
                  <p className="font-bold mb-2 text-white">{recompensa.titulo}</p>
                  {recompensa.descricao && (
                    <p className="text-xs text-white/50 mb-2 line-clamp-2">
                      {recompensa.descricao}
                    </p>
                  )}
                  <p className="text-xs text-white/70 flex items-center gap-1">
                    <Gift size={14} aria-label="Ícone de presente" />{" "}
                    {recompensa.pontos} pontos
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
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
