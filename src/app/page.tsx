'use client';

import { Info, Star, Instagram, LogIn, X } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { motion, AnimatePresence } from 'framer-motion';
import 'swiper/css';
import Image from 'next/image';
import BarraHorizontal from '../components/BarraHorizontal';
import NavBottom from '../components/NavBottom';
import Link from 'next/link';
import Footer from '../components/Footer';
import { useState } from 'react';

export default function Inicio() {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <main className="min-h-screen px-4 pt-4 pb-20 w-full max-w-screen-xl mx-auto relative mt-3 text-gray-900 dark:text-white">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between mb-6 px-4 py-2 rounded-xl"
      >
        <button
          onClick={() => setShowInfo(true)}
          className="text-blue-500 hover:text-blue-400 flex items-center gap-1 text-xs font-bold transition"
        >
          <Info size={18} />
          Info
        </button>

        <h1 className="text-2xl font-bold text-center flex-1 -ml-5">GBC Coffee</h1>

        <Link
          href="/Login"
          className="flex items-center gap-2 font-bold text-xs cursor-pointer hover:text-blue-500 hover:underline text-gray-100 px-2 py-1 rounded-lg transition duration-300"
        >
          <LogIn size={20} />
          <span>Entrar</span>
        </Link>
      </motion.div>

      {/* Carrossel */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl overflow-hidden shadow-lg mb-8"
      >
        <Swiper spaceBetween={10} slidesPerView={1}>
          {[1, 2, 3].map((_, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-[200px] md:h-[350px]">
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
      </motion.section>

      {/* Info Modal */}
      <AnimatePresence>
        {showInfo && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowInfo(false)}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-lg w-full max-w-sm"
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-end mb-2">
                <button onClick={() => setShowInfo(false)} className="text-gray-500 hover:text-red-500">
                  <X size={20} />
                </button>
              </div>
              <div className="grid grid-cols-3 text-center -m-1 gap-2">
                <a href="#" className="flex flex-col items-center gap-1 hover:text-yellow-600 dark:hover:text-yellow-400 transition">
                  <Info size={24} />
                  <span className="text-sm font-semibold">Informações</span>
                </a>
                <a href="#" className="flex flex-col items-center gap-1 text-blue-500 dark:text-blue-400 hover:scale-105 transition-transform">
                  <Star size={24} />
                  <span className="text-sm font-semibold">Sorteio</span>
                </a>
                <a href="#" className="flex flex-col items-center gap-1 hover:text-yellow-600 dark:hover:text-yellow-400 transition">
                  <Instagram size={24} />
                  <span className="text-sm font-semibold">Instagram</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mb-8"
      >
        <BarraHorizontal />
      </motion.div>

      <Footer />
      <NavBottom />
    </main>
  );
}
