'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Moon, Sun } from 'lucide-react';

export default function RedefinirSenha() {
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [modoEscuro, setModoEscuro] = useState(false);
  const router = useRouter();

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

  const lidarComSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMostrarPopup(true);
  };

  const voltarParaLogin = () => {
    router.push('/Login');
  };

  const fundoPrincipal = modoEscuro ? 'bg-gray-900' : 'bg-white';
  const fundoCartao = modoEscuro ? 'bg-gray-800' : 'bg-gray-700';
  const textoSecundario = modoEscuro ? 'text-gray-400' : 'text-gray-300';
  const corDestaque = 'text-blue-500';
  const borda = modoEscuro ? 'border-blue-500' : 'border-gray-400';
  const foco = modoEscuro ? 'focus:ring-blue-500' : 'focus:ring-gray-400';
  const inputBg = modoEscuro ? 'bg-gray-700 text-gray-200' : 'bg-white text-gray-700';

  return (
    <div className={`min-h-screen ${fundoPrincipal} transition-colors duration-500 flex items-center justify-center px-4 relative`}>
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

        <h2 className="text-2xl font-bold text-white mt-10 text-center mb-2">Redefinir Senha</h2>
        <p className={`text-sm mt-10 text-center mb-6 ${textoSecundario}`}>
          Por favor, digite algo que você vai lembrar.
        </p>

        <form className="space-y-4" onSubmit={lidarComSubmit}>
          <input
            type="password"
            placeholder="Digite sua nova senha"
            className={`w-full p-3 rounded-lg ${inputBg} ${borda} placeholder-gray-500 focus:outline-none ${foco}`}
          />
          <input
            type="password"
            placeholder="Repita sua nova senha"
            className={`w-full p-3 rounded-lg ${inputBg} ${borda} placeholder-gray-500 focus:outline-none ${foco}`}
          />
          <input
            type="text"
            placeholder="Insira seu código"
            className={`w-full p-3 rounded-lg ${inputBg} ${borda} placeholder-gray-500 focus:outline-none ${foco}`}
          />
          <button
            type="submit"
            className="w-full bg-blue-800 hover:bg-opacity-80 transition text-white py-3 rounded-lg font-semibold"
          >
            Redefinir Senha
          </button>
        </form>
      </div>

      {mostrarPopup && (
        <div className="fixed inset-0 bg-white/10 backdrop-blur-sm flex items-center justify-center z-50">
          <div className={`${fundoCartao} rounded-2xl p-6 shadow-xl text-center max-w-sm w-full`}>
            <h2 className="text-xl font-bold mb-4 text-white">Senha redefinida com sucesso!</h2>
            <button
              onClick={voltarParaLogin}
              className="bg-blue-800 hover:bg-opacity-80 transition text-white py-2 px-4 rounded-lg font-semibold"
            >
              Voltar para o login
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
