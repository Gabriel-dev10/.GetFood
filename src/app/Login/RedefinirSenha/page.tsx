'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Moon, Sun } from 'lucide-react';

export default function RedefinirSenha() {
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'true') {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMostrarPopup(true);
  };

  const voltarParaLogin = () => {
    router.push('/Login');
  };

  const bgMain = darkMode ? 'bg-[#0F172A]' : 'bg-[#FFFFFF]';
  const cardBg = darkMode ? 'bg-[#1E1E2F]' : 'bg-[#334155]';
  const textSecondary = darkMode ? 'text-[#94A3B8]' : 'text-[#CBD5E1]';
  const accent = '#3B82F6';
  const border = darkMode ? 'border-[#3B82F6]' : 'border-[#64748B]';
  const focusRing = darkMode ? 'focus:ring-[#3B82F6]' : 'focus:ring-[#64748B]';

  const inputBg = darkMode ? 'bg-[#1E1E1E] text-[#E2E8F0]' : 'bg-white text-[#334155]';

  return (
    <div className={`min-h-screen ${bgMain} transition-colors duration-500 flex items-center justify-center px-4 relative`}>
      <div className={`w-full ${cardBg} max-w-md rounded-2xl p-6 shadow-lg transition-colors duration-500`}>
        
        <div className="flex justify-between items-center mb-6">
          <div className="text-4xl font-bold text-center">
            <span className={`text-[${accent}]`}>Get</span>
            <span className="text-white">Food</span>
          </div>
          <button
            onClick={toggleDarkMode}
            className="text-white hover:text-[${accent}] transition"
            aria-label="Alternar modo escuro"
          >
            {darkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>

        <h2 className="text-2xl font-bold text-white mt-10 text-center mb-2">Redefinir Senha</h2>
        <p className={`text-sm mt-10 text-center mb-6 ${textSecondary}`}>
          Por favor, digite algo que você vai lembrar.
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Digite sua nova senha"
            className={`w-full p-3 rounded-lg ${inputBg} ${border} placeholder-gray-500 focus:outline-none ${focusRing}`}
          />
          <input
            type="password"
            placeholder="Repita sua nova senha"
            className={`w-full p-3 rounded-lg ${inputBg} ${border} placeholder-gray-500 focus:outline-none ${focusRing}`}
          />
          <input
            type="text"
            placeholder="Insira seu código"
            className={`w-full p-3 rounded-lg ${inputBg} ${border} placeholder-gray-500 focus:outline-none ${focusRing}`}
          />
          <button
            type="submit"
            className={`w-full bg-[${accent}] hover:bg-opacity-80 transition text-white py-3 rounded-lg font-semibold`}
          >
            Redefinir Senha
          </button>
        </form>
      </div>

      {mostrarPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className={`${cardBg} rounded-2xl p-6 shadow-xl text-center max-w-sm w-full`}>
            <h2 className="text-xl font-bold mb-4 text-white">Senha redefinida com sucesso!</h2>
            <button
              onClick={voltarParaLogin}
              className={`bg-[${accent}] hover:bg-opacity-80 transition text-white py-2 px-4 rounded-lg font-semibold`}
            >
              Voltar para o login
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
