"use client";

import NavBottom from "../../components/NavBottom";
import Footer from "@/components/Footer";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import ProgressCard from "@/components/ProgressCard";
import QRScanner from "@/components/QRScanner";
import ConquistasList, { Conquista } from "@/components/ConquistasList";
import RecompensasList, { Recompensa } from "@/components/RecompensasList";
import PopupFeedback from "@/components/PopupFeedback";

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
  const [conquistas, setConquistas] = useState<Conquista[]>([]);
  const [loadingRecompensas, setLoadingRecompensas] = useState(true);
  const [loadingConquistas, setLoadingConquistas] = useState(true);
  const [pontos, setPontos] = useState(0);
  const [loadingPontos, setLoadingPontos] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<"success" | "error" | "warning">("success");
  const [isScanning, setIsScanning] = useState(false);

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
    const fetchConquistas = async () => {
      if (!session?.user) {
        setLoadingConquistas(false);
        return;
      }

      try {
        const response = await fetch('/api/conquistas');
        if (response.ok) {
          const data = await response.json();
          setConquistas(data);
        } else {
          console.error("Erro ao buscar conquistas");
        }
      } catch (error) {
        console.error("Erro ao buscar conquistas:", error);
      } finally {
        setLoadingConquistas(false);
      }
    };

    fetchConquistas();
  }, [session, pontos]);

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
        
        const conquistasResponse = await fetch('/api/conquistas');
        if (conquistasResponse.ok) {
          const conquistasData = await conquistasResponse.json();
          setConquistas(conquistasData);
        }

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

      <ConquistasList
        conquistas={conquistas}
        loading={loadingConquistas}
        pontosUsuario={pontos}
      />

      <RecompensasList
        recompensas={recompensas}
        loading={loadingRecompensas}
        pontosUsuario={pontos}
      />
      
      <Footer />
      <NavBottom />

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
