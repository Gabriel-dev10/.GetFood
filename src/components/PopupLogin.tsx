"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function PopupLogin() {
  useEffect(() => {
    // Quando o popup abre → trava o scroll
    document.body.style.overflow = "hidden";
    return () => {
      // Quando o popup fecha → restaura o scroll
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/60">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="bg-gradient-to-br from-[#1e1e1e] to-[#2b2b2b] text-white p-8 rounded-3xl shadow-2xl w-96 max-w-[90%] text-center border border-white/10"
      >
        <h1 className="text-3xl font-extrabold mb-6 tracking-tight">
          Bem-vindo(a) ao <span className="text-[#ff7043]">.GetFood!</span>
        </h1>

        <p className="text-base text-gray-300 mb-3">
          Parece que você ainda não fez login...
        </p>
        <p className="text-sm text-gray-400 mb-8 italic">
          Acesse ou crie sua conta para aproveitar todos os benefícios do{" "}
          <span className="font-semibold">.GetFood</span>!
        </p>

        <div className="space-y-4">
          <Link
            href="/login"
            className="block w-full bg-gradient-to-r from-[#ff7043] to-[#ff5722] hover:from-[#ff5722] hover:to-[#e64a19] text-white py-3 rounded-full font-semibold shadow-lg transition-all"
          >
            Fazer Login
          </Link>

          <Link
            href="/cadastrar"
            className="block w-full bg-[#3a3a3a] hover:bg-[#4d4d4d] text-white py-3 rounded-full font-semibold shadow-lg transition-all"
          >
            Cadastrar-se
          </Link>
        </div>

        <div className="mt-6">
          <Link
            href="/"
            className="text-xs text-gray-400 hover:text-gray-200 transition-colors"
          >
            <u>Voltar à página inicial</u>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
