// #lib/auth.ts

import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google"; 
import { PrismaAdapter } from "@auth/prisma-adapter"; 
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { generateUUID } from "@/utils/token"; // Importa o gerador de token

// 1. Obtém as funções padrão do Prisma Adapter
const defaultAdapter = PrismaAdapter(prisma);

// 2. Cria o objeto do Adapter customizado, sobrescrevendo 'createUser'
const customAdapter = {
  ...defaultAdapter,
  
  // Sobrescreve a função createUser para injetar o campo 'token'
  createUser: (user) => {
    const data = {
      ...user,
      // INJETA O TOKEN ÚNICO OBRIGATÓRIO (UUID)
      token: generateUUID(),
    };
    // Executa a criação do usuário no Prisma
    return prisma.user.create({ data });
  },
} as NextAuthOptions['adapter']; // Garante a tipagem correta para o NextAuth


export const authOptions: NextAuthOptions = {
  // Usa o adaptador customizado que inclui a lógica do token
  adapter: customAdapter, 

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    // Provedor Credentials (EXISTENTE)
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

        const user = await prisma.User.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("Usuário não encontrado.");
        }

        if (!user.senha) {
          throw new Error("Usuário não possui senha definida. Tente logar com o Google.");
        }

        const passwordMatch = await bcrypt.compare(
          credentials.senha,
          user.senha
        );

        if (!passwordMatch) {
          throw new Error("Senha incorreta.");
        }

        // Retorna os campos mapeados do DB para o NextAuth User
        return {
          id: String(user.id),
          name: user.nome, // Mapeado do campo 'nome'
          email: user.email,
          image: user.foto || null, // Mapeado do campo 'foto'
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
        let dbUser = null;

        // 1. Se o login acabou de ocorrer (OAuth ou Credentials), 'user' está preenchido
        if (user) {
            token.id = user.id;
            token.name = user.name;
            token.email = user.email;
            token.image = user.image ?? token.image;
        } 
        
        if (trigger === "update" || !user) {
         if (token.id) {
            try {
               dbUser = await prisma.User.findUnique({
                  where: { id: Number(token.id) },
                  // CORREÇÃO: Usar o nome do CAMPO do MODELO ('name', 'image')
                  select: { name: true, email: true, image: true }, 
               });
            } catch (error) {
               console.error("Erro ao buscar usuário no DB:", error);
            }
         }
      }
        
        // CORREÇÃO: Mapear dbUser.name para token.name (aqui os nomes são os mesmos!)
        if (dbUser) {
            token.name = dbUser.name; 
            token.email = dbUser.email;
            token.image = dbUser.image || null; 
        }

      return token;
   },

    async session({ session, token }) {
        if (session.user) {
            session.user.id = token.id as string;
            // Estes campos vêm do callback JWT e agora estão corretamente mapeados do DB
            session.user.name = token.name as string; 
            session.user.email = token.email as string;
            session.user.image = token.image as string;
        }
        return session;
    },
  },
};