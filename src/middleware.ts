import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    // Usuário logado tentando acessar rotas públicas
    if (token && (pathname.startsWith("/login") || pathname.startsWith("/cadastrar"))) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => {
        // Permite que todas as requisições passem pelo middleware
        // A lógica de redirecionamento é tratada manualmente acima
        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    "/login/:path*", 
    "/cadastrar/:path*",
    "/login"
  ]
};
