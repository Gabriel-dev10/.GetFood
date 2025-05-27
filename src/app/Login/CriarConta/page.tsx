'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CriarConta() {
  const router = useRouter();

  const lidarCriarConta = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    router.push('/Login');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-12">

      <h1 className="text-4xl font-semibold text-gray-800 mb-10 select-none">
        <span className="text-orange-600">.</span>Get<span className='text-orange-600'>Food</span>
      </h1>

      <div className="w-full max-w-md bg-gray-100 rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Criar Conta</h2>

        <form onSubmit={lidarCriarConta} className="space-y-5">
          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-gray-600 mb-1">
              Nome
            </label>
            <input
              id="nome"
              type="text"
              placeholder="Digite seu nome"
              className="w-full px-4 py-3 rounded-md border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-700"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="exemplo@gmail.com"
              className="w-full px-4 py-3 rounded-md border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-700"
            />
          </div>

          <div>
            <label htmlFor="senha" className="block text-sm font-medium text-gray-600 mb-1">
              Senha
            </label>
            <input
              id="senha"
              type="password"
              placeholder="Digite sua senha"
              className="w-full px-4 py-3 rounded-md border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-700"
            />
          </div>

          <div>
            <label htmlFor="confirmaSenha" className="block text-sm font-medium text-gray-600 mb-1">
              Confirme sua senha
            </label>
            <input
              id="confirmaSenha"
              type="password"
              placeholder="Confirme sua senha"
              className="w-full px-4 py-3 rounded-md border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-700"
            />
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <input type="checkbox" id="lembreme" className="accent-orange-600" />
            <label htmlFor="lembreme">Lembre-me</label>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 transition text-white py-3 rounded-md font-semibold"
          >
            Criar Conta
          </button>

          <p className="text-center text-sm text-gray-600 mt-6">
            Já tem uma conta?{' '}
            <Link href="/Login" className="text-orange-600 hover:underline">
              Entrar
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
