'use client';
import { Home, ShoppingBag, User } from 'lucide-react';
import { useState } from 'react';

export default function NavBottom() {
  const [selected, setSelected] = useState('inicio');

  const menuItems = [
    { id: 'inicio', label: 'Início', icon: Home },
    { id: 'pedidos', label: 'Pedidos', icon: ShoppingBag },
    { id: 'perfil', label: 'Perfil', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 w-full bg-white text-white flex justify-around items-center h-16 border-t border-gray-800 z-50">
      {menuItems.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => setSelected(id)}
          className={`flex flex-col items-center text-xs focus:outline-none cursor-pointer ${
            selected === id ? 'text-blue-500' : 'text-black'
          }`}
        >
          <Icon size={24} />
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}
