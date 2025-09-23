"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { validateEmail } from "@/utils/validators";
import { useSession } from "next-auth/react";

/**
 * Componente de página de login do sistema.
 *
 * Permite ao usuário autenticar-se informando e-mail e senha.
 *
 * @returns {JSX.Element} Elemento da página de login
 */
export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { data: session } = useSession();

  /**
   * Realiza o processo de login do usuário.
   *
   * Valida os campos, chama o signIn do NextAuth e redireciona em caso de sucesso.
   *
   * @param e - Evento de submit do formulário
   */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !senha) {
      setError("Preencha todos os campos.");
      return;
    }

    if (!validateEmail(email)) {
      setError("E-mail inválido.");
      return;
    }

    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      email,
      senha,
    });

    if (res?.ok) {
      router.push("/");
    } else {
      setError("Credenciais inválidas!");
    }
  };

  useEffect(() => {
    if (session) {
      router.replace("/");
    }
  });
  
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-12">
      <h1 className="text-4xl font-semibold text-gray-800 mb-10 select-none">
        <span className="text-orange-600">.</span>Get
        <span className="text-orange-600">Food</span>
      </h1>

      <div className="w-full max-w-md bg-gray-200 rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
          Entrar
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="exemplo@gmail.com"
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-700"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              htmlFor="senha"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Senha
            </label>
            <input
              id="senha"
              type="password"
              placeholder="Digite sua senha"
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-700"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <div className="text-right">
            <Link
              href="/login/esqueceu-senha"
              className="text-sm text-orange-600 hover:underline"
            >
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

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            Não tem uma conta?{" "}
            <Link
              href="/cadastrar"
              className="text-orange-600 hover:underline"
            >
              Criar
            </Link>
          </p>
          <Link
            href="/"
            className="block text-orange-600 hover:underline"
          >
            voltar à página inicial
          </Link>
        </div>
      </div>  
    </div>
  );
}
