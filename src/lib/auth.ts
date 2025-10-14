import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        senha: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.senha) {
          throw new Error("Email e senha são obrigatórios.");
        }

        const user = await prisma.usuarios.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("Usuário não encontrado.");
        }

        if (!user.senha) {
          throw new Error("Usuário não possui senha definida.");
        }

        const passwordMatch = await bcrypt.compare(
          credentials.senha,
          user.senha
        );

        if (!passwordMatch) {
          throw new Error("Senha incorreta.");
        }

        return {
          id: String(user.id),
          name: user.nome,
          email: user.email,
          image: user.foto || null,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async jwt({ token, user, trigger }) {
      if (trigger === "update") {
        try {
          const updatedUser = await prisma.usuarios.findUnique({
            where: { id: Number(token.id) },
            select: { nome: true, email: true, foto: true },
          });

          if (updatedUser) {
            token.name = updatedUser.nome;
            token.email = updatedUser.email;
            token.image = updatedUser.foto || null;
          }
        } catch (error) {
          console.error("Erro ao buscar usuário atualizado:", error);
        }
      }

      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image ?? token.image;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.image = token.image as string;
      }
      return session;
    },
  },
};
