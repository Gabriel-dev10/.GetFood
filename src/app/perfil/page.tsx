"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserCircle, PencilIcon, LogOut, Loader2 } from "lucide-react";
import NavBottom from "@/components/NavBottom";
import { useSession, signOut } from "next-auth/react";
import PopupLogin from "../../components/PopupLogin";
import { validateEmail } from "@/utils/validators";
import Image from "next/image";

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
  const [timestamp, setTimestamp] = useState(Date.now());
  const [nomeEdit, setNomeEdit]= useState('');
  const [emailEdit, setEmailEdit]= useState(''); 
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const cuponsUsados = 35;
  
  // sempre que a session mudar, atualiza o estado
  useEffect(() => {
    if (session?.user) {
      setFoto(session.user.image || null);
      setNomeEdit(session.user.name || '');
      setEmailEdit(session.user.email || '');
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

   const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!nomeEdit || !emailEdit) {
      setError('Preencha todos os campos');
      setLoading(false);
      return error;
    }

    if (!validateEmail(emailEdit)) {
      setError('Digite um E-mail válido!');
      setLoading(false);
      return error;
    }

    setError('');

    try {
      const res = await fetch('/api/update', {
        method: 'PATCH',
        body: JSON.stringify({ nome: nomeEdit, email: emailEdit }),
        headers: { "Content-Type": "application/json" }
      });
      
      const data = await res.json();

      if (res.ok) {
        
        // Atualiza a sessão com os NOVOS dados
        await update({
          user: {
            name: nomeEdit,    // ← Dados NOVOS
            email: emailEdit,  // ← Dados NOVOS
            image: session?.user?.image // Mantém a imagem existente
          }
        });
        setModalAberto(false);
      } else {
        setError(data?.message || "Erro ao editar informações");
      }
    } catch (error) {
      setError("Erro de conexão");
      console.error('Erro ao atualizar:', error);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#292929]/84 to-black/65">
        <Loader2 className="animate-spin text-[#4E2010]" size={60} />
      </main>
    );
  }
  return (
    <main className="min-h-screen px-4 pt-4 mt-3 pb-20 w-full max-w-screen-md mx-auto text-white">
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
            className="cursor-pointer w-40 h-40 rounded-full relative overflow-hidden border-3 border-[#4E2010] shadow-lg hover:scale-110 transition"
          >
            {foto ? (
              <Image
                src={`/uploads/profile/${encodeURIComponent(foto.split('/').pop()!) }?t=${timestamp}`}
                alt="Foto de perfil"
                fill
                className="object-cover"
                 onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = "/default-profile.png";
                }}
              />

            ) : (
              <div className="flex items-center justify-center h-full bg-gray-700">
                  <UserCircle
                    className="text-gray-500"
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
            <h2 className="text-3xl font-extrabold mb-1">{session?.user?.name || "Visitante"}</h2>
            <p className="text-sm text-white mb-4">
              {session?.user?.email || "Faça login para continuar"}
            </p>

            {session && (
              <div className="bg-black/30 rounded-xl py-4 px-6 shadow-inner space-y-3">
                <div className="text-lg font-semibold text-white">
                  {titulo}
                </div>
                {proximo && (
                  <>
                    <p className="text-sm text-white">
                      Faltam <strong>{restante}</strong> cupons para virar{" "}
                      <strong>{proximo}</strong>
                    </p>
                    <div className="w-full bg-black/40 h-3 rounded-full overflow-hidden">
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
              onClick={() => {
                setModalAberto(true);
                setEmailEdit(session?.user?.email || '');
                setNomeEdit(session.user?.name || '');
              }}
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
              <form onSubmit={handleUpdate}>
              <h2 className="text-xl font-bold mb-5 text-center text-white">
                Editar Perfil
              </h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Nome"
                  defaultValue={nomeEdit}
                  className="w-full px-4 py-2 rounded-xl border border-gray-600 bg-gray-800 text-white"
                  onChange={(e)=>setNomeEdit(e.target.value)}
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  defaultValue={emailEdit}
                  onChange={(e)=>setEmailEdit(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-gray-600 bg-gray-800 text-white"
                  required
                />
              </div>
              <div className="mt-6 flex justify-between">
                <button
                  onClick={() => setModalAberto(false)}
                  className="px-5 py-2 rounded-xl bg-gray-700 text-white hover:bg-gray-600 transition font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 rounded-xl bg-[#4E2010] text-white hover:bg-[#3b180c] transition font-semibold disabled:opacity-50"
                >
                  {loading ? (
                    <Loader2 className="animate-spin inline w-4 h-4 mr-2" />
                  ) : null}
                  {loading ? 'Salvando...' : 'Salvar'}
                </button>
              </div>
              </form>
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