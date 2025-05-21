'use client';

import { useState } from 'react';
import { Menu, X, CreditCard, LocateFixed, LogIn } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Image from 'next/image';
import BarraHorizontal from '../components/BarraHorizontal';
import NavBottom from '../components/NavBottom';
import Link from 'next/link';
import Footer from '../components/Footer';

export default function Inicio() {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <main className="text-white px-4 pt-4 pb-20 w-full max-w-screen-xl mx-auto relative">
  
      <header className="flex justify-between items-center mb-2 z-30 relative">
        <button onClick={() => setMenuAberto(true)}  className='cursor-pointer'>
          <Menu size={24} />
        </button>
        <div className="text-center text-xs leading-tight">
          <h1 className="text-base font-bold">
            GBC Coffee
          </h1>
          <div className='flex justify-between items-center gap-1'>
            <LocateFixed size={16} />
            <p className="text-blue-400 underline">
              R. Ver. Luiz Antonio da Cunha, da, 295
            </p>
          </div>
        </div>
        <div className="text-green-400 text-xs font-semibold whitespace-nowrap">● Aberto</div>
      </header>

      <div className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white z-50 transform transition-transform duration-300 ${menuAberto ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex justify-between items-center px-4 py-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button onClick={() => setMenuAberto(false)} className='cursor-pointer'>
            <X size={24} />
          </button>
        </div>
        <nav className="flex flex-col px-4 py-4 space-y-2">
          <Link href="/pag-pontos" className="hover:text-blue-400">Pontos</Link>
          <a href="" className="hover:text-blue-400">Instagram</a>
          <a href="" className="hover:text-blue-400">whatsapp</a>
          <div className="py-4 border-t mt-5 border-gray-700">
            <div className="flex items-center gap-2 hover:text-blue-400 transition-colors cursor-pointer">
              <LogIn size={20} />
              <Link href="/Login"><h1 className="text-sm font-medium">Entrar / Cadastrar</h1></Link>
            </div>
          </div>
        </nav>
      </div>
    
      {menuAberto && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={() => setMenuAberto(false)}
        />
      )}


      <section className="my-4 rounded-xl overflow-hidden w-full">
          <Swiper spaceBetween={10} slidesPerView={1}>
            {[1, 2, 3].map((_, index) => (
              <SwiperSlide key={index}>
                <div className="relative w-full h-[200px] md:h-[400px] rounded-lg overflow-hidden">
                  <Image
                    src="/imgcarrossel.avif"
                    alt="Banner promocional"
                    fill
                    className="object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>


      <section className="flex justify-around text-center border-t border-gray-700 pt-2 text-xs sm:text-sm">
        <div className="flex flex-col items-center">
          <p className="font-medium mt-1">Pagamentos</p>
          <CreditCard size={18} />
        </div>
        <div>
          <p className="text-gray-300">Fila</p>
          <p className="text-green-400 font-semibold">15</p>
        </div>
        <div>
          <p className="text-gray-300">Retirada</p>
          <p className="text-white font-semibold">15min</p>
        </div>
      </section>

      <BarraHorizontal />
      <NavBottom />
      <Footer/>

    </main>
  );
}
