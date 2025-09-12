'use client';

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";

export default function RedefinirSenha() {
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [codigo, setCodigo] = useState('');
  const [error, setError] = useState('');
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!novaSenha.trim() || !confirmarSenha.trim() || !codigo.trim()) {
      setError('Preencha todos os campos.');
      return;
    }

    if (novaSenha !== confirmarSenha) {
      setError('As senhas não coincidem.');
      return;
    }

    setError('');

    const res = await fetch('/api/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ novaSenha, codigo }),
    });

    const data = await res.json();

    if (res.ok) {
      setMostrarPopup(true);
    } else {
      setError(data?.message || 'Erro ao redefinir senha. Verifique o código.');
    }
  };

  const voltarParaLogin = () => {
    router.push('/login');
  };

  useEffect(() => {
      if (session) {
        router.replace("/");
      }
    });

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-12">

      <h1 className="text-4xl font-semibold text-gray-800 mb-10 select-none">
        <span className="text-orange-600">.</span>Get<span className='text-orange-600'>Food</span>
      </h1>

      <div className="w-full max-w-md bg-gray-100 rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2 text-center">Redefinir Senha</h2>
        <p className="text-sm text-gray-600 text-center mb-6">Digite sua nova senha e o código enviado para seu e-mail.</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Nova Senha</label>
            <input
              type="password"
              placeholder="Digite sua nova senha"
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-700"
              value={novaSenha}
              onChange={e => setNovaSenha(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Confirmar Nova Senha</label>
            <input
              type="password"
              placeholder="Repita sua nova senha"
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-700"
              value={confirmarSenha}
              onChange={e => setConfirmarSenha(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Código</label>
            <input
              type="text"
              placeholder="Insira o código"
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-700"
              value={codigo}
              onChange={e => setCodigo(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

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
