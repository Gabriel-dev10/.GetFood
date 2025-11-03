'use client';

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

export default function RedefinirSenha() {
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [codigo, setCodigo] = useState('');
  const [error, setError] = useState('');
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const searchParams = useSearchParams();

  const senhaValidaTamanho = novaSenha.length >= 8;
  const senhaValidaEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(novaSenha);

  useEffect(() => {
    // Tenta pegar o parâmetro 'token' da URL
    const tokenDaUrl = searchParams.get('token');

    if (tokenDaUrl) {
      // Se encontrou o token na URL, atualiza o estado 'codigo'
      setCodigo(tokenDaUrl);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!novaSenha.trim() || !confirmarSenha.trim() || !codigo.trim()) {
      setError('Preencha todos os campos. Se o código não apareceu, use o link do e-mail.');
      return;
    }

    // Validação da senha
    if (novaSenha.length < 8) {
      setError('A senha deve ter no mínimo 8 caracteres.');
      return;
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(novaSenha)) {
      setError('A senha deve conter pelo menos um caractere especial.');
      return;
    }

    if (novaSenha !== confirmarSenha) {
      setError('As senhas não coincidem.');
      return;
    }

    setError('');

    // 👇 INÍCIO DOS AJUSTES
    try {
      // AJUSTE 1: Corrigir a URL da API
      const res = await fetch('/api/auth/redefine-senha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // AJUSTE 2: Mapear os estados do frontend para os nomes que o backend espera
        body: JSON.stringify({
          token: codigo,
          password: novaSenha,
          passwordConfirmation: confirmarSenha,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMostrarPopup(true);
      } else {
        setError(data?.error || 'Erro ao redefinir senha. Verifique o código.');
      }
    } catch (e) {
      setError( `${e}. Erro ao conectar com o servidor. Tente novamente.`)
    }
    // 👆 FIM DOS AJUSTES
  };

  const voltarParaLogin = () => {
    router.push('/login');
  };

  useEffect(() => {
    if (session) {
      router.replace("/");
    }
  }, [session, router]); // Adicionadas dependências ao useEffect

  // O resto do seu JSX permanece exatamente o mesmo, pois está perfeito!
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="w-full max-w-md bg-gradient-to-br from-[#1e1e1e] to-[#2b2b2b] rounded-3xl shadow-2xl p-8 border border-white/10 text-white"
      >
        {/* Logo */}
        <h1 className="text-3xl font-extrabold text-center mb-8 select-none">
          <span className="text-[#ff7043]">.</span>Get
          <span className="text-[#ff7043]">Food</span>
        </h1>

        {/* Título */}
        <h2 className="text-xl font-semibold text-center mb-2 text-gray-200">
          Redefinir Senha
        </h2>
        <p className="text-sm text-gray-400 text-center mb-6">
          Digite sua nova senha e o código enviado para seu e-mail.
        </p>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Nova Senha
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Digite sua nova senha"
                className="w-full px-4 py-3 rounded-lg bg-[#2a2a2a]/80 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#ff7043] text-gray-200 placeholder-gray-500 pr-10"
                value={novaSenha}
                onChange={e => setNovaSenha(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            
            {/* Checklist de senha */}
            <div className="mt-2 text-xs text-gray-400 space-y-1">
              <p
                className={`${
                  senhaValidaTamanho ? "text-green-400" : "text-gray-500"
                }`}
              >
                {senhaValidaTamanho ? "✔" : "✖"} Mínimo de 8 caracteres
              </p>
              <p
                className={`${
                  senhaValidaEspecial ? "text-green-400" : "text-gray-500"
                }`}
              >
                {senhaValidaEspecial ? "✔" : "✖"} Pelo menos um caractere especial
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Confirmar Nova Senha
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Repita sua nova senha"
                className="w-full px-4 py-3 rounded-lg bg-[#2a2a2a]/80 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#ff7043] text-gray-200 placeholder-gray-500 pr-10"
                value={confirmarSenha}
                onChange={e => setConfirmarSenha(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Código
            </label>
            <input
              type="text"
              placeholder="Insira o código"
              className="w-full px-4 py-3 rounded-lg bg-[#2a2a2a]/80 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#ff7043] text-gray-200 placeholder-gray-500"
              value={codigo}
              readOnly
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#ff7043] to-[#ff5722] hover:from-[#ff5722] hover:to-[#e64a19] text-white font-semibold py-3 rounded-full shadow-lg transition-all"
          >
            Redefinir Senha
          </button>
        </form>
      </motion.div>

      {/* Popup de sucesso */}
      {mostrarPopup && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-br from-[#1e1e1e] to-[#2b2b2b] rounded-2xl shadow-2xl p-6 max-w-sm w-full text-center border border-white/10 text-white"
          >
            <h2 className="text-lg font-semibold mb-4">
              Senha redefinida com sucesso!
            </h2>
            <button
              onClick={voltarParaLogin}
              className="bg-gradient-to-r from-[#ff7043] to-[#ff5722] hover:from-[#ff5722] hover:to-[#e64a19] text-white py-2 px-6 rounded-full font-medium shadow-md transition"
            >
              Voltar para o login
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}