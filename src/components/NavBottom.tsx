'use client';

import { Home, ShoppingBag, User } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NavBottom() {
  const [selected, setSelected] = useState('inicio');
  const router = useRouter();

  const menuItems = [
    { id: 'Cardápio', label: 'Cardápio', icon: Home, href: '/' },
    { id: 'Pontos', label: 'Pontos', icon: ShoppingBag, href: '/pag-pontos' },
    { id: 'perfil', label: 'Perfil', icon: User, href: '/perfil' },
  ];

  const handleClick = (id: string, href: string) => {
    setSelected(id);
    router.push(href);  // Sempre navega para a rota correspondente
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 w-full bg-amber-950 p-1.5 text-white flex border-t border-gray-800 z-50">
      {menuItems.map(({ id, label, icon: Icon, href }) => (
        <button
          key={id}
          onClick={() => handleClick(id, href)}
          className={`flex flex-col items-center justify-center flex-1 py-2 ${
            selected === id ? 'text-orange-500' : 'text-white'
          }`}
        >
          <Icon size={24} />
          <span className="text-[10px] leading-none mt-1">{label}</span>
        </button>
      ))}
    </div>
  );
}
