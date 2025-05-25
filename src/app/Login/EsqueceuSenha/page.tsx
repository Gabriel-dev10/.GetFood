"use client";

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function EsqueceuSenha() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);

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

  const LidaEsqueceuSenha = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push('/Login/RedefinirSenha');
  };

  const bgMain = darkMode ? 'bg-[#0F172A]' : 'bg-[#FFFFFF]';
  const cardBg = darkMode ? 'bg-[#1E1E2F]' : 'bg-[#334155]';
  const textSecondary = darkMode ? 'text-[#94A3B8]' : 'text-[#CBD5E1]';
  const accent = '#3B82F6';
  const border = darkMode ? 'border-[#3B82F6]' : 'border-[#64748B]';
  const focusRing = darkMode ? 'focus:ring-[#3B82F6]' : 'focus:ring-[#64748B]';

  return (
    <div className={`min-h-screen ${bgMain} transition-colors duration-500 flex items-center justify-center px-4`}>
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

        <h2 className="text-2xl mt-10 font-bold text-white text-center mb-2">Esqueceu a Senha</h2>
        <p className={`text-sm text-center mt-10 mb-6 ${textSecondary}`}>
          Não se preocupe! Isso acontece.<br />
          Insira o e-mail associado à sua conta.
        </p>

        <form className="space-y-4" onSubmit={LidaEsqueceuSenha}>
          <div>
            <label className={`block text-sm ${textSecondary} mb-1`}>Email</label>
            <input
              type="email"
              placeholder="Digite seu email"
              className={`w-full p-3 rounded-lg 
                ${darkMode ? 'bg-[#1E1E1E] text-[#E2E8F0]' : 'bg-white text-[#334155]'} 
                ${border} placeholder-gray-500 focus:outline-none ${focusRing}`}
            />
          </div>

          <button
            type="submit"
            className={`w-full bg-[${accent}] hover:bg-opacity-80 transition text-white py-3 rounded-lg font-semibold`}
          >
            Enviar Código
          </button>
        </form>
      </div>
    </div>
  );
}
