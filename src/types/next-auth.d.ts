// types/next-auth.d.ts
import "next-auth";

declare module "next-auth" {
  /**
   * Extendendo a interface User padrão
   */
  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
  }

  /**
   * Extendendo a interface Session
   */
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  /**
   * Extendendo a interface JWT
   */
  interface JWT {
    id: string;
    email?: string | null;
  }
}