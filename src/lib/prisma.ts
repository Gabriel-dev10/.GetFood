import { PrismaClient } from "@prisma/client";

/**
 * Objeto global para armazenar a instância do Prisma Client.
 * Evita múltiplas conexões em ambiente de desenvolvimento.
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

/**
 * Instância singleton do Prisma Client para acesso ao banco de dados.
 */
export const prisma = globalForPrisma.prisma ?? new PrismaClient();

// Em desenvolvimento, armazena a instância no objeto global para evitar múltiplas conexões.
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
