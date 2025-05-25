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
    router.push(href);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 w-full bg-amber-950 text-white flex justify-around items-center h-16 border-t border-gray-800 z-50">
      {menuItems.map(({ id, label, icon: Icon, href }) => (
        <button
          key={id}
          onClick={() => handleClick(id, href)}
          className={`flex flex-col items-center text-xs focus:outline-none cursor-pointer ${
            selected === id ? 'text-orange-700' : 'text-white'
          }`}
        >
          <Icon size={24} />
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}
