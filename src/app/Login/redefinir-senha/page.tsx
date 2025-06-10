'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RedefinirSenha() {
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const router = useRouter();

  const lidarComSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMostrarPopup(true);
  };

  const voltarParaLogin = () => {
    router.push('/Login');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-12">

      <h1 className="text-4xl font-semibold text-gray-800 mb-10 select-none">
        <span className="text-orange-600">.</span>Get<span className='text-orange-600'>Food</span>
      </h1>

      <div className="w-full max-w-md bg-gray-100 rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2 text-center">Redefinir Senha</h2>
        <p className="text-sm text-gray-600 text-center mb-6">Digite sua nova senha e o código enviado para seu e-mail.</p>

        <form onSubmit={lidarComSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Nova Senha</label>
            <input
              type="password"
              placeholder="Digite sua nova senha"
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Confirmar Nova Senha</label>
            <input
              type="password"
              placeholder="Repita sua nova senha"
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Código</label>
            <input
              type="text"
              placeholder="Insira o código"
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-700"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-md transition"
          >
            Redefinir Senha
          </button>
        </form>
      </div>

      {mostrarPopup && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Senha redefinida com sucesso!</h2>
            <button
              onClick={voltarParaLogin}
              className="bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-md transition font-medium"
            >
              Voltar para o login
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
