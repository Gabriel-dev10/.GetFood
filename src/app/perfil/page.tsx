'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserCircle, Award, Star, Coffee } from 'lucide-react';
import NavBottom from '@/components/NavBottom';

export default function PerfilPage() {
  const [foto, setFoto] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [modalAberto, setModalAberto] = useState(false);
  const [nome, setNome] = useState('Rafael');
  const [email, setEmail] = useState('rafael@exemplo.com');

  const cuponsUsados = 12;

  const getTituloFidelidade = (cupons: number) => {
    if (cupons >= 50) return { titulo: '🔥 Café Viciado', restante: 0, proximo: null, total: 50 };
    if (cupons >= 25) return { titulo: '🏆 Barista Honorário', restante: 50 - cupons, proximo: '🔥 Café Viciado', total: 50 };
    if (cupons >= 10) return { titulo: '🎯 Cliente de Ouro', restante: 25 - cupons, proximo: '🏆 Barista Honorário', total: 25 };
    if (cupons >= 5) return { titulo: '🥐 Degustador de Sabores', restante: 10 - cupons, proximo: '🎯 Cliente de Ouro', total: 10 };
    return { titulo: '☕ Cafézinho Casual', restante: 5 - cupons, proximo: '🥐 Degustador de Sabores', total: 5 };
  };

  const { titulo, restante, proximo, total } = getTituloFidelidade(cuponsUsados);

  const handleFotoClick = () => fileInputRef.current?.click();

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFoto(URL.createObjectURL(file));
    }
  };

  const handleSalvar = () => {
    setModalAberto(false);
  };

  const badges = [
    { icon: <Award className="w-6 h-6 text-yellow-700 dark:text-yellow-400" />, label: '50+ Cupons Usados' },
    { icon: <Star className="w-6 h-6 text-yellow-600 dark:text-yellow-300" />, label: 'Cliente Ouro' },
    { icon: <Coffee className="w-6 h-6 text-yellow-900 dark:text-yellow-200" />, label: 'Degustador' },
  ];

  return (
    <main className="min-h-screen px-4 pt-4 mt-3 pb-20 w-full max-w-screen-md mx-auto text-gray-900 dark:text-white">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-center flex-1">
          Perfil
        </h1>
      </div>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-gradient-to-tr from-yellow-100 to-yellow-300 dark:from-yellow-800 dark:to-yellow-600 p-8 mt-8 rounded-2xl shadow-lg w-full"
    >

        <div className="flex flex-col md:flex-row items-center gap-6">
          <div
            onClick={handleFotoClick}
            className="cursor-pointer w-28 h-28 rounded-full overflow-hidden border-4 border-green-500 shadow-lg hover:scale-105 transition"
          >
            {foto ? (
              <img src={foto} alt="Foto de perfil" className="object-cover w-full h-full" />
            ) : (
              <div className="flex items-center justify-center h-full bg-gray-100 dark:bg-gray-700">
                <UserCircle className="text-gray-400 dark:text-gray-500" size={90} />
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
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">{email}</p>

            <div className="bg-white/60 dark:bg-black/30 rounded-xl py-4 px-6 shadow-inner space-y-3">
              <div className="text-lg font-semibold text-yellow-900 dark:text-yellow-100">{titulo}</div>
              {proximo && (
                <>
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    Faltam <strong>{restante}</strong> cupons para virar <strong>{proximo}</strong>
                  </p>
                  <div className="w-full bg-white/70 dark:bg-black/40 h-3 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.floor(((total - restante) / total) * 100)}%` }}
                      transition={{ duration: 0.8 }}
                      className="h-full bg-green-500"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-bold text-yellow-900 dark:text-yellow-100 mb-5 text-center">Conquistas</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {badges.map(({ icon, label }, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-yellow-50 dark:bg-yellow-900/50 rounded-xl px-4 py-3 shadow-md hover:scale-105 transform transition cursor-default select-none"
                title={label}
              >
                {icon}
                <span className="font-semibold text-yellow-900 dark:text-yellow-100">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <button
            onClick={() => setModalAberto(true)}
            className="bg-green-600 text-white py-3 px-8 rounded-full hover:bg-green-700 transition text-lg font-semibold shadow-lg"
          >
            Editar Perfil
          </button>
        </div>
      </motion.section>

      <NavBottom />

      <AnimatePresence>
        {modalAberto && (
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
              className="w-full max-w-md bg-gradient-to-tr from-yellow-100 to-yellow-300 dark:from-yellow-800 dark:to-yellow-600 p-6 rounded-2xl shadow-lg"
            >
              <h2 className="text-xl font-bold mb-5 text-center text-gray-800 dark:text-white">
                Editar Perfil
              </h2>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  className="px-5 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700 transition font-semibold"
                >
                  Salvar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
