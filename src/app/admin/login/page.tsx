"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Eye, EyeOff} from "lucide-react";
import { motion } from "framer-motion";
import { validateEmail } from "@/utils/validators";

/**
 * Página de Login do Admin
 */
export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    setLoading(true);

    if (!email || !senha) {
      setErro("Preencha todos os campos.");
      setLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setErro("E-mail inválido.");
      setLoading(false);
      return;
    }

    setTimeout(() => {
      if (email === "admin@getfood.com" && senha === "admin123") {
        localStorage.setItem("isAdmin", "true");
        router.push("/admin");
      } else {
        setErro(
          "Credenciais inválidas ou você não tem permissão de administrador"
        );
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-gradient-to-tr from-[#1a1a1a] to-black">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-md bg-gradient-to-br from-[#1e1e1e] to-[#2b2b2b] rounded-3xl shadow-2xl p-8 border border-white/10 text-white"
      >
        <h1 className="text-3xl font-extrabold text-center mb-2 select-none">
          <span className="text-[#ff7043]">.</span>Get
          <span className="text-[#ff7043]">Food</span>
        </h1>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-400 mb-1"
            >
              Email do Administrador
            </label>
            <input
              id="email"
              type="email"
              placeholder="admin@getfood.com"
              className="w-full px-4 py-3 rounded-lg bg-[#2a2a2a] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#ff7043] text-gray-200 placeholder-gray-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <div className="relative">
            <label
              htmlFor="senha"
              className="block text-sm font-medium text-gray-400 mb-1"
            >
              Senha
            </label>
            <input
              id="senha"
              type={mostrarSenha ? "text" : "password"}
              placeholder="Digite sua senha"
              className="w-full px-4 py-3 pr-10 rounded-lg bg-[#2a2a2a] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#ff7043] text-gray-200 placeholder-gray-500"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              disabled={loading}
              required
            />
            <button
              type="button"
              onClick={() => setMostrarSenha(!mostrarSenha)}
              className="absolute right-3 top-9 text-gray-400 hover:text-gray-200"
            >
              {mostrarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {erro && (
            <p className="text-red-500 text-sm font-medium text-center">
              {erro}
            </p>
          )}

          <button
            type="submit"
            className={`w-full bg-gradient-to-r from-[#ff7043] to-[#ff5722] hover:from-[#ff5722] hover:to-[#e64a19] text-white font-semibold py-3 rounded-full shadow-lg transition-all ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Autenticando..." : "Entrar no Painel"}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-white/10">
          <div className="flex items-start gap-3 text-xs text-gray-400">
            <Lock className="text-[#ff7043] flex-shrink-0 mt-0.5" size={16} />
            <p>
              Área restrita para administradores. Todas as ações são registradas
              e monitoradas.
            </p>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-400">
          <button
            onClick={() => router.push("/")}
            className="text-[#ff7043] hover:underline"
          >
            Voltar à página inicial
          </button>
        </div>

        <div className="mt-6 bg-yellow-900/30 border border-yellow-700/50 rounded-lg p-4 text-yellow-200 text-xs">
          <p className="font-semibold mb-1">Credenciais de Teste:</p>
          <p>
            Email:{" "}
            <code className="px-2 py-1 rounded">
              admin@getfood.com
            </code>
          </p>
          <p>
            Senha:{" "}
            <code className="px-2 py-1 rounded">admin123</code>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
