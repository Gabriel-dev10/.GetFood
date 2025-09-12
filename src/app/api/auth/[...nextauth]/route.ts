import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

const handler = NextAuth({
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

        // Busca o usuário no banco
        const user = await prisma.usuarios.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("Usuário não encontrado.");
        }

        // Verifica se o usuário tem senha cadastrada
        if (!user.senha) {
          throw new Error("Usuário não possui senha definida.");
        }

        // Verifica a senha utilizando bcrypt
        const passwordMatch = await bcrypt.compare(credentials.senha, user.senha);

        if (!passwordMatch) {
          throw new Error("Senha incorreta.");
        }

        return {
          id: String(user.id),
          name: user.nome,
          email: user.email,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 dias
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    
    async session({ session, token }) {
      // Agora o TypeScript reconhece a propriedade id
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
