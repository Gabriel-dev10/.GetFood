'use client';

import { Gift, TrendingUp, Flame, ScanLine} from 'lucide-react';
import { motion } from 'framer-motion';
import NavBottom from '../../components/NavBottom';
import Footer from '@/components/Footer';

export default function PagPontos() {
  const pontos = 1472;
  const nivel = 2;
  const meta = 2000;
  const progresso = (pontos / meta) * 100;
  const validade = '26/08/2026';

  return (
    <main className="min-h-screen px-4 pt-4 pb-20 w-full max-w-screen-xl mx-auto relative mt-3 text-gray-900 dark:text-white">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl text-amber-950 font-bold text-center flex-1">
          Painel de Recompensas
        </h1>
      </div>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-gradient-to-tr from-[#292929]/85 to-black/65 p-7 rounded-2xl shadow-lg mb-10 relative overflow-hidden"
      >
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-xl font-bold">
              Olá, <span className="text-[#DCBD8F]">User!</span>
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300">Nível {nivel}</p>
          </div>
          <div className="text-right">
            <span className="text-xs text-gray-600 dark:text-gray-300">Pontos</span>
            <p className="text-2xl font-extrabold text-green-500">{pontos}</p>
            <p className="text-xs mb-1">Válido até {validade}</p>
          </div>
        </div>

        <div className="w-full h-3 bg-white/50 dark:bg-black/30 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-green-500"
            initial={{ width: 0 }}
            animate={{ width: `${progresso}%` }}
            transition={{ duration: 1 }}
          />
        </div>
        <p className="text-xs text-right mt-1 text-gray-600 dark:text-gray-300">
          {progresso.toFixed(1)}% até o próximo nível ({meta} pontos)
        </p>
      </motion.section>

      <section className="mb-10">
        <h2 className="text-lg text-amber-950 font-bold mb-4">RESGATAR CUPOM</h2>
        <div className="flex flex-col sm:flex-row w-full max-w-xl bg-gradient-to-tr from-[#292929]/65 to-black/85 rounded-2xl sm:rounded-full shadow p-2 gap-2">
          <input
            type="text"
            placeholder="RESGATE SEU CUPOM"
            className="w-full flex-1 bg-white/20 text-gray-200 placeholder-gray-200 px-4 py-3 rounded-full focus:outline-none"
          />
          <div className="flex gap-2 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none bg-[#3c1c11] hover:bg-[#2a120c] text-white text-sm font-bold px-4 py-2 rounded-full transition">
              ENVIAR
            </button>
            <button className="bg-[#3c1c11]/70 hover:bg-[#2a120c] text-white p-3 rounded-full transition flex items-center justify-center">
              <ScanLine size={22} />
            </button>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-lg text-amber-950 font-bold mb-4">CONQUISTAS RECENTES</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              icon: <Flame className="text-red-500" aria-label="Conquista: Combo Semanal" />,
              title: "Combo Semanal",
              desc: "5 compras em menos de 7 dias",
            },
            {
              icon: <TrendingUp className="text-blue-500" aria-label="Conquista: Fidelidade Ouro" />,
              title: "Fidelidade Ouro",
              desc: "Mais de R$500 em compras",
            },
          ].map((achieve, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-4 p-4 bg-gradient-to-tr from-[#292929]/85 to-black/60 rounded-xl shadow"
              whileHover={{ scale: 1.03 }}
            >
              <div className="text-3xl">{achieve.icon}</div>
              <div>
                <p className="font-bold">{achieve.title}</p>
                <span className="text-sm text-gray-500 dark:text-gray-400">{achieve.desc}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-lg text-amber-950 font-bold mb-4">RECOMPENSAS DISPONÍVEIS</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            {
              title: "10% de Desconto",
              points: 10000,
            },
            {
              title: "Café Grátis",
              points: 1000,
            },
            {
              title: "Ganhe um Combo",
              points: 20000,
            },
          ].map((promo, i) => (
            <motion.div
              key={i}
              className="bg-gradient-to-tr from-[#292929]/85 to-black/60 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition group"
              whileHover={{ scale: 1.03 }}
            >
              <div className="p-3 text-sm">
                <p className="font-bold mb-1">{promo.title}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                  <Gift size={14} aria-label="Ícone de presente" /> {promo.points} pontos
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
      <NavBottom />
    </main>
  );
}
