"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function Login() {
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

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push('/');
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

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

        <h2 className="text-2xl font-bold mt-4 text-white text-center mb-6">Entrar</h2>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className={`block text-sm ${textSecondary} mb-1`}>Email</label>
            <input
              type="email"
              placeholder="exemplo@gmail.com"
              className={`w-full p-3 rounded-lg 
                ${darkMode ? 'bg-[#1E1E1E] text-[#E2E8F0]' : 'bg-white text-[#334155]'} 
                ${border} placeholder-gray-500 focus:outline-none ${focusRing}`}
            />
          </div>

          <div>
            <label className={`block text-sm ${textSecondary} mb-1`}>Senha</label>
            <input
              type="password"
              placeholder="Digite sua senha"
              className={`w-full p-3 rounded-lg 
                ${darkMode ? 'bg-[#1E1E1E] text-[#E2E8F0]' : 'bg-white text-[#334155]'} 
                ${border} placeholder-gray-500 focus:outline-none ${focusRing}`}
            />
          </div>

          <div className={`flex items-center justify-between text-sm ${textSecondary}`}>
            <label className="flex items-center gap-2">
              <input type="checkbox" className={`accent-[${accent}]`} />
              Lembre-me
            </label>
            <Link href="/Login/EsqueceuSenha" className={`hover:underline ${textSecondary}`}>
              Esqueceu a senha?
            </Link>
          </div>

          <button
            type="submit"
            className={`w-full bg-[${accent}] hover:bg-opacity-80 transition text-white py-3 rounded-lg font-semibold`}
          >
            Entrar
          </button>

          <div className={`flex items-center gap-2 my-4 ${textSecondary}`}>
            <hr className={`flex-1 ${border}`} />
            <span className="text-sm">Ou continue com</span>
            <hr className={`flex-1 ${border}`} />
          </div>

          <button className="w-full bg-white text-[#334155] flex items-center justify-center gap-2 py-3 rounded-lg font-medium hover:bg-gray-100 transition">
            <Image 
              src="/googleico.svg" 
              alt="Google" 
              width={20}
              height={20}
            />
            Login com Google
          </button>

          <p className={`text-center text-sm ${textSecondary} mt-6`}>
            Crie sua conta aqui!{' '}
            <Link href="/Login/CriarConta" className={`text-[${accent}] hover:underline`}>
              Criar
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
