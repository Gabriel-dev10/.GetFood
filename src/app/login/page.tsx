"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { validateEmail } from "@/utils/validators";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();

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
    setIsLoading(true);

    try {
      const res = await signIn("credentials", {
        callbackUrl: "/",
        redirect: true,
        email,
        senha,
      });

      if (!res?.ok) {
        setError("Credenciais inválidas!");
      }
    } catch {
      setError("Erro ao conectar com o servidor. Tente novamente mais tarde.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      router.replace("/");
    }
  });

  if (status === "loading") {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#292929]/84 to-black/65">
        <Loader2 className="animate-spin text-[#ff7043]" size={60} />
      </main>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-gradient-to-tr from-[#1a1a1a] to-black">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-md bg-gradient-to-br from-[#1e1e1e] to-[#2b2b2b] rounded-3xl shadow-2xl p-8 border border-white/10 text-white"
      >
        <h1 className="text-3xl font-extrabold text-center mb-8 select-none">
          <span className="text-[#ff7043]">.</span>Get
          <span className="text-[#ff7043]">Food</span>
        </h1>

        <h2 className="text-xl font-semibold text-center mb-6 text-gray-200">
          Entrar na sua conta
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-400 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="exemplo@gmail.com"
              className="w-full px-4 py-3 rounded-lg bg-[#2a2a2a] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#ff7043] text-gray-200 placeholder-gray-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              htmlFor="senha"
              className="block text-sm font-medium text-gray-400 mb-1"
            >
              Senha
            </label>
            <input
              id="senha"
              type="password"
              placeholder="Digite sua senha"
              className="w-full px-4 py-3 rounded-lg bg-[#2a2a2a] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#ff7043] text-gray-200 placeholder-gray-500"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm font-medium">{error}</p>
          )}

          <div className="text-right">
            <Link
              href="/login/esqueceu-senha"
              className="text-sm text-[#ff7043] hover:underline"
            >
              Esqueceu a senha?
            </Link>
          </div>

          <button
            type="submit"
            className={`w-full bg-gradient-to-r from-[#ff7043] to-[#ff5722] hover:from-[#ff5722] hover:to-[#e64a19] text-white font-semibold py-3 rounded-full shadow-lg transition-all ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          <p>
            Não tem uma conta?{" "}
            <Link
              href="/cadastrar"
              className="text-[#ff7043] hover:underline"
            >
              Criar
            </Link>
          </p>
          <Link
            href="/"
            className="block mt-2 text-[#ff7043] hover:underline"
          >
            Voltar à página inicial
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
