'use client';

import { Info, Star, Instagram, LogIn } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Image from 'next/image';
import BarraHorizontal from '../components/BarraHorizontal';
import NavBottom from '../components/NavBottom';
import Link from 'next/link';
import Footer from '../components/Footer';

export default function Inicio() {
  return (
    <main className="min-h-screen px-1 pt-4 pb-20 w-full max-w-screen-xl mx-auto relative mt-3 text-gray-900 dark:text-white">

      <header className="relative flex items-center justify-between mb-8 z-30">
        <div className="text-xs text-green-500 font-bold">● Aberto</div>

        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-white text-2xl font-bold text-center">
          GBC Coffee
        </h1>

      <div className="flex items-center">
        <Link 
          href="/Login"
          className="flex items-center gap-2 font-bold text-xs cursor-pointer hover:text-gray-300 hover:underline text-gray-100 px-2 py-1 rounded-lg transition duration-300"
        >
          <LogIn size={20} />
          <span>Entrar</span>
        </Link>
      </div>

      </header>

      <section className="mb-6 rounded-xl overflow-hidden w-full">
        <Swiper spaceBetween={10} slidesPerView={1}>
          {[1, 2, 3].map((_, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-[200px] md:h-[350px] rounded-lg overflow-hidden">
                <Image
                  src="/Img/logocarrossel.png"
                  alt="Banner promocional"
                  fill
                  className="object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section className="mb-6 flex justify-around text-center border-t text-black   border-gray-700 pt-4 text-xs sm:text-sm">
        <a href="#" className="flex flex-col items-center hover:text-gray-800">
          Informações
          <Info size={20} className="cursor-pointer" />
        </a>

        <a href="#" className="flex flex-col items-center hover:text-gray-800">
          Fidelidade
          <Star size={20} className="cursor-pointer" />
        </a>

        <a href="#" className="flex flex-col items-center hover:text-gray-800">
          Instagram
          <Instagram size={20} className="cursor-pointer" />
        </a>
      </section>

      <div className="mb-8">
        <BarraHorizontal />
      </div>

      <Footer />
      <NavBottom />
    </main>
  );
}
