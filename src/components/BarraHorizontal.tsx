"use client";

import { useState } from "react";

import ListaProdutos from "./ListaProdutos";

/**
 * Tipos de categorias de produtos disponíveis.
 * @remarks
 * Usado para filtrar os produtos exibidos na barra horizontal.
 */
type Categoria = "Café" | "Lanches" | "Salgados" | "Bebidas" | "Biscoitos";

/**
 * Componente de barra horizontal para seleção de categorias de produtos.
 *
 * Permite ao usuário filtrar produtos por categoria e exibe a lista correspondente.
 *
 * @returns {JSX.Element} Elemento da barra horizontal de categorias
 */
export default function BarraHorizontal() {
  /**
   * Lista de categorias disponíveis.
   */
  const categorias: Categoria[] = [
    "Café",
    "Lanches",
    "Salgados",
    "Bebidas",
    "Biscoitos",
  ];
  /**
   * Categoria atualmente selecionada pelo usuário.
   */
  const [categoriaSelecionada, setCategoriaSelecionada] =
    useState<Categoria>("Café");

  return (
    <>
      <div className="overflow-x-auto whitespace-nowrap flex gap-4 my-4 px-1">
        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoriaSelecionada(cat)}
            className={`px-4 mb-2 py-2 rounded-full transition whitespace-nowrap
              ${
                categoriaSelecionada === cat
                  ? "bg-[#4E2010] text-[#DCBD8F] font-semibold shadow-[3px_3px_6px_rgba(0,0,0,0.95)]"
                  : "bg-[#DCBD8F] border border-[#4E2010] text-[#4E2010] shadow-[2px_2px_4px_rgba(0,0,0,0.55)]"
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
