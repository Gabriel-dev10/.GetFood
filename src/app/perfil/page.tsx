"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PencilIcon, LogOut, Loader2, Mail } from "lucide-react";
import NavBottom from "@/components/NavBottom";
import { useSession, signOut } from "next-auth/react";
import PopupLogin from "../../components/PopupLogin";
import EncerrarContaModal from "@/components/EncerrarContaModal";
import { validateEmail } from "@/utils/validators";
import ConquistasList, { Conquista } from "@/components/ConquistasList";
import Footer from "@/components/Footer";
import ProfileAvatar from "@/components/ProfileAvatar";
import { calcularNivel } from "@/utils/nivelSystem";

/**
 * Página de perfil do usuário.
 *
 * Permite visualizar e editar dados do perfil, foto, conquistas e fidelidade.
 *
 * @returns {JSX.Element} Elemento da página de perfil
 */
export default function PerfilPage() {
  const { data: session, status, update } = useSession();
  const [foto, setFoto] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [modalEncerrarAberto, setModalEncerrarAberto] = useState(false);
  const [timestamp, setTimestamp] = useState(Date.now());
  const [nomeEdit, setNomeEdit] = useState("");
  const [emailEdit, setEmailEdit] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [conquistas, setConquistas] = useState<Conquista[]>([]);
  const [loadingConquistas, setLoadingConquistas] = useState(true);
  const [pontos, setPontos] = useState(0);

  // Calcula o nível baseado nas conquistas desbloqueadas
  const conquistasDesbloqueadas = conquistas.filter(c => c.desbloqueada).length;
  const nivelInfo = calcularNivel(conquistasDesbloqueadas);

  // sempre que a session mudar, atualiza o estado
  useEffect(() => {
    if (session?.user) {
      setFoto(session.user.image || null);
      setNomeEdit(session.user.name || "");
      setEmailEdit(session.user.email || "");
    }
  }, [session]);

  // Buscar pontos do usuário
  useEffect(() => {
    const fetchPontos = async () => {
      if (!session?.user) {
        return;
      }

      try {
        const response = await fetch('/api/usuarios/pontos');
        if (response.ok) {
          const data = await response.json();
          setPontos(data.pontos_total || 0);
        }
      } catch (error) {
        console.error("Erro ao buscar pontos:", error);
      }
    };

    fetchPontos();
  }, [session]);

  // Buscar conquistas do usuário
  useEffect(() => {
    const fetchConquistas = async () => {
      if (!session?.user) {
        setLoadingConquistas(false);
        return;
      }

      try {
        // Primeiro, tenta desbloquear conquistas baseado nos pontos atuais
        await fetch('/api/conquistas/desbloquear', {
          method: 'POST',
        });

        // Depois busca as conquistas atualizadas
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

  /**
   * Retorna apenas o primeiro e segundo nome do usuário, com limite de caracteres
   */
  const getShortName = (fullName?: string | null) => {
    if (!fullName) return "Visitante";
    const names = fullName.trim().split(" ");
    
    if (names.length === 1) {
      // Se for apenas um nome e for muito longo, abrevia
      if (names[0].length > 20) {
        return names[0].substring(0, 17) + "...";
      }
      return names[0];
    }
    
    const firstName = names[0];
    const secondName = names[1];
    const combined = `${firstName} ${secondName}`;
    
    // Se o nome combinado for muito longo, abrevia
    if (combined.length > 25) {
      if (firstName.length > 15) {
        return firstName.substring(0, 12) + "...";
      }
      return `${firstName} ${secondName.substring(0, 8)}...`;
    }
    
    return combined;
  };

  /**
   * Abrevia email se for muito longo
   */
  const getShortEmail = (email?: string | null) => {
    if (!email) return "";
    if (email.length <= 30) return email;
    const [localPart, domain] = email.split("@");
    if (localPart.length > 15) {
      return `${localPart.substring(0, 12)}...@${domain}`;
    }
    return email;
  };

  /**
   * Abre o seletor de arquivo para alterar a foto de perfil.
   */
  const handleFotoClick = () => fileInputRef.current?.click();

  /**
   * Atualiza a foto de perfil ao selecionar um novo arquivo.
   *
   * @param e - Evento de alteração do input de arquivo
   */

  // DAQUI PRA BAIXO FOI EDITADO - PARA AJUSTAR O UPLOAD DA IMAGEM

  const handleFotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      console.error("Por favor, selecione um arquivo de imagem válido");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      console.error("O arquivo deve ter menos de 5MB");
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    const previousFoto = foto;
    setFoto(previewUrl);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Falha no upload");
      }

      const data = await res.json();

      URL.revokeObjectURL(previewUrl);

      setFoto(data.url);
      setTimestamp(Date.now());

      await update({
        user: {
          name: session?.user?.name,
          email: session?.user?.email,
          image: data.url,
        },
      });
    } catch (error) {
      console.error("Erro ao enviar imagem: ", error);
      URL.revokeObjectURL(previewUrl);
      setFoto(previousFoto);
    }
  };

  // FIM DA EDIÇÃO

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!nomeEdit || !emailEdit) {
      setError("Preencha todos os campos");
      setLoading(false);
      return error;
    }

    if (!validateEmail(emailEdit)) {
      setError("Digite um E-mail válido!");
      setLoading(false);
      return error;
    }

    setError("");

    try {
      const res = await fetch("/api/update", {
        method: "PATCH",
        body: JSON.stringify({ nome: nomeEdit, email: emailEdit }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (res.ok) {
        // Atualiza a sessão com os NOVOS dados
        await update({
          user: {
            name: nomeEdit, // ← Dados NOVOS
            email: emailEdit, // ← Dados NOVOS
            image: session?.user?.image, // Mantém a imagem existente
          },
        });
        setModalAberto(false);
      } else {
        setError(data?.message || "Erro ao editar informações");
      }
    } catch (error) {
      setError("Erro de conexão");
      console.error("Erro ao atualizar:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEncerrarConta = async (password: string) => {
    try {
      const res = await fetch("/api/auth/deleta-conta", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        // Desloga e redireciona para a página inicial
        await signOut({ callbackUrl: "/" });
      } else {
        const data = await res.json();
        throw new Error(data?.message || "Erro ao encerrar conta");
      }
    } catch (error) {
      console.error("Erro ao encerrar conta:", error);
      throw error;
    }
  };

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
          Meu Perfil
        </h1>
      </div>

      {/* Card principal do perfil */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-black/50 p-6 md:p-8 rounded-2xl shadow-lg mb-6"
      >
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Foto de perfil com borda de nível */}
          <div onClick={session ? handleFotoClick : undefined}>
            <ProfileAvatar
              foto={foto}
              nivel={nivelInfo.nivel}
              size="large"
              timestamp={timestamp}
              imagemBorda={nivelInfo.imagemBorda}
              usarBordaCustomizada={true}
              showLevelBadge={false}
            />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFotoChange}
            />
          </div>

          {/* Informações do usuário */}
          <div className="flex-1 text-center md:text-left w-full">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2 break-words" title={session?.user?.name || ""}>
              {getShortName(session?.user?.name)}
            </h2>
            
            {session && (
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-center md:justify-start gap-2 text-white">
                  <Mail size={18} className="text-white flex-shrink-0" />
                  <p className="text-sm truncate" title={session.user.email || ""}>
                    {getShortEmail(session.user.email)}
                  </p>
                </div>
              </div>
            )}

            {/* Card de nível baseado em conquistas */}
            {session && (
              <div className="bg-black/50 rounded-xl p-5 shadow-inner space-y-3 border border-[#C9A882]/20">
                <div className="flex items-center gap-2 mb-2">
                  <nivelInfo.icon size={22} style={{ color: nivelInfo.iconColor }} />
                  <div className="text-lg font-bold text-[#C9A882]">
                    {nivelInfo.titulo}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-white">
                  <span>
                    {conquistasDesbloqueadas} conquista{conquistasDesbloqueadas !== 1 ? 's' : ''} desbloqueada{conquistasDesbloqueadas !== 1 ? 's' : ''}
                  </span>
                </div>

                {nivelInfo.conquistasProximoNivel !== null && (
                  <>
                    <p className="text-sm text-white">
                      Faltam <span className="font-semibold">
                        {nivelInfo.conquistasProximoNivel - conquistasDesbloqueadas}
                      </span> conquista{(nivelInfo.conquistasProximoNivel - conquistasDesbloqueadas) !== 1 ? 's' : ''} para o próximo nível
                    </p>
                    <div className="w-full bg-black/50 h-2.5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${nivelInfo.progresso}%`,
                        }}
                        transition={{ duration: 0.8 }}
                        className={`h-full bg-gradient-to-r ${nivelInfo.gradiente}`}
                      />
                    </div>
                    <p className="text-xs text-white text-right">
                      {nivelInfo.progresso}% completo
                    </p>
                  </>
                )}

                {nivelInfo.nivel === 5 && (
                  <p className="text-sm text-[#FF4500] font-semibold text-center">
                    🎉 Nível Máximo Alcançado! 🎉
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Botões de ação */}
        {session && (
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                setModalAberto(true);
                setEmailEdit(session?.user?.email || "");
                setNomeEdit(session.user?.name || "");
              }}
              className="w-full sm:w-auto bg-[#4E2010] text-white py-3 px-6 rounded-xl hover:bg-[#3b180c] transition text-base font-semibold shadow-lg flex items-center justify-center gap-2"
            >
              <PencilIcon size={20} />
              Editar Perfil
            </button>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="w-full sm:w-auto bg-red-600 text-white py-3 px-6 rounded-xl hover:bg-red-700 transition text-base font-semibold shadow-lg flex items-center justify-center gap-2"
            >
              <LogOut size={20} />
              Sair
            </button>
          </div>
        )}

        {session && (
          <div className="mt-4 text-center">
            <button
              onClick={() => setModalEncerrarAberto(true)}
              className="text-white/80 text-xs underline hover:text-red-500 transition"
            >
              Encerrar conta
            </button>
          </div>
        )}
      </motion.section>

      {/* Seção de conquistas */}
      {session && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="mb-10"
        >
          <ConquistasList
            conquistas={conquistas}
            loading={loadingConquistas}
            pontosUsuario={pontos}
          />
        </motion.section>
      )}

      <Footer />
      <NavBottom />

      <AnimatePresence>
        {modalAberto && session && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setModalAberto(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-md bg-[#2a1810] p-6 rounded-2xl shadow-2xl border border-[#C9A882]/20"
              onClick={(e) => e.stopPropagation()}
            >
              <form onSubmit={handleUpdate}>
                <h2 className="text-xl font-bold mb-5 text-center text-[#C9A882]">
                  Editar Perfil
                </h2>
                
                {error && (
                  <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm">
                    {error}
                  </div>
                )}
                
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-white/70 mb-1 block">Nome</label>
                    <input
                      type="text"
                      placeholder="Seu nome"
                      defaultValue={nomeEdit}
                      className="w-full px-4 py-3 rounded-xl border border-[#C9A882]/30 bg-black/40 text-white placeholder:text-white/30 focus:border-[#C9A882] focus:outline-none transition"
                      onChange={(e) => setNomeEdit(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs text-white/70 mb-1 block">E-mail</label>
                    <input
                      type="email"
                      placeholder="seu@email.com"
                      defaultValue={emailEdit}
                      onChange={(e) => setEmailEdit(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-[#C9A882]/30 bg-black/40 text-white placeholder:text-white/30 focus:border-[#C9A882] focus:outline-none transition"
                      required
                    />
                  </div>
                </div>
                <div className="mt-6 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setModalAberto(false)}
                    className="flex-1 px-5 py-3 rounded-xl bg-black/40 text-white hover:bg-black/60 transition font-semibold border border-white/10"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-5 py-3 rounded-xl bg-[#4E2010] text-white hover:bg-[#3b180c] transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin inline w-4 h-4 mr-2" />
                        Salvando...
                      </>
                    ) : (
                      "Salvar"
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <EncerrarContaModal
        isOpen={modalEncerrarAberto}
        onClose={() => setModalEncerrarAberto(false)}
        onConfirm={handleEncerrarConta}
        userName={session?.user?.name || undefined}
      />

      {!session && (
        <div>
          <PopupLogin />
        </div>
      )}
    </main>
  );
}
