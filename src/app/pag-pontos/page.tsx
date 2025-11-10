"use client";

import NavBottom from "../../components/NavBottom";
import Footer from "@/components/Footer";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProgressCard from "@/components/ProgressCard";
import QRScanner from "@/components/QRScanner";
import RecompensasList, { Recompensa } from "@/components/RecompensasList";
import PopupFeedback from "@/components/PopupFeedback";
import RecompensaModal from "@/components/RecompensaModal";
import RecompensaResgatadaModal from "@/components/RecompensaResgatadaModal";
import CelebracaoResgate from "@/components/CelebracaoResgate";
import { Gift, Calendar, CheckCircle } from "lucide-react";

export interface RecompensaResgatada {
  id: number;
  titulo: string;
  descricao?: string | null;
  pontos_gastos: number;
  data_resgate: string;
  utilizado: boolean;
}

/**
 * Página de painel de pontos e recompensas do usuário.
 *
 * Exibe progresso, conquistas e recompensas disponíveis.
 *
 * @returns {JSX.Element} Elemento da página de pontos
 */
export default function PagPontos() {
  const { data: session, status } = useSession();
  const [recompensas, setRecompensas] = useState<Recompensa[]>([]);
  const [recompensasResgatadas, setRecompensasResgatadas] = useState<RecompensaResgatada[]>([]);
  const [loadingRecompensas, setLoadingRecompensas] = useState(true);
  const [loadingRecompensasResgatadas, setLoadingRecompensasResgatadas] = useState(true);
  const [pontos, setPontos] = useState(0);
  const [loadingPontos, setLoadingPontos] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<"success" | "error" | "warning">("success");
  const [isScanning, setIsScanning] = useState(false);
  const [selectedRecompensa, setSelectedRecompensa] = useState<Recompensa | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecompensaResgatada, setSelectedRecompensaResgatada] = useState<RecompensaResgatada | null>(null);
  const [isModalResgatadaOpen, setIsModalResgatadaOpen] = useState(false);
  const [showCelebracao, setShowCelebracao] = useState(false);
  const [recompensaResgatadaTitulo, setRecompensaResgatadaTitulo] = useState("");

  const nivel = Math.floor(pontos / 1000) + 1;
  const meta = nivel * 1000;
  const validade = "26/08/2026";

  // Buscar pontos do usuário
  useEffect(() => {
    const fetchPontos = async () => {
      if (!session?.user) {
        setLoadingPontos(false);
        return;
      }

      try {
        const response = await fetch('/api/usuarios/pontos');
        if (response.ok) {
          const data = await response.json();
          setPontos(data.pontos_total || 0);
        } else {
          console.error("Erro ao buscar pontos");
        }
      } catch (error) {
        console.error("Erro ao buscar pontos:", error);
      } finally {
        setLoadingPontos(false);
      }
    };

    fetchPontos();
  }, [session]);

  useEffect(() => {
    const fetchRecompensas = async () => {
      try {
        const response = await fetch("/api/recompensas");
        if (response.ok) {
          const data = await response.json();
          // Ajustar primeira recompensa para teste
          if (data.length > 0) {
            data[0].pontos = 0;
          }
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

  useEffect(() => {
    const fetchRecompensasResgatadas = async () => {
      if (!session?.user) {
        setLoadingRecompensasResgatadas(false);
        return;
      }

      try {
        const response = await fetch("/api/recompensas/resgatadas");
        if (response.ok) {
          const data = await response.json();
          setRecompensasResgatadas(data);
        } else {
          console.error("Erro ao buscar recompensas resgatadas");
        }
      } catch (error) {
        console.error("Erro ao buscar recompensas resgatadas:", error);
      } finally {
        setLoadingRecompensasResgatadas(false);
      }
    };

    fetchRecompensasResgatadas();
  }, [session]);

  const handleScanSuccess = async (codigo: string) => {
    if (isScanning) {
      return;
    }

    setIsScanning(true);

    try {
      const response = await fetch('/api/qr/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ codigoQR: codigo }),
      });

      const data = await response.json();

      if (response.ok) {
        setAlertType("success");
        setAlertMessage(`${data.message}\n Pontos totais: ${data.pontosTotal}`);
        setShowAlert(true);
        
        setPontos(data.pontosTotal);
        
        setTimeout(() => {
          setShowAlert(false);
          setIsScanning(false);
        }, 3000);
      } else {
        if (data.jaScanneado) {
          setAlertType("warning");
          setAlertMessage('Você já escaneou este QR Code hoje!\n\nTente novamente amanhã.');
        } else {
          setAlertType("error");
          setAlertMessage(`Erro: ${data.error}`);
        }
        setShowAlert(true);

        setTimeout(() => {
          setShowAlert(false);
          setIsScanning(false);
        }, 3000);
      }
    } catch (error) {
      console.error('Erro ao escanear:', error);
      setAlertType("error");
      setAlertMessage('Erro ao processar QR Code');
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        setIsScanning(false);
      }, 3000);
    }
  };

  const handleRecompensaClick = (recompensa: Recompensa) => {
    setSelectedRecompensa(recompensa);
    setIsModalOpen(true);
  };

  const handleResgatar = async (recompensaId: number) => {
    try {
      // TODO: Implementar chamada para API de resgate quando o backend estiver pronto
      // const response = await fetch('/api/recompensas/resgatar', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ recompensaId }),
      // });

      // const data = await response.json();

      // Simulação temporária - remover quando a API estiver pronta
      console.log('Resgatando recompensa:', recompensaId);
      
      // Fechar modal de resgate
      setIsModalOpen(false);
      
      // Mostrar celebração
      const recompensa = recompensas.find(r => r.id === recompensaId);
      if (recompensa) {
        setRecompensaResgatadaTitulo(recompensa.titulo);
        setShowCelebracao(true);
      }

      // Quando a API estiver pronta, descomentar o código abaixo:
      /*
      if (response.ok) {
        // Fechar modal de resgate
        setIsModalOpen(false);
        
        // Atualizar pontos do usuário
        setPontos(data.pontosRestantes);
        
        // Mostrar celebração
        const recompensa = recompensas.find(r => r.id === recompensaId);
        if (recompensa) {
          setRecompensaResgatadaTitulo(recompensa.titulo);
          setShowCelebracao(true);
        }
        
        // Recarregar lista de recompensas resgatadas
        const resgatadas = await fetch("/api/recompensas/resgatadas");
        if (resgatadas.ok) {
          const dataResgatadas = await resgatadas.json();
          setRecompensasResgatadas(dataResgatadas);
        }
      } else {
        setAlertType("error");
        setAlertMessage(`Erro: ${data.error || 'Não foi possível resgatar a recompensa'}`);
        setShowAlert(true);
        
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
      }
      */
    } catch (error) {
      console.error('Erro ao resgatar recompensa:', error);
      setAlertType("error");
      setAlertMessage('Erro ao processar resgate');
      setShowAlert(true);
      
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
  };

  const handleRecompensaResgatadaClick = (recompensa: RecompensaResgatada) => {
    setSelectedRecompensaResgatada(recompensa);
    setIsModalResgatadaOpen(true);
  };

  if (status === "loading" || loadingPontos) {
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

      <ProgressCard
        userName={session?.user?.name}
        pontos={pontos}
        nivel={nivel}
        meta={meta}
        validade={validade}
      />

      <QRScanner onScanSuccess={handleScanSuccess} />

      <RecompensasList
        recompensas={recompensas}
        loading={loadingRecompensas}
        pontosUsuario={pontos}
        onRecompensaClick={handleRecompensaClick}
      />

      {/* Seção de Recompensas Resgatadas */}
      {loadingRecompensasResgatadas ? (
        <section className="mb-10">
          <h2 className="text-lg text-[#4E2010] font-bold mb-4 uppercase tracking-wide">
            Minhas Recompensas
          </h2>
          <div className="flex justify-center items-center py-10">
            <Loader2 className="animate-spin text-[#4E2010]" size={40} />
          </div>
        </section>
      ) : recompensasResgatadas.length === 0 ? (
        <section className="mb-10">
          <h2 className="text-lg text-[#4E2010] font-bold mb-4 uppercase tracking-wide">
            Minhas Recompensas
          </h2>
          <div className="bg-black/50 p-6 rounded-xl text-center">
            <p className="text-white/70 mb-1">
              Você ainda não resgatou nenhuma recompensa.
            </p>
            <p className="text-white/50 text-sm">
              Continue acumulando pontos e resgate sua primeira recompensa!
            </p>
          </div>
        </section>
      ) : (
        <section className="mb-10">
          <h2 className="text-lg text-[#4E2010] font-bold mb-4 uppercase tracking-wide">
            Minhas Recompensas ({recompensasResgatadas.length})
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {recompensasResgatadas.map((recompensa) => {
              const formatarData = (dataString: string) => {
                const data = new Date(dataString);
                return data.toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                });
              };

              return (
                <motion.div
                  key={recompensa.id}
                  className={`bg-black/50 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition group cursor-pointer ${
                    recompensa.utilizado
                      ? "border-2 border-gray-500/30 opacity-60"
                      : "border-2 border-[#C9A882]/50"
                  }`}
                  whileHover={{ scale: 1.03 }}
                  onClick={() => handleRecompensaResgatadaClick(recompensa)}
                >
                  <div className="p-4 text-sm">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-bold text-white line-clamp-1">
                        {recompensa.titulo}
                      </p>
                      {!recompensa.utilizado && (
                        <span className="text-xs bg-[#C9A882] text-[#4E2010] px-2 py-1 rounded-full font-semibold flex-shrink-0 ml-1">
                          Ativo
                        </span>
                      )}
                    </div>
                    {recompensa.descricao && (
                      <p className="text-xs text-white/50 mb-2 line-clamp-2">
                        {recompensa.descricao}
                      </p>
                    )}
                    <div className="space-y-1">
                      <p className="text-xs text-white/70 flex items-center gap-1">
                        <Gift size={14} aria-label="Pontos gastos" />{" "}
                        {recompensa.pontos_gastos} pontos
                      </p>
                      <p className="text-xs text-white/60 flex items-center gap-1">
                        <Calendar size={14} aria-label="Data do resgate" />{" "}
                        {formatarData(recompensa.data_resgate)}
                      </p>
                    </div>
                    {recompensa.utilizado && (
                      <div className="mt-2 pt-2 border-t border-white/10">
                        <p className="text-xs text-gray-400 flex items-center gap-1">
                          <CheckCircle size={14} /> Utilizado
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
      )}
      
      <Footer />
      <NavBottom />

      <RecompensaModal
        recompensa={selectedRecompensa}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        pontosUsuario={pontos}
        onResgatar={handleResgatar}
      />

      <RecompensaResgatadaModal
        recompensa={selectedRecompensaResgatada}
        isOpen={isModalResgatadaOpen}
        onClose={() => setIsModalResgatadaOpen(false)}
      />

      <CelebracaoResgate
        isOpen={showCelebracao}
        recompensaTitulo={recompensaResgatadaTitulo}
        onClose={() => setShowCelebracao(false)}
      />

      {showAlert && (
        <PopupFeedback
          title="GBC Coffee"
          message={alertMessage}
          type={alertType}
          onClose={() => {
            setShowAlert(false);
            setIsScanning(false);
          }}
        />
      )}
    </main>
  );
}
