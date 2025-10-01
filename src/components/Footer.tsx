import React from "react";

/**
 * Componente de rodapé do sistema GetFood.
 *
 * Exibe informações institucionais, links de política e contato.
 *
 * @returns {JSX.Element} Elemento do rodapé
 */
const Footer = () => {
  return (
    <footer className="text-sm mt-5 py-3 px-4">
      <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div className="text-center sm:text-left sm:mb-0">
          <p className="text-black">
            {new Date().getFullYear()}
            <sup>©</sup> .GetFood | Todos os direitos reservados.
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex space-x-4 text-black text-xs">
            <a
              href="#"
              className="hover:text-gray-500"
              aria-label="Política de Privacidade"
            >
              Política de Privacidade
            </a>
            <a
              href="#"
              className="hover:text-gray-500"
              aria-label="Termos de Uso"
            >
              Termos de Uso
            </a>
            <a href="#" className="hover:text-gray-500" aria-label="Contato">
              Contato
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
