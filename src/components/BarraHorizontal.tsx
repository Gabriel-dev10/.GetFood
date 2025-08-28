'use client';

import { useState } from 'react';
import ListaProdutos from './ListaProdutos';

type Categoria = 'Café' | 'Lanches' | 'Salgados' | 'Bebidas' | 'Biscoitos' ;

export default function BarraHorizontal() {
  const categorias: Categoria[] = ['Café','Lanches', 'Salgados', 'Bebidas','Biscoitos'];
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<Categoria>('Café');

  return (
    <>
      <div className="overflow-x-auto whitespace-nowrap flex gap-4 my-4 px-1">
        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoriaSelecionada(cat)}
            className={`px-4 mb-2 py-2 rounded-full transition whitespace-nowrap ${
              categoriaSelecionada === cat
                ? 'bg-[#4E2010] text-[#DCBD8F] font-semibold'
                : 'bg-[#DCBD8F] border-1 border-[#4E2010] rounded-full text-[#4E2010]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <ListaProdutos categoria={categoriaSelecionada} />
    </>
  );
}
