"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function Login() {
  const router = useRouter();
  const [modoEscuro, setModoEscuro] = useState(false);

  useEffect(() => {
    const temaSalvo = localStorage.getItem('modoEscuro');
    if (temaSalvo === 'true') {
      setModoEscuro(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('modoEscuro', modoEscuro.toString());
  }, [modoEscuro]);

  const lidarComLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push('/');
  };

  const alternarModoEscuro = () => setModoEscuro(!modoEscuro);

  const fundoPrincipal = modoEscuro ? 'bg-gray-900' : 'bg-white';
  const fundoCartao = modoEscuro ? 'bg-gray-800' : 'bg-gray-700';
  const textoSecundario = modoEscuro ? 'text-gray-400' : 'text-gray-300';
  const corDestaque = 'text-blue-500';
  const borda = modoEscuro ? 'border-blue-500' : 'border-gray-400';
  const foco = modoEscuro ? 'focus:ring-blue-500' : 'focus:ring-gray-400';

  return (
    <div className={`min-h-screen ${fundoPrincipal} transition-colors duration-500 flex items-center justify-center px-4`}>
      <div className={`w-full ${fundoCartao} max-w-md rounded-2xl p-6 shadow-lg transition-colors duration-500`}>

        <div className="flex justify-between items-center mb-6">
          <div className="text-4xl font-bold text-center">
            <span className={corDestaque}>Get</span>
            <span className="text-white">Food</span>
          </div>
          <button
            onClick={alternarModoEscuro}
            className="text-white hover:text-blue-500 transition"
            aria-label="Alternar modo escuro"
          >
            {modoEscuro ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>

        <h2 className="text-2xl font-bold mt-4 text-white text-center mb-6">Entrar</h2>

        <form className="space-y-4" onSubmit={lidarComLogin}>

          <div>
            <label className={`block text-sm ${textoSecundario} mb-1`}>Email</label>
            <input
              type="email"
              placeholder="exemplo@gmail.com"
              className={`w-full p-3 rounded-lg 
                ${modoEscuro ? 'bg-gray-700 text-gray-200' : 'bg-white text-gray-700'} 
                ${borda} placeholder-gray-500 focus:outline-none ${foco}`}
            />
          </div>

          <div>
            <label className={`block text-sm ${textoSecundario} mb-1`}>Senha</label>
            <input
              type="password"
              placeholder="Digite sua senha"
              className={`w-full p-3 rounded-lg 
                ${modoEscuro ? 'bg-gray-700 text-gray-200' : 'bg-white text-gray-700'} 
                ${borda} placeholder-gray-500 focus:outline-none ${foco}`}
            />
          </div>

          <div className={`flex items-center justify-between text-sm ${textoSecundario}`}>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-blue-500" />
              Lembre-me
            </label>
            <Link href="/Login/EsqueceuSenha" className={`hover:underline ${textoSecundario}`}>
              Esqueceu a senha?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-800 hover:bg-opacity-80 transition text-white py-3 rounded-lg font-semibold"
          >
            Entrar
          </button>

          <div className={`flex items-center gap-2 my-4 ${textoSecundario}`}>
            <hr className={`flex-1 ${borda}`} />
            <span className="text-sm">Ou continue com</span>
            <hr className={`flex-1 ${borda}`} />
          </div>

          <button className="w-full bg-blue-800 text-white flex items-center justify-center gap-2 py-3 rounded-lg font-medium">
            <Image 
              src="/googleico.svg" 
              alt="Google" 
              width={20}
              height={20}
            />
            Login com Google
          </button>

          <p className={`text-center text-sm ${textoSecundario} mt-6`}>
            Crie sua conta aqui!{' '}
            <Link href="/Login/CriarConta" className="text-blue-500 hover:underline">
              Criar
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
