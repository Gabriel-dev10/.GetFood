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
            className={`px-4 mb-2 py-2 rounded-full transition whitespace-nowrap ${
              categoriaSelecionada === cat
                ? "bg-[#4E2010] text-[#DCBD8F] font-semibold"
                : "bg-[#DCBD8F] border-1 border-[#4E2010] rounded-full text-[#4E2010]"
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
