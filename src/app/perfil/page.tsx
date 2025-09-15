"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserCircle, PencilIcon, LogOut, Loader2 } from "lucide-react";
import NavBottom from "@/components/NavBottom";
import { useSession, signOut } from "next-auth/react";
import PopupLogin from "../../components/PopupLogin";

/**
 * Página de perfil do usuário.
 *
 * Permite visualizar e editar dados do perfil, foto, conquistas e fidelidade.
 *
 * @returns {JSX.Element} Elemento da página de perfil
 */
export default function PerfilPage() {
  const { data: session, status } = useSession();
  const [foto, setFoto] = useState<string | null>(null);  
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [timestamp, setTimestamp] = useState(Date.now());
  
  const { update } = useSession();
  const nome = session?.user?.name || "Visitante";
  const email = session?.user?.email || "Faça login para continuar";
  const cuponsUsados = 35;
  
  // sempre que a session mudar, atualiza o estado
  useEffect(() => {
    if (session?.user?.image) {
      setFoto(session.user.image);
    }
  }, [session]);

  /**
   * Retorna o título de fidelidade do usuário com base na quantidade de cupons usados.
   *
   * @param cupons - Quantidade de cupons usados
   * @returns {Object} Informações sobre o título, restante para próximo nível, etc.
   */
  const getTituloFidelidade = (cupons: number) => {
    if (cupons >= 50)
      return {
        titulo: "🔥 Café Viciado",
        restante: 0,
        proximo: null,
        total: 50,
      };
    if (cupons >= 25)
      return {
        titulo: "🏆 Mestre do Expresso",
        restante: 50 - cupons,
        proximo: "🔥 Café Viciado",
        total: 50,
      };
    if (cupons >= 10)
      return {
        titulo: "🎯 Cliente de Ouro",
        restante: 25 - cupons,
        proximo: "🏆 Mestre do Expresso",
        total: 25,
      };
    if (cupons >= 5)
      return {
        titulo: "🥐 Degustador de Sabores",
        restante: 10 - cupons,
        proximo: "🎯 Cliente de Ouro",
        total: 10,
      };
    return {
      titulo: "☕ Cafézinho Casual",
      restante: 5 - cupons,
      proximo: "🥐 Degustador de Sabores",
      total: 5,
    };
  };

  const { titulo, restante, proximo, total } = getTituloFidelidade(cuponsUsados);

  /**
   * Abre o seletor de arquivo para alterar a foto de perfil.
   */
  const handleFotoClick = () => fileInputRef.current?.click();

  /**
   * Atualiza a foto de perfil ao selecionar um novo arquivo.
   *
   * @param e - Evento de alteração do input de arquivo
   */
  const handleFotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)

    try {
      const res= await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) throw new Error ('Falha no upload')
      const data = await res.json();

      await update();
      setTimestamp(Date.now()); // ← Força recarregamento
      setFoto(data.url);

    } catch(error){
        console.error('Erro ao enviar imagem: ', error)
    }
  };

  /**
   * Salva as alterações do perfil e fecha o modal.
   */
  const handleSalvar = () => setModalAberto(false);

  if (status === "loading") {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#292929]/84 to-black/65">
        <Loader2 className="animate-spin text-[#4E2010]" size={60} />
      </main>
    );
  }
  return (
    <main className="min-h-screen px-4 pt-4 mt-3 pb-20 w-full max-w-screen-md mx-auto text-gray-900 dark:text-white">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl text-[#4E2010] font-bold text-center flex-1">
          Perfil
        </h1>
      </div>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-gradient-to-tr from-[#292929]/84 to-black/65 p-8 mt-8 rounded-2xl shadow-lg w-full"
      >
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div
            onClick={session ? handleFotoClick : undefined}
            className="cursor-pointer w-40 h-40 rounded-full overflow-hidden border-3 border-[#4E2010] shadow-lg hover:scale-110 transition"
          >
            {foto ? (
              <img
                src={`${foto}?t=${timestamp}`}
                alt="Foto de perfil"
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="flex items-center justify-center h-full bg-gray-100 dark:bg-gray-700">
                <UserCircle
                  className="text-gray-400 dark:text-gray-500"
                  size={90}
                />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFotoChange}
            />
          </div>

          <div className="text-center md:text-left">
            <h2 className="text-3xl font-extrabold mb-1">{nome}</h2>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
              {email}
            </p>

            {session && (
              <div className="bg-white/60 dark:bg-black/30 rounded-xl py-4 px-6 shadow-inner space-y-3">
                <div className="text-lg font-semibold text-white dark:text-white">
                  {titulo}
                </div>
                {proximo && (
                  <>
                    <p className="text-sm text-white dark:text-white">
                      Faltam <strong>{restante}</strong> cupons para virar{" "}
                      <strong>{proximo}</strong>
                    </p>
                    <div className="w-full bg-white/70 dark:bg-black/40 h-3 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${Math.floor(
                            ((total - restante) / total) * 100
                          )}%`,
                        }}
                        transition={{ duration: 0.8 }}
                        className="h-full bg-green-500"
                      />
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {session && (
          <div className="mt-10 flex flex-col items-center gap-4">
            <button
              onClick={() => setModalAberto(true)}
              className="bg-[#4E2010] text-white py-3 px-8 rounded-full hover:bg-[#3b180c] transition text-lg font-semibold shadow-lg flex items-center"
            >
              <PencilIcon className="inline w-6 h-6 mr-2" />
              Editar Perfil
            </button>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="bg-red-600 text-white py-3 px-8 rounded-full hover:bg-red-700 transition text-lg font-semibold shadow-lg flex items-center"
            >
              <LogOut className="inline w-6 h-6 mr-2" />
              Sair
            </button>
          </div>
        )}
      </motion.section>

      <NavBottom />

      <AnimatePresence>
        {modalAberto && session && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-md bg-gradient-to-tr from-[#292929]/85 to-black/65 p-6 rounded-2xl shadow-lg"
            >
              <h2 className="text-xl font-bold mb-5 text-center text-gray-800 dark:text-white">
                Editar Perfil
              </h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Nome"
                  defaultValue={nome}
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
                <input
                  type="email"
                  placeholder="Email"
                  defaultValue={email}
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
              <div className="mt-6 flex justify-between">
                <button
                  onClick={() => setModalAberto(false)}
                  className="px-5 py-2 rounded-xl bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-600 transition font-semibold"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSalvar}
                  className="px-5 py-2 rounded-xl bg-[#4E2010] text-white hover:bg-[#3b180c] transition font-semibold"
                >
                  Salvar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {!session && (
              <div>
                <PopupLogin />
              </div>
            )}
          </main>
        );
}