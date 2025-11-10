"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { validateEmail } from "@/utils/validators";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { useEsqueceuSenha } from "@/hooks/useEsqueceuSenha";

export default function EsqueceuSenha() {
  const router = useRouter();
  const { session } = useAuth();
  const {
    email,
    setEmail,
    error,
    success,
    isSubmitting,
    handleSubmit: submitForm,
  } = useEsqueceuSenha();

  const lidarComEsqueceuSenha = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!email || !validateEmail(email)) {
      return;
    }

    await submitForm(event);
  };

  useEffect(() => {
    if (session) {
      router.replace("/");
    }
  }, [session, router]);

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-gradient-to-tr from-[#1a1a1a] to-black">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-md bg-gradient-to-br from-[#1e1e1e] to-[#2b2b2b] rounded-3xl shadow-2xl p-8 border border-white/10 text-white"
      >
        <h1 className="text-3xl font-extrabold text-center mb-6 select-none">
          <span className="text-[#ff7043]">.</span>Get
          <span className="text-[#ff7043]">Food</span>
        </h1>

        <h2 className="text-xl font-semibold text-center mb-3 text-gray-200">
          Esqueceu a senha?
        </h2>
        <p className="text-sm text-gray-400 text-center mb-6">
          Não se preocupe, isso acontece!
          <br />
          Insira o e-mail associado à sua conta.
        </p>

        <form onSubmit={lidarComEsqueceuSenha} className="space-y-5">
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
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
              className="w-full px-4 py-3 rounded-lg bg-[#2a2a2a] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#ff7043] text-gray-200 placeholder-gray-500 disabled:opacity-50"
            />
          </div>

          {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
          {success && (
            <p className="text-green-500 text-sm font-medium">{success}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-[#ff7043] to-[#ff5722] hover:from-[#ff5722] hover:to-[#e64a19] text-white font-semibold py-3 rounded-full shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Enviando..." : "Enviar Código"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          <button
            onClick={() => router.push("/login")}
            className="text-[#ff7043] hover:underline"
          >
            Voltar para o login
          </button>
        </div>
      </motion.div>
    </div>
  );
}