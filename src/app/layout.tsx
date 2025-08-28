// layout.tsx
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: ".GetFood",
  description: ".GetFOOD - Seu restaurante favorito na palma da mão.",
};

export const viewport = {
  themeColor: '#451a03',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className={poppins.variable}>
      <head>
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="msapplication-navbutton-color" content="#451a03" />
      </head>
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
