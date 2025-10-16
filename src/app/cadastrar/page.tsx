"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { validateForm, validateCPF, validateEmail } from "@/utils/validators";
import { useSession, signIn, getSession } from "next-auth/react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

type FormData = {
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  senha: string;
  confirmaSenha: string;
};

type ValidationErrors = Partial<Record<keyof FormData, string>>;

const fields = [
  { id: "nome", label: "Nome", type: "text", placeholder: "Digite seu nome" },
  {
    id: "email",
    label: "Email",
    type: "email",
    placeholder: "exemplo@gmail.com",
  },
  {
    id: "telefone",
    label: "Telefone",
    type: "text",
    placeholder: "(99) 99999-9999",
  },
  { id: "cpf", label: "CPF", type: "text", placeholder: "000.000.000-00" },
  {
    id: "senha",
    label: "Senha",
    type: "password",
    placeholder: "Digite sua senha",
  },
  {
    id: "confirmaSenha",
    label: "Confirme sua senha",
    type: "password",
    placeholder: "Confirme sua senha",
  },
];

export default function CriarConta() {
  const [form, setForm] = useState<FormData>({
    nome: "",
    email: "",
    telefone: "",
    cpf: "",
    senha: "",
    confirmaSenha: "",
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const senhaValidaTamanho = form.senha.length >= 8;
  const senhaValidaEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(form.senha);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "cpf") {
      const numericValue = value.replace(/\D/g, "").slice(0, 11);
      let formattedValue = numericValue;
      if (numericValue.length > 9) {
        formattedValue = `${numericValue.slice(0, 3)}.${numericValue.slice(
          3,
          6
        )}.${numericValue.slice(6, 9)}-${numericValue.slice(9)}`;
      } else if (numericValue.length > 6) {
        formattedValue = `${numericValue.slice(0, 3)}.${numericValue.slice(
          3,
          6
        )}.${numericValue.slice(6)}`;
      } else if (numericValue.length > 3) {
        formattedValue = `${numericValue.slice(0, 3)}.${numericValue.slice(3)}`;
      }
      setForm({ ...form, [name]: formattedValue });
    } else if (name === "telefone") {
      const numericValue = value.replace(/\D/g, "").slice(0, 11);
      let formattedValue = numericValue;

      if (numericValue.length > 2) {
        formattedValue = `(${numericValue.slice(0, 2)}) ${numericValue.slice(
          2
        )}`;
      }
      if (numericValue.length > 7) {
        formattedValue = `(${numericValue.slice(0, 2)}) ${numericValue.slice(
          2,
          7
        )}-${numericValue.slice(7, 11)}`;
      }
      setForm({ ...form, [name]: formattedValue });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const { senha, confirmaSenha, ...fieldsToValidate } = form;

    const validationErrors: ValidationErrors = validateForm({
      ...fieldsToValidate,
      email: form.email,
      telefone: form.telefone,
      cpf: form.cpf,
    });

    // Verificação da senha
    if (!senha) {
      validationErrors.senha = "A senha é obrigatória.";
    } else {
      if (senha.length < 8) {
        validationErrors.senha = "A senha deve ter no mínimo 8 caracteres.";
      } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(senha)) {
        validationErrors.senha =
          "A senha deve conter pelo menos um caractere especial.";
      }
    }

    if (!confirmaSenha) {
      validationErrors.confirmaSenha = "Confirme sua senha.";
    } else if (senha && confirmaSenha && senha !== confirmaSenha) {
      validationErrors.confirmaSenha = "As senhas não coincidem.";
    }

    if (!validateCPF(form.cpf)) {
      validationErrors.cpf =
        "CPF inválido. Certifique-se de usar apenas números e que tenha 11 dígitos.";
    }

    if (!/^\(\d{2}\)\s\d{5}-\d{4}$/.test(form.telefone)) {
      validationErrors.telefone =
        "Telefone inválido. Use o formato (99) 99999-9999.";
    }

    if (!validateEmail(form.email)) {
      validationErrors.email =
        "Email inválido. Certifique-se de usar um formato válido.";
    }

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          ...form,
          cpf: form.cpf.replace(/\D/g, ""),
          telefone: form.telefone.replace(/\D/g, ""),
        }),
        headers: { "Content-Type": "application/json" },
      });

      const data: { message?: string } = await res.json();

      if (res.ok) {
        const loginRes = await signIn("credentials", {
          redirect: false,
          email: form.email,
          senha: form.senha,
        });

        if (loginRes?.ok) {
          await getSession();
          window.location.href = "/";
        } else {
          window.location.href = "/login";
        }
      } else {
        setError(data?.message || "Erro ao criar conta");
        setIsLoading(false);
      }
    } catch {
      setError("Erro ao conectar com o servidor. Tente novamente mais tarde.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      window.location.href = "/";
    }
  });

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
          Criar Conta
        </h2>

        <form onSubmit={handleRegister} className="space-y-5">
          {fields.map(({ id, label, type, placeholder }) => (
            <div key={id}>
              <label
                htmlFor={id}
                className="block text-sm font-medium text-gray-400 mb-1"
              >
                {label}
              </label>
              <div className="relative">
                <input
                  id={id}
                  name={id}
                  type={
                    id === "senha"
                      ? showPassword
                        ? "text"
                        : "password"
                      : id === "confirmaSenha"
                      ? showConfirmPassword
                        ? "text"
                        : "password"
                      : type
                  }
                  placeholder={placeholder}
                  className="w-full px-4 py-3 rounded-lg bg-[#2a2a2a] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#ff7043] text-gray-200 placeholder-gray-500 pr-10"
                  value={form[id as keyof FormData]}
                  onChange={handleChange}
                  required
                />
                {(id === "senha" || id === "confirmaSenha") && (
                  <button
                    type="button"
                    onClick={() =>
                      id === "senha"
                        ? setShowPassword(!showPassword)
                        : setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
                  >
                    {id === "senha"
                      ? showPassword
                        ? <EyeOff size={20} />
                        : <Eye size={20} />
                      : showConfirmPassword
                      ? <EyeOff size={20} />
                      : <Eye size={20} />}
                  </button>
                )}
              </div>

              {/* Checklist de senha */}
              {id === "senha" && (
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
                    {senhaValidaEspecial ? "✔" : "✖"} Pelo menos um caractere
                    especial
                  </p>
                </div>
              )}

              {errors[id as keyof ValidationErrors] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[id as keyof ValidationErrors]}
                </p>
              )}
            </div>
          ))}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className={`w-full bg-gradient-to-r from-[#ff7043] to-[#ff5722] hover:from-[#ff5722] hover:to-[#e64a19] text-white font-semibold py-3 rounded-full shadow-lg transition-all ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Criando conta e entrando..." : "Criar Conta"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          <p>
            Já tem uma conta?{" "}
            <Link href="/login" className="text-[#ff7043] hover:underline">
              Entrar
            </Link>
          </p>
          <Link href="/" className="block mt-2 text-[#ff7043] hover:underline">
            Voltar à página inicial
          </Link>
        </div>
      </motion.div>
    </div>
  );
}