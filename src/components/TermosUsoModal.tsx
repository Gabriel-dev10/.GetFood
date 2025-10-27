"use client";

import React from "react";
import { motion } from "framer-motion";
import { FileText, CheckCircle, XCircle, AlertTriangle, Scale, Ban } from "lucide-react";

interface TermosUsoModalProps {
  showModal: boolean;
  onClose: () => void;
}

/**
 * Modal de Termos de Uso do sistema GetFood.
 *
 * Exibe as regras, direitos e responsabilidades do uso do serviço.
 *
 * @param {TermosUsoModalProps} props - Props do componente
 * @returns {JSX.Element | null} Elemento do modal ou null
 */
const TermosUsoModal: React.FC<TermosUsoModalProps> = ({
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
      aria-labelledby="termos-modal-title"
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
            <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-emerald-500/20 rounded-xl">
              <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
            </div>
            <div>
              <h2 id="termos-modal-title" className="text-lg sm:text-2xl font-bold tracking-tight text-white pr-8">
                Termos de Uso
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
                Bem-vindo ao <span className="font-semibold text-white">.GetFood</span> e <span className="font-semibold text-white">GBC Coffee</span>!
                Ao utilizar nosso aplicativo e serviços, você concorda com os seguintes termos e condições. Leia atentamente antes de continuar.
              </p>
            </section>

            {/* 1. Aceitação dos Termos */}
            <section className="bg-white/5 rounded-xl p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base sm:text-lg font-semibold text-white">1. Aceitação dos Termos</h3>
              </div>
              <p className="text-sm sm:text-base text-gray-300">
                Ao criar uma conta, fazer pedidos ou utilizar qualquer funcionalidade do aplicativo, você declara ter lido, compreendido
                e aceito estes Termos de Uso e nossa Política de Privacidade. Se você não concordar, não utilize nossos serviços.
              </p>
            </section>

            {/* 2. Cadastro e Conta */}
            <section className="bg-white/5 rounded-xl p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="w-5 h-5 text-blue-400" />
                <h3 className="text-base sm:text-lg font-semibold text-white">2. Cadastro e Conta de Usuário</h3>
              </div>
              <ul className="space-y-2 text-sm sm:text-base text-gray-300 list-disc list-inside">
                <li>Você deve fornecer informações verdadeiras, precisas e atualizadas</li>
                <li>É sua responsabilidade manter a confidencialidade da senha</li>
                <li>Você é responsável por todas as atividades realizadas em sua conta</li>
                <li>Notifique-nos imediatamente sobre qualquer uso não autorizado</li>
                <li>Não é permitido criar múltiplas contas para a mesma pessoa</li>
                <li>Contas podem ser suspensas ou encerradas em caso de violação</li>
              </ul>
            </section>

            {/* 3. Uso do Serviço */}
            <section className="bg-white/5 rounded-xl p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-3">
                <Scale className="w-5 h-5 text-purple-400" />
                <h3 className="text-base sm:text-lg font-semibold text-white">3. Uso Adequado do Serviço</h3>
              </div>
              <div className="space-y-2 text-sm sm:text-base text-gray-300">
                <p><strong className="text-white">Você concorda em:</strong></p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Usar o serviço apenas para finalidades legais e autorizadas</li>
                  <li>Respeitar os direitos de outros usuários</li>
                  <li>Fornecer informações precisas ao fazer pedidos</li>
                  <li>Pagar pelos produtos e serviços solicitados</li>
                </ul>
              </div>
            </section>

            {/* 4. Pedidos e Pagamentos */}
            <section className="bg-white/5 rounded-xl p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="w-5 h-5 text-yellow-400" />
                <h3 className="text-base sm:text-lg font-semibold text-white">4. Pedidos e Pagamentos</h3>
              </div>
              <div className="space-y-2 text-sm sm:text-base text-gray-300">
                <ul className="list-disc list-inside space-y-1">
                  <li>Todos os pedidos estão sujeitos à disponibilidade de produtos</li>
                  <li>Preços podem ser alterados sem aviso prévio</li>
                  <li>Você deve pagar pelo pedido antes ou no momento da entrega/retirada</li>
                  <li>Aceitamos as formas de pagamento descritas no aplicativo</li>
                  <li>Pedidos cancelados seguem nossa política de cancelamento</li>
                  <li>Reservamo-nos o direito de recusar ou cancelar pedidos</li>
                </ul>
              </div>
            </section>

            {/* 5. Programa de Pontos */}
            <section className="bg-white/5 rounded-xl p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="w-5 h-5 text-orange-400" />
                <h3 className="text-base sm:text-lg font-semibold text-white">5. Programa de Pontos e Recompensas</h3>
              </div>
              <ul className="space-y-2 text-sm sm:text-base text-gray-300 list-disc list-inside">
                <li>Pontos são acumulados conforme compras realizadas</li>
                <li>Pontos não têm valor monetário e não são transferíveis</li>
                <li>Pontos podem expirar conforme indicado no aplicativo</li>
                <li>Reservamos o direito de modificar ou encerrar o programa</li>
                <li>Uso indevido pode resultar em perda de pontos e suspensão</li>
              </ul>
            </section>

            {/* 6. Conduta Proibida */}
            <section className="bg-white/5 rounded-xl p-4 sm:p-5 border border-red-500/20">
              <div className="flex items-center gap-2 mb-3">
                <Ban className="w-5 h-5 text-red-400" />
                <h3 className="text-base sm:text-lg font-semibold text-white">6. Condutas Proibidas</h3>
              </div>
              <div className="space-y-2 text-sm sm:text-base text-gray-300">
                <p><strong className="text-white">É estritamente proibido:</strong></p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Usar o serviço para atividades ilegais ou fraudulentas</li>
                  <li>Tentar acessar contas de outros usuários</li>
                  <li>Interferir no funcionamento do aplicativo</li>
                  <li>Fazer engenharia reversa ou copiar o código</li>
                  <li>Enviar spam ou conteúdo malicioso</li>
                  <li>Usar bots ou sistemas automatizados não autorizados</li>
                </ul>
              </div>
            </section>

            {/* 7. Propriedade Intelectual */}
            <section className="bg-white/5 rounded-xl p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-3">
                <Scale className="w-5 h-5 text-indigo-400" />
                <h3 className="text-base sm:text-lg font-semibold text-white">7. Propriedade Intelectual</h3>
              </div>
              <p className="text-sm sm:text-base text-gray-300">
                Todo o conteúdo do aplicativo, incluindo textos, gráficos, logos, ícones, imagens e software, é propriedade do
                .GetFood e GBC Coffee ou de seus licenciadores, protegido pelas leis de direitos autorais e propriedade intelectual.
              </p>
            </section>

            {/* 8. Limitação de Responsabilidade */}
            <section className="bg-white/5 rounded-xl p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-5 h-5 text-yellow-400" />
                <h3 className="text-base sm:text-lg font-semibold text-white">8. Limitação de Responsabilidade</h3>
              </div>
              <div className="space-y-2 text-sm sm:text-base text-gray-300">
                <p>O serviço é fornecido "como está". Não nos responsabilizamos por:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Interrupções, erros ou falhas no serviço</li>
                  <li>Perda de dados ou informações</li>
                  <li>Danos indiretos ou consequenciais</li>
                  <li>Ações de terceiros</li>
                </ul>
              </div>
            </section>

            {/* 9. Modificações */}
            <section className="bg-white/5 rounded-xl p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base sm:text-lg font-semibold text-white">9. Alterações nos Termos</h3>
              </div>
              <p className="text-sm sm:text-base text-gray-300">
                Reservamo-nos o direito de modificar estes termos a qualquer momento. Alterações significativas serão notificadas
                através do aplicativo. O uso continuado após alterações constitui aceitação dos novos termos.
              </p>
            </section>

            {/* 10. Encerramento */}
            <section className="bg-white/5 rounded-xl p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-3">
                <XCircle className="w-5 h-5 text-red-400" />
                <h3 className="text-base sm:text-lg font-semibold text-white">10. Encerramento de Conta</h3>
              </div>
              <p className="text-sm sm:text-base text-gray-300">
                Você pode encerrar sua conta a qualquer momento através das configurações. Podemos suspender ou encerrar sua conta
                imediatamente, sem aviso prévio, em caso de violação destes termos ou atividades suspeitas.
              </p>
            </section>

            {/* 11. Lei Aplicável */}
            <section className="bg-white/5 rounded-xl p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-3">
                <Scale className="w-5 h-5 text-slate-400" />
                <h3 className="text-base sm:text-lg font-semibold text-white">11. Lei Aplicável e Foro</h3>
              </div>
              <p className="text-sm sm:text-base text-gray-300">
                Estes termos são regidos pelas leis da República Federativa do Brasil. Qualquer disputa será resolvida no foro
                da Comarca de Maricá - RJ, com exclusão de qualquer outro, por mais privilegiado que seja.
              </p>
            </section>

            {/* Contato */}
            <section className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-xl p-4 sm:p-5 border border-emerald-500/20">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Dúvidas sobre os Termos?</h3>
              <p className="text-sm sm:text-base text-gray-300">
                Entre em contato conosco através da aba "Sobre" nas Informações do aplicativo ou visite-nos pessoalmente
                no GBC Coffee, Av. Roberto Silveira, 2082 - Flamengo, Maricá - RJ.
              </p>
            </section>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TermosUsoModal;
