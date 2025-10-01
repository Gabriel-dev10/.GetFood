"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { validateForm, validateCPF, validateEmail } from "@/utils/validators";
import { useSession } from "next-auth/react";

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

/**
 * Componente de página de cadastro de novo usuário.
 *
 * Permite ao usuário criar uma conta informando dados pessoais e senha.
 *
 * @returns {JSX.Element} Elemento da página de cadastro
 */
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
  const router = useRouter();
  const { data: session } = useSession();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "cpf") {
      const numericValue = value.replace(/\D/g, "").slice(0, 11);
      let formattedValue = numericValue;
      if (numericValue.length > 9) {
        formattedValue = `${numericValue.slice(0, 3)}.${numericValue.slice(
          3,
          6,
        )}.${numericValue.slice(6, 9)}-${numericValue.slice(9)}`;
      } else if (numericValue.length > 6) {
        formattedValue = `${numericValue.slice(0, 3)}.${numericValue.slice(
          3,
          6,
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
          2,
        )}`;
      }
      if (numericValue.length > 7) {
        formattedValue = `(${numericValue.slice(0, 2)}) ${numericValue.slice(
          2,
          7,
        )}-${numericValue.slice(7, 11)}`;
      }
      setForm({ ...form, [name]: formattedValue });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  /**
   * Realiza o processo de cadastro do usuário.
   *
   * Valida os campos, envia dados para a API e redireciona em caso de sucesso.
   *
   * @param e - Evento de submit do formulário
   */
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const { senha, confirmaSenha, ...fieldsToValidate } = form;

    const validationErrors: ValidationErrors = validateForm({
      ...fieldsToValidate,
      email: form.email,
      telefone: form.telefone,
      cpf: form.cpf,
    });

    if (!senha) validationErrors.senha = "A senha é obrigatória.";
    if (!confirmaSenha) validationErrors.confirmaSenha = "Confirme sua senha.";
    if (senha && confirmaSenha && senha !== confirmaSenha)
      validationErrors.confirmaSenha = "As senhas não coincidem.";

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
        router.push("/login");
      } else {
        setError(data?.message || "Erro ao criar conta");
      }
    } catch{
      setError("Erro ao conectar com o servidor. Tente novamente mais tarde.");
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
      <div className="w-full max-w-md bg-gray-100 rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
          Criar Conta
        </h2>
        <form onSubmit={handleRegister} className=" text-gray-700 space-y-5">
          {fields.map(({ id, label, type, placeholder }) => (
            <div key={id}>
              <label
                htmlFor={id}
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                {label}
              </label>
              <input
                id={id}
                name={id}
                type={type}
                placeholder={placeholder}
                className="w-full px-4 py-3 rounded-md border border-gray-300 text-black"
                value={form[id as keyof FormData]}
                onChange={handleChange}
                required
              />
              {errors[id as keyof ValidationErrors] && (
                <p className="text-red-600 text-sm">
                  {errors[id as keyof ValidationErrors]}
                </p>
              )}
            </div>
          ))}
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 transition text-white py-3 rounded-md font-semibold"
          >
            Criar Conta
          </button>
          <p className="text-center text-sm text-gray-600">
            Já tem uma conta?{" "}
            <Link href="/login" className="text-orange-600 hover:underline">
              Entrar
            </Link>
            <Link
              href="/"
              className="block text-orange-600 hover:underline"
            >
              voltar à página inicial
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
