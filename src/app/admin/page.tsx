"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Coffee,
  Users,
  TrendingUp,
  Image as ImageIcon,
  Tag,
  Bell,
  LogOut,
  Loader2,
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");

    if (isAdmin !== "true") {
      router.push("/admin/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    router.push("/admin/login");
  };

  const cards = [
    {
      title: "Produtos",
      description: "Gerenciar cardápio e itens",
      icon: Coffee,
      href: "/admin/produtos",
      color: "bg-gradient-to-br from-amber-500 to-orange-600",
      stats: "45 itens",
    },
    {
      title: "Usuários",
      description: "Visualizar e gerenciar clientes",
      icon: Users,
      href: "/admin/usuarios",
      color: "bg-gradient-to-br from-blue-500 to-indigo-600",
      stats: "1.2k usuários",
    },
    {
      title: "Cupons",
      description: "Criar e gerenciar promoções",
      icon: Tag,
      href: "/admin/cupons",
      color: "bg-gradient-to-br from-red-500 to-rose-600",
      stats: "12 ativos",
    },
    {
      title: "Notificações",
      description: "Enviar avisos aos clientes",
      icon: Bell,
      href: "/admin/notificacoes",
      color: "bg-gradient-to-br from-yellow-500 to-orange-600",
      stats: "Enviar agora",
    },
    {
      title: "Imagens",
      description: "Galeria de fotos dos produtos",
      icon: ImageIcon,
      href: "/admin/imagens",
      color: "bg-gradient-to-br from-teal-500 to-cyan-600",
      stats: "120 fotos",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#292929]/84 to-black/65">
        <Loader2 className="animate-spin text-[#4E2010]" size={60} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#dcbd8f] via-[#c9a876] to-[#b89563] text-gray-900">
      <header className="bg-[#4E2010]/95 backdrop-blur-md border-b border-[#dcbd8f]/30 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#dcbd8f]">
                GetFood Admin
              </h1>
              <p className="text-[#dcbd8f]/70 text-sm mt-1">
                Bem-vindo(a), Administrador
              </p>
            </div>
            <div className="flex gap-2">
              <Link
                href="/"
                className="px-4 py-2 bg-[#dcbd8f]/20 hover:bg-[#dcbd8f]/30 text-white rounded-lg transition text-sm border border-[#dcbd8f]/30"
              >
                ← Voltar ao site
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-900/50 hover:bg-red-900/70 text-white rounded-lg transition text-sm border border-red-800/50"
              >
                <LogOut size={16} />
                Sair
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-[#4E2010]/80 backdrop-blur-sm p-6 rounded-xl border border-[#dcbd8f]/30 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#dcbd8f]/70 text-sm">Vendas Hoje</p>
                <p className="text-3xl font-bold text-[#dcbd8f]">R$ 5.4k</p>
              </div>
              <TrendingUp className="text-[#dcbd8f]" size={40} />
            </div>
          </div>
          <div className="bg-[#4E2010]/80 backdrop-blur-sm p-6 rounded-xl border border-[#dcbd8f]/30 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#dcbd8f]/70 text-sm">Total Clientes</p>
                <p className="text-3xl font-bold text-[#dcbd8f]">1.2k</p>
              </div>
              <Users className="text-[#dcbd8f]" size={40} />
            </div>
          </div>

          <div className="bg-[#4E2010]/80 backdrop-blur-sm p-6 rounded-xl border border-[#dcbd8f]/30 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#dcbd8f]/70 text-sm">Produtos Ativos</p>
                <p className="text-3xl font-bold text-[#dcbd8f]">45</p>
              </div>
              <Coffee className="text-[#dcbd8f]" size={40} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.href}
                href={card.href}
                className="group relative overflow-hidden rounded-xl border border-[#4E2010]/50 bg-white/90 backdrop-blur-sm p-6 hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:border-[#4E2010]"
              >
                <div
                  className={`absolute inset-0 bg-[#4E2010]/5 opacity-0 group-hover:opacity-100 transition-opacity`}
                ></div>

                <div className="relative">
                  <div
                    className={`bg-[#4E2010] w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}
                  >
                    <Icon className="text-[#dcbd8f]" size={24} />
                  </div>

                  <h3 className="text-xl font-bold mb-2 text-[#4E2010] group-hover:text-[#6a3418] transition-colors">
                    {card.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4">
                    {card.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{card.stats}</span>
                    <span className="text-[#4E2010] group-hover:translate-x-2 transition-transform font-bold">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-12 bg-white/90 backdrop-blur-sm rounded-xl border border-[#4E2010]/30 p-6 shadow-xl">
          <h2 className="text-xl font-bold mb-4 text-[#4E2010]">
            Resgates recentes
          </h2>
          <div className="space-y-4">
            {[
              {
                action: "#1234",
                time: "Há 1 minutos",
                status: "success",
              },
              {
                action: "#12345",
                time: "Há 2 minutos",
                status: "success",
              },
              {
                action: "#123456",
                time: "Há 2 minutos",
                status: "success",
              },
              {
                action: "#1234567",
                time: "Há 3 minutos",
                status: "success",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-3 border-b border-[#dcbd8f]/30 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      item.status === "success"
                        ? "bg-green-600"
                        : item.status === "warning"
                        ? "bg-yellow-600"
                        : "bg-[#4E2010]"
                    }`}
                  ></div>
                  <span className="text-gray-700">{item.action}</span>
                </div>
                <span className="text-sm text-gray-500">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
