'use client';

import { ArrowLeftCircle, Crown } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image'; // Certifique-se de importar a tag corretamente

export default function PagPontos() {
  return (
    <main className="text-black px-4 pt-4 pb-20 w-full max-w-screen-md mx-auto">
      <header className="relative flex items-center justify-center mb-4">
        <Link href="/" className="absolute left-0 text-green-600 hover:text-red-500">
          <ArrowLeftCircle size={28} />
        </Link>
        <h1 className="text-white text-center font-bold">Pontos</h1>
      </header>

      <section className="bg-white p-4 rounded-xl mb-4 shadow">
        <div className="mb-2 text-sm text-gray-700">
          <span className="flex items-center gap-1">
            Olá <span className="text-black flex items-center gap-1">
              José <Crown size={16} className="text-yellow-500" />
            </span>
          </span>
          <div className="mt-1 text-left sm:text-auto">
            <span>Você é cliente <strong className="text-yellow-500">1 coroa</strong></span>
          </div>
        </div>

        <div className="mt-2">
          <p className="text-2xl font-bold text-green-600">R$ 100,47</p>
          <p className="text-xs text-gray-600">de R$ 2.000,00</p>
        </div>

        <div className="h-2 mt-2 bg-gray-300 rounded-full overflow-hidden">
          <div className="h-full bg-green-500" style={{ width: '5%' }} />
        </div>
      </section>

      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="w-full h-36 bg-white rounded-xl overflow-hidden shadow relative">
          <Image src="/img/promo-pontos1.png" alt="Promoção 1" layout="fill" className="object-cover" />
        </div>
        <div className="w-full h-36 bg-white rounded-xl overflow-hidden shadow relative">
          <Image src="/img/promo-pontos2.png" alt="Promoção 2" layout="fill" className="object-cover" />
        </div>
        <div className="w-full h-36 bg-white rounded-xl overflow-hidden shadow relative">
          <Image src="/img/promo-pontos1.png" alt="Promoção 3" layout="fill" className="object-cover" />
        </div>
        <div className="w-full h-36 bg-white rounded-xl overflow-hidden shadow relative">
          <Image src="/img/promo-pontos2.png" alt="Promoção 4" layout="fill" className="object-cover" />
        </div>
      </section>
    </main>
  );
}
