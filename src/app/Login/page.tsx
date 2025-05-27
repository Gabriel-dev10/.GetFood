'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();

  const lidarComLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-12">

      <h1 className="text-4xl font-semibold text-gray-800 mb-10 select-none">
        <span className="text-orange-600">.</span>Get<span className='text-orange-600'>Food</span>
      </h1>

      <div className="w-full max-w-md bg-gray-100 rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Entrar</h2>

        <form onSubmit={lidarComLogin} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="exemplo@gmail.com"
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-700"
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
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-700"
            />
          </div>

          
          <div className="text-right">
            <Link href="/Login/EsqueceuSenha" className="text-sm text-orange-600 hover:underline">
              Esqueceu a senha?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-md transition"
          >
            Entrar
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Não tem uma conta?{' '}
          <Link href="/Login/CriarConta" className="text-orange-600 hover:underline">
            Criar
          </Link>
        </p>
      </div>
    </div>
  );
}
