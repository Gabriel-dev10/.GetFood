"use client";

import Link from "next/link";

export default function PopupLogin() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50">
      
      <div className="bg-[#292929B2] text-white p-8 rounded-3xl shadow-2xl w-82 h-100 text-center">
        <h1 className="text-2xl text-white font-bold mb-8">
          Bem-vindo(a) ao .GetFood!
        </h1>

        <p className="text-sm text-white mb-6">
          Parece que você ainda não fez login...
        </p>
        <p className="text-xs text-white mb-10">
            <u>Acesse ou crie sua conta para aproveitar todos os benefícios do
            .GetFood!
            </u>
        </p>

        <Link
          href="/login"
          className="block bg-[#4E2010BF] hover:bg-[#6a2d16] text-white py-3 rounded-full font-semibold shadow-lg mb-4 transition-colors"
        >
          Fazer Login
        </Link>
        <Link
          href="/cadastrar"
          className="block bg-[#3a3a3a] hover:bg-[#4d4d4d] text-white py-3 rounded-full font-semibold shadow-lg transition-colors"
        >
          Cadastrar-se
        </Link>
        <Link
          href="/"
          className="text-xs text-white hover:text-gray-300"
        >
          <u>voltar à página inicial</u>
        </Link>
      </div>
    </div>
  );
}