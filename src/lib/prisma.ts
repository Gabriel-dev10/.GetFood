// lib/prisma.ts (Garanta que este é o seu arquivo)

import { PrismaClient } from "@prisma/client";

// Cria uma função para inicializar o Prisma Client
const prismaClientSingleton = () => {
  return new PrismaClient();
};

// Declara o objeto global para armazenar a instância
declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

// Usa a instância global ou cria uma nova
const prisma = globalThis.prisma ?? prismaClientSingleton();

// Exporta o cliente como default
export default prisma;

// Em desenvolvimento, armazena no objeto global para reutilização
if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;