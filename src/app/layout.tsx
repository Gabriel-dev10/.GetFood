/**
 * Layout raiz da aplicação Next.js.
 *
 * Define fontes, metadados e estrutura HTML principal.
 * @module RootLayout
 */
// layout.tsx

import type { Metadata } from "next";
import { Poppins, Dancing_Script } from "next/font/google";
import "./globals.css";
import { Providers } from "@/config/providers";

const dancingScript = Dancing_Script({
  variable: "--font-dancingScript",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

/**
 * Metadados da aplicação para SEO e título.
 */
export const metadata: Metadata = {
  title: ".GetFood",
  description: ".GetFOOD - Seu restaurante favorito na palma da mão.",
};

/**
 * Configuração de cor do tema para mobile.
 */
export const viewport = {
  themeColor: "#451a03",
};

/**
 * Componente de layout raiz que envolve toda a aplicação.
 *
 * @param children - Elementos filhos a serem renderizados dentro do layout
 * @returns {JSX.Element} Estrutura HTML principal
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-br"
      className={`${poppins.variable} ${dancingScript.variable}`}
    >
      <head>
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <link rel="icon" href="/favicon.ico" />
        <meta name="msapplication-navbutton-color" content="#451a03" />
      </head>
      <body className="antialiased font-sans"><Providers>{children}</Providers></body>
    </html>
  );
}
