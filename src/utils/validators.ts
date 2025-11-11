export function validateEmail(email: string): boolean {
  return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
}

export function formatCPF(value: string): string {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1-$2")
    .slice(0, 14);
}

export function validateCPF(cpf: string): boolean {
  cpf = cpf.replace(/[^\d]+/g, "");
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) sum += Number(cpf[i]) * (10 - i);
  let rev = 11 - (sum % 11);
  if (rev >= 10) rev = 0;
  if (rev !== Number(cpf[9])) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) sum += Number(cpf[i]) * (11 - i);
  rev = 11 - (sum % 11);
  if (rev >= 10) rev = 0;
  if (rev !== Number(cpf[10])) return false;

  return true;
}

export function validateTelefone(telefone: string): boolean {
  return /^(\(?\d{2}\)?\s?)?(\d{4,5}\-?\d{4})$/.test(telefone.replace(/\s/g, ""));
}

export interface FormData {
  name: string;
  email: string;
  telefone: string;
  cpf: string;
}

export function validateForm(data: FormData): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!data.name.trim()) {
    errors.name = "O nome completo é obrigatório.";
  }

  if (!data.email.trim()) {
    errors.email = "O e-mail é obrigatório.";
  } else if (!validateEmail(data.email)) {
    errors.email = "E-mail inválido.";
  }

  if (!data.telefone.trim()) {
    errors.telefone = "O telefone é obrigatório.";
  } else if (!validateTelefone(data.telefone)) {
    errors.telefone = "Telefone inválido.";
  }

  if (!data.cpf.trim()) {
    errors.cpf = "O CPF é obrigatório.";
  } else if (!validateCPF(data.cpf)) {
    errors.cpf = "CPF inválido.";
  }

  return errors;
}