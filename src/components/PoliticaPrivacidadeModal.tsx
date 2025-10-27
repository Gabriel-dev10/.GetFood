import React from "react";
import { motion } from "framer-motion";
import { Shield, Lock, Eye, Database, UserCheck, AlertCircle } from "lucide-react";

interface PoliticaPrivacidadeModalProps {
  showModal: boolean;
  onClose: () => void;
}

/**
 * Modal de Política de Privacidade do sistema GetFood.
 *
 * Exibe informações sobre coleta, uso e proteção de dados pessoais.
 *
 * @param {PoliticaPrivacidadeModalProps} props - Props do componente
 * @returns {JSX.Element | null} Elemento do modal ou null
 */
const PoliticaPrivacidadeModal: React.FC<PoliticaPrivacidadeModalProps> = ({
  showModal,
  onClose,
}) => {
  if (!showModal) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      aria-labelledby="politica-modal-title"
      role="dialog"
      aria-modal="true"
    >
      <motion.div
        className="relative bg-gradient-to-br from-[#2a2e38] to-[#1f2229] text-white rounded-3xl shadow-2xl w-full max-w-3xl flex flex-col mx-auto border border-white/5 overflow-hidden max-h-[90vh]"
        initial={{ scale: 0.9, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 30, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative px-4 sm:px-6 pt-6 sm:pt-8 pb-4 sm:pb-6 border-b border-white/10">
          <button
            onClick={onClose}
            className="absolute top-3 sm:top-4 right-3 sm:right-4 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-white/70 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-all duration-200 focus:outline-none"
            aria-label="Fechar modal"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-blue-500/20 rounded-xl">
              <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
            </div>
            <div>
              <h2 id="politica-modal-title" className="text-lg sm:text-2xl font-bold tracking-tight text-white pr-8">
                Política de Privacidade
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
                Atualizado em {new Date().toLocaleDateString('pt-BR')}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 px-4 sm:px-6 py-4 sm:py-6 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent hover:scrollbar-thumb-white/20">
          <div className="space-y-6">
            {/* Introdução */}
            <section>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                A <span className="font-semibold text-white">.GetFood</span> e o <span className="font-semibold text-white">GBC Coffee</span> levam
                a sua privacidade a sério. Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas informações
                pessoais quando você utiliza nossos serviços.
              </p>
            </section>

            {/* 1. Coleta de Informações */}
            <section className="bg-white/5 rounded-xl p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-3">
                <Database className="w-5 h-5 text-purple-400" />
                <h3 className="text-base sm:text-lg font-semibold text-white">1. Informações que Coletamos</h3>
              </div>
              <div className="space-y-2 text-sm sm:text-base text-gray-300">
                <p><strong className="text-white">Informações de Cadastro:</strong> Nome, e-mail, telefone, CPF e senha criptografada.</p>
                <p><strong className="text-white">Informações de Pedidos:</strong> Histórico de compras, produtos favoritos e preferências.</p>
                <p><strong className="text-white">Informações de Pagamento:</strong> Forma de pagamento escolhida (não armazenamos dados de cartão).</p>
                <p><strong className="text-white">Informações de Uso:</strong> Como você navega e interage com nosso aplicativo.</p>
              </div>
            </section>

            {/* 2. Como Usamos */}
            <section className="bg-white/5 rounded-xl p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-3">
                <Eye className="w-5 h-5 text-green-400" />
                <h3 className="text-base sm:text-lg font-semibold text-white">2. Como Usamos Suas Informações</h3>
              </div>
              <ul className="space-y-2 text-sm sm:text-base text-gray-300 list-disc list-inside">
                <li>Processar e gerenciar seus pedidos</li>
                <li>Autenticar sua conta e garantir segurança</li>
                <li>Melhorar nossos serviços e experiência do usuário</li>
                <li>Enviar notificações sobre pedidos e promoções</li>
                <li>Gerar programa de pontos e recompensas</li>
                <li>Cumprir obrigações legais e regulatórias</li>
              </ul>
            </section>

            {/* 3. Proteção de Dados */}
            <section className="bg-white/5 rounded-xl p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-3">
                <Lock className="w-5 h-5 text-yellow-400" />
                <h3 className="text-base sm:text-lg font-semibold text-white">3. Proteção e Segurança</h3>
              </div>
              <div className="space-y-2 text-sm sm:text-base text-gray-300">
                <p>Implementamos medidas de segurança técnicas e organizacionais para proteger seus dados:</p>
                <ul className="list-disc list-inside ml-4 space-y-1 mt-2">
                  <li>Criptografia de senhas e dados sensíveis</li>
                  <li>Conexão segura via HTTPS/SSL</li>
                  <li>Acesso restrito aos dados por funcionários autorizados</li>
                  <li>Backups regulares e seguros</li>
                  <li>Monitoramento contínuo de segurança</li>
                </ul>
              </div>
            </section>

            {/* 4. Compartilhamento */}
            <section className="bg-white/5 rounded-xl p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-3">
                <UserCheck className="w-5 h-5 text-blue-400" />
                <h3 className="text-base sm:text-lg font-semibold text-white">4. Compartilhamento de Informações</h3>
              </div>
            	<div className="space-y-2 text-sm sm:text-base text-gray-300">
            	  <p>Não vendemos suas informações pessoais. Podemos compartilhar dados apenas com:</p>
            	  <ul className="list-disc list-inside ml-4 space-y-1 mt-2">
            		<li>Provedores de serviços necessários para operação (ex: hospedagem)</li>
            		<li>Autoridades legais quando exigido por lei</li>
            		<li>Parceiros com seu consentimento explícito</li>
            	  </ul>
            	</div>
          	</section>

          	{/* 5. Seus Direitos */}
          	<section className="bg-white/5 rounded-xl p-4 sm:p-5">
          	  <div className="flex items-center gap-2 mb-3">
          		<AlertCircle className="w-5 h-5 text-red-400" />
          		<h3 className="text-base sm:text-lg font-semibold text-white">5. Seus Direitos (LGPD)</h3>
          	  </div>
          	  <ul className="space-y-2 text-sm sm:text-base text-gray-300 list-disc list-inside">
          		<li>Acessar e revisar seus dados pessoais</li>
          		<li>Corrigir informações incompletas ou incorretas</li>
          		<li>Solicitar a exclusão de seus dados</li>
          		<li>Revogar consentimento a qualquer momento</li>
          		<li>Portabilidade dos seus dados</li>
          		<li>Opor-se ao processamento de dados</li>
          	  </ul>
          	</section>

          	{/* 6. Cookies */}
          	<section className="bg-white/5 rounded-xl p-4 sm:p-5">
          	  <div className="flex items-center gap-2 mb-3">
          		<Database className="w-5 h-5 text-indigo-400" />
          		<h3 className="text-base sm:text-lg font-semibold text-white">6. Cookies e Tecnologias</h3>
          	  </div>
          	  <p className="text-sm sm:text-base text-gray-300">
          		Utilizamos cookies e tecnologias similares para melhorar sua experiência, manter você conectado e analisar
          		o uso do aplicativo. Você pode gerenciar preferências de cookies nas configurações do navegador.
          	  </p>
          	</section>

          	{/* 7. Retenção de Dados */}
          	<section className="bg-white/5 rounded-xl p-4 sm:p-5">
          	  <div className="flex items-center gap-2 mb-3">
          		<Database className="w-5 h-5 text-orange-400" />
          		<h3 className="text-base sm:text-lg font-semibold text-white">7. Retenção de Dados</h3>
          	  </div>
          	  <p className="text-sm sm:text-base text-gray-300">
          		Mantemos suas informações apenas pelo tempo necessário para cumprir as finalidades descritas nesta política,
          		ou conforme exigido por lei. Após esse período, os dados são excluídos ou anonimizados de forma segura.
          	  </p>
          	</section>

          	{/* Contato */}
          	<section className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-4 sm:p-5 border border-blue-500/20">
          	  <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Dúvidas sobre Privacidade?</h3>
          	  <p className="text-sm sm:text-base text-gray-300">
          		Entre em contato conosco através da aba &quot;Sobre&quot; nas Informações do aplicativo ou visite-nos pessoalmente
          		no GBC Coffee, Av. Roberto Silveira, 2082 - Flamengo, Maricá - RJ.
          	  </p>
          	</section>
          </div>
        </div>
      </motion.div>
      </motion.div>
   );
};

export default PoliticaPrivacidadeModal;