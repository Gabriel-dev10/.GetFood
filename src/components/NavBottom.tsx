"use client";

import { Home, ShoppingBag, User } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

/**
 * Componente de navegação inferior (menu fixo na parte inferior).
 *
 * Permite navegação entre as principais páginas do app.
 *
 * @returns {JSX.Element} Elemento do menu inferior
 */
export default function NavBottom() {
  /**
   * Item atualmente selecionado no menu.
   */
  const [selected, setSelected] = useState("inicio");
  const router = useRouter();

  /**
   * Lista de itens do menu inferior.
   */
  const menuItems = [
    { id: "Cardápio", label: "Cardápio", icon: Home, href: "/" },
    { id: "Pontos", label: "Pontos", icon: ShoppingBag, href: "/pag-pontos" },
    { id: "perfil", label: "Perfil", icon: User, href: "/perfil" },
  ];

  /**
   * Manipula o clique em um item do menu.
   * @param id - ID do item selecionado
   * @param href - Caminho de navegação
   */
  const handleClick = (id: string, href: string) => {
    setSelected(id);
    router.push(href);
  };

  return (
    <div className="fixed bottom-1 left-4 right-4 bg-amber-950 p-2 text-white rounded-full flex justify-around items-center shadow-lg">
      {menuItems.map(({ id, label, icon: Icon, href }) => (
        <button
          key={id}
          onClick={() => handleClick(id, href)}
          className={`flex flex-col items-center justify-center flex-1 py-2 ${
            selected === id ? "text-amber-900" : "text-white"
          }`}
        >
          <Icon size={24} />
          <span className="text-[10px] leading-none mt-1">{label}</span>
        </button>
      ))}
    </div>
  );
}
