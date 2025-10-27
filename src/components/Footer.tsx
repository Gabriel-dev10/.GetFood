import React, { useState } from "react";
import { useRouter } from "next/navigation";
import PoliticaPrivacidadeModal from "./PoliticaPrivacidadeModal";
import TermosUsoModal from "./TermosUsoModal";

interface FooterProps {
  onContatoClick?: () => void;
}

/**
 * Componente de rodapé do sistema GetFood.
 *
 * Exibe informações institucionais, links de política e contato.
 * Responsivo para desktop e mobile.
 *
 * @param {FooterProps} props - Props do componente
 * @returns {JSX.Element} Elemento do rodapé
 */
const Footer: React.FC<FooterProps> = ({ onContatoClick }) => {
  const router = useRouter();
  const [showPolitica, setShowPolitica] = useState(false);
  const [showTermos, setShowTermos] = useState(false);

  const handleContatoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onContatoClick) {
      onContatoClick();
    } else {
      // Se não tem callback, redireciona para a página principal com query param
      router.push("/?contato=true");
    }
  };
  return (
    <footer className="mt-auto pt-4 pb-3 px-4 border-t border-black">
      <div className="max-w-screen-xl mx-auto">
        {/* Container principal com layout responsivo */}
        <div className="flex flex-col gap-2 items-center justify-center md:flex-row md:justify-between md:items-center md:gap-4">
          
          {/* Links - Horizontal em todas as telas */}
          <nav className="order-1 md:order-2" aria-label="Links do rodapé">
            <div className="flex flex-row flex-wrap gap-x-3 gap-y-1 items-center justify-center text-center md:gap-6">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setShowPolitica(true);
                }}
                className="text-black text-xs md:text-sm hover:text-gray-600 transition-colors active:text-gray-700 cursor-pointer"
                aria-label="Política de Privacidade"
              >
                Política de Privacidade
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setShowTermos(true);
                }}
                className="text-black text-xs md:text-sm hover:text-gray-600 transition-colors active:text-gray-700 cursor-pointer"
                aria-label="Termos de Uso"
              >
                Termos de Uso
              </button>
              <button 
                onClick={handleContatoClick}
                className="text-black text-xs md:text-sm hover:text-gray-600 transition-colors active:text-gray-700 cursor-pointer"
                aria-label="Contato"
              >
                Contato
              </button>
            </div>
          </nav>

          {/* Copyright */}
          <div className="text-center md:text-left order-2 md:order-1 mt-1.5 md:mt-0">
            <p className="text-black text-[10px] md:text-sm leading-tight">
              {new Date().getFullYear()}
              <sup>©</sup> .GetFood | Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>

      {/* Modais */}
      <PoliticaPrivacidadeModal 
        showModal={showPolitica} 
        onClose={() => setShowPolitica(false)} 
      />
      <TermosUsoModal 
        showModal={showTermos} 
        onClose={() => setShowTermos(false)} 
      />
    </footer>
  );
};

export default Footer;
