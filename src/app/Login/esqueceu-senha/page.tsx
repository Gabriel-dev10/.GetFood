'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { validateEmail } from '@/utils/validators';

export default function EsqueceuSenha() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const lidarComEsqueceuSenha = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email) {
      setError('Por favor, preencha o e-mail.');
      setSuccess('');
      return;
    }
    if (!validateEmail(email)) {
      setError('Digite um e-mail válido.');
      setSuccess('');
      return;
    }

    setError('');
    setSuccess('');

    const res = await fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (res.ok) {
      setSuccess('Código enviado para seu e-mail!');
      setTimeout(() => {
        router.push('/Login/RedefinirSenha');
      }, 1500);
    } else {
      setError(data?.message || 'Erro ao enviar código. Tente novamente.');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-12">

      <h1 className="text-4xl font-semibold text-gray-800 mb-10 select-none">
        <span className="text-orange-600">.</span>Get<span className='text-orange-600'>Food</span>
      </h1>

      <div className="w-full max-w-md bg-gray-100 rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2 text-center">Esqueceu a Senha</h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Não se preocupe! Isso acontece.<br />
          Insira o e-mail associado à sua conta.
        </p>

        <form onSubmit={lidarComEsqueceuSenha} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-700"
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}
          {success && <p className="text-green-600 text-sm">{success}</p>}

          <button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-md transition"
          >
            Enviar Código
          </button>
        </form>
      </div>
    </div>
  );
}
