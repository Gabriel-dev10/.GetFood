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
    <main className="text-black px-4 pt-4 pb-20 w-full max-w-screen-xl mx-auto relative">

      <header className="relative flex items-center justify-center mb-4 z-30">
        <div className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 text-green-500 font-extrabold">
          ● Aberto
        </div>

        <h1 className="text-xl text-white sm:text-4xl font-extrabold text-center">
          GBC Coffee
        </h1>

        <Link 
          href="/Login"
          className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 flex items-center gap-2 text-xs cursor-pointer hover:text-gray-800 hover:underline text-gray-800 px-2 py-1 rounded-lg transition duration-300"
        >
          <LogIn size={20} />
          <span>Entrar / Cadastrar</span>
        </Link>
      </header>

      <section className="my-4 rounded-xl overflow-hidden w-full">
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

      <section className="flex justify-around text-center border-t border-gray-700 pt-2 text-xs sm:text-sm">
        <a href="" className="flex flex-col items-center hover:text-gray-800">
          Informações
          <Info size={20} className="hover:text-gray-800 cursor-pointer" />
        </a>

        <a href="" className="flex flex-col items-center hover:text-gray-800">
          Fidelidade
          <Star size={20} className="hover:text-gray-800 cursor-pointer" />
        </a>

        <a href="" className="flex flex-col items-center hover:text-gray-800">
          Instagram
          <Instagram size={20} className="hover:text-gray-800 cursor-pointer" />
        </a>
      </section>

      <BarraHorizontal />
      <NavBottom />
      <Footer />
    </main>
  );
}
