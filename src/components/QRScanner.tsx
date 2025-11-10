"use client";

import { useState, useRef, useEffect } from "react";
import { ScanLine, X } from "lucide-react";
import { BrowserQRCodeReader } from "@zxing/browser";

interface QRScannerProps {
  onScanSuccess?: (code: string) => void;
}

export default function QRScanner({ onScanSuccess }: QRScannerProps) {
  const [showScanner, setShowScanner] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const [codigoCupom, setCodigoCupom] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const codeReaderRef = useRef<BrowserQRCodeReader | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = async () => {
    if (!videoRef.current) return;

    try {
      setCameraError("");
      setScanning(true);

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error(
          "Seu navegador não suporta acesso à câmera. Use Chrome ou Safari atualizado."
        );
      }

      let stream: MediaStream | null = null;

      try {
        const constraints = {
          video: {
            facingMode: { exact: "environment" },
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
          audio: false,
        };
        stream = await navigator.mediaDevices.getUserMedia(constraints);
      } catch {
        console.log(
          "Câmera traseira não disponível, tentando qualquer câmera..."
        );
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

      startQRScanning();

      console.log("Câmera iniciada com sucesso");
    } catch (error: unknown) {
      console.error("Erro ao acessar a câmera:", error);
      let errorMessage = "Não foi possível acessar a câmera. ";
      const err = error as { name?: string; message?: string };

      if (
        err.name === "NotAllowedError" ||
        err.name === "PermissionDeniedError"
      ) {
        errorMessage +=
          "Permissão negada. Clique em 'Permitir' quando o navegador solicitar acesso à câmera.";
      } else if (
        err.name === "NotFoundError" ||
        err.name === "DevicesNotFoundError"
      ) {
        errorMessage += "Nenhuma câmera encontrada no dispositivo.";
      } else if (
        err.name === "NotReadableError" ||
        err.name === "TrackStartError"
      ) {
        errorMessage +=
          "A câmera está sendo usada por outro aplicativo. Feche outros apps que usam câmera.";
      } else if (err.name === "NotSupportedError") {
        errorMessage +=
          "Acesso à câmera não suportado. Certifique-se de estar usando HTTPS ou localhost.";
      } else if (err.message) {
        errorMessage += err.message;
      } else {
        errorMessage +=
          "Erro desconhecido. Tente usar o navegador Chrome ou Safari.";
      }

      setCameraError(errorMessage);
      setScanning(false);
    }
  };

  const startQRScanning = async () => {
    if (!videoRef.current) return;

    try {
      const codeReader = new BrowserQRCodeReader();
      codeReaderRef.current = codeReader;

      let hasScanned = false;

      codeReader.decodeFromVideoElement(videoRef.current, (result, error) => {
        if (result && !hasScanned && !isProcessing) {
          hasScanned = true;
          const code = result.getText();
          console.log("QR Code detectado:", code);
          
          setIsProcessing(true);
          
          if (onScanSuccess) {
            onScanSuccess(code);
          }
          
          setTimeout(() => {
            stopCamera();
            setShowScanner(false);
            setIsProcessing(false);
          }, 300);
        }
        
        if (error && error.name !== "NotFoundException" && !hasScanned) {
        }
      });
    } catch (error) {
      console.error("Erro ao iniciar scanner:", error);
    }
  };

  const stopCamera = () => {
    if (codeReaderRef.current) {
      codeReaderRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showScanner]);

  const handleResgatar = () => {
    if (codigoCupom && onScanSuccess && !isProcessing) {
      setIsProcessing(true);
      onScanSuccess(codigoCupom);
      setCodigoCupom("");
      setTimeout(() => setIsProcessing(false), 1000);
    }
  };

  return (
    <section className="mb-10">
      <h2 className="text-lg text-[#4E2010] font-bold mb-4 uppercase tracking-wide">
        Escanear QR Code
      </h2>
      <div className="bg-black/50 p-6 rounded-2xl shadow-lg space-y-4">
        <div>
          <h3 className="text-white font-semibold mb-3 text-sm">
            Inserir Código Manualmente
          </h3>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              placeholder="Digite o código"
              value={codigoCupom}
              onChange={(e) => setCodigoCupom(e.target.value.toUpperCase())}
              className="w-full flex-1 bg-black/70 text-white placeholder-white/50 px-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-[#C9A882] text-sm uppercase"
            />
            <button 
              onClick={handleResgatar}
              disabled={isProcessing || !codigoCupom}
              className="bg-[#4E2010] hover:bg-[#3c1c11] disabled:bg-gray-500 disabled:cursor-not-allowed text-white text-sm font-bold px-8 py-3 rounded-full transition uppercase w-full sm:w-auto"
            >
              {isProcessing ? "Processando..." : "Resgatar"}
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

      {showScanner && (
        <div className="mt-6">
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
        </div>
      )}
    </section>
  );
}
