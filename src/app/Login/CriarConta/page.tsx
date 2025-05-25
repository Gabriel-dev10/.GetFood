'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Moon, Sun } from 'lucide-react';

export default function CriarConta() {
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'true') setDarkMode(true);
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const LidaCriarConta = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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

        <h2 className="text-2xl font-bold text-white text-center mb-6">Criar Conta</h2>

        <form className="space-y-4" onSubmit={LidaCriarConta}>
          <div>
            <label className={`block text-sm ${textSecondary} mb-1`}>Nome</label>
            <input
              type="text"
              placeholder="Digite seu nome"
              className={`w-full p-3 rounded-lg ${inputBg} ${border} placeholder-gray-500 focus:outline-none ${focusRing}`}
            />
          </div>

          <div>
            <label className={`block text-sm ${textSecondary} mb-1`}>Email</label>
            <input
              type="email"
              placeholder="exemplo@gmail.com"
              className={`w-full p-3 rounded-lg ${inputBg} ${border} placeholder-gray-500 focus:outline-none ${focusRing}`}
            />
          </div>

          <div>
            <label className={`block text-sm ${textSecondary} mb-1`}>Senha</label>
            <input
              type="password"
              placeholder="Digite sua senha"
              className={`w-full p-3 rounded-lg ${inputBg} ${border} placeholder-gray-500 focus:outline-none ${focusRing}`}
            />
          </div>

          <div>
            <label className={`block text-sm ${textSecondary} mb-1`}>Confirme sua senha</label>
            <input
              type="password"
              placeholder="Confirme sua senha"
              className={`w-full p-3 rounded-lg ${inputBg} ${border} placeholder-gray-500 focus:outline-none ${focusRing}`}
            />
          </div>

          <div className="flex items-center justify-between text-sm text-gray-400">
            <label className="flex items-center gap-2">
              <input type="checkbox" className={`accent-[${accent}]`} />
              Lembre-me
            </label>
          </div>

          <button
            type="submit"
            className={`w-full bg-[${accent}] hover:bg-opacity-80 transition text-white py-3 rounded-lg font-semibold`}
          >
            Criar Conta
          </button>

          <div className="flex items-center gap-2 my-4 text-gray-500">
            <hr className="flex-1 border-gray-700" />
            <span className="text-sm">Ou continue com</span>
            <hr className="flex-1 border-gray-700" />
          </div>

          <button className="w-full bg-white text-black flex items-center justify-center gap-2 py-3 rounded-lg font-medium hover:bg-gray-200 transition">
            <Image 
              src="/googleico.svg" 
              alt="Google" 
              width={20}
              height={20}
            />
            Login com Google
          </button>

          <p className="text-center text-sm text-gray-400 mt-6">
            Já tem uma conta?{' '}
            <Link href="/Login" className={`text-[${accent}] hover:underline`}>
              Entrar
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
