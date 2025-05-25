"use client";

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function EsqueceuSenha() {
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

  const alternarModoEscuro = () => setModoEscuro(!modoEscuro);

  const lidarComEsqueceuSenha = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push('/Login/RedefinirSenha');
  };

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

        <h2 className="text-2xl mt-10 font-bold text-white text-center mb-2">Esqueceu a Senha</h2>
        <p className={`text-sm text-center mt-10 mb-6 ${textoSecundario}`}>
          Não se preocupe! Isso acontece.<br />
          Insira o e-mail associado à sua conta.
        </p>

        <form className="space-y-4" onSubmit={lidarComEsqueceuSenha}>
          <div>
            <label className={`block text-sm ${textoSecundario} mb-1`}>Email</label>
            <input
              type="email"
              placeholder="Digite seu email"
              className={`w-full p-3 rounded-lg 
                ${modoEscuro ? 'bg-gray-700 text-gray-200' : 'bg-white text-gray-700'} 
                ${borda} placeholder-gray-500 focus:outline-none ${foco}`}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-800 hover:bg-opacity-80 transition text-white py-3 rounded-lg font-semibold"
          >
            Enviar Código
          </button>
        </form>
      </div>
    </div>
  );
}
