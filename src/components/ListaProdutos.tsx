import React, { useState } from "react";
import Image from "next/image";
import ItensModal from "./ItensModal";
import {
  PRODUCT_IMAGE_SIZES,
  DEFAULT_IMAGE_QUALITY,
} from "@/utils/imageUtils";

/**
 * Tipos de categorias de produtos disponíveis.
 * @remarks
 * Usado para filtrar os produtos exibidos na lista.
 */
type Categoria = "Café" | "Lanches" | "Salgados" | "Bebidas" | "Biscoitos";

/**
 * Interface que representa um produto do cardápio.
 */
interface Produto {
  /** Nome do produto */
  nome: string;
  /** Descrição do produto */
  descricao: string;
  /** Preço do produto */
  preco: string;
  /** Caminho da imagem do produto */
  imagem: string;
}

/**
 * Propriedades do componente ListaProdutos.
 */
interface ListaProdutosProps {
  /** Categoria selecionada para exibição dos produtos */
  categoria: Categoria;
}

/**
 * Lista de produtos organizados por categoria.
 */
const produtos: Record<Categoria, Produto[]> = {
  Café: [
    {
      nome: "Café",
      descricao: "Um café preto clássico, feito com grãos selecionados e torrados na medida certa para um sabor encorpado e aroma irresistível.",
      preco: "R$ 5,00",
      imagem: "/Img/cafezes.jpg",
    },
    {
      nome: "Cappuccino",
      descricao: "Uma deliciosa combinação de café espresso, leite vaporizado e uma camada cremosa de espuma, polvilhada com chocolate em pó.",
      preco: "R$ 8,00",
      imagem: "/Img/capp.webp",
    },
  ],
  Lanches: [
    {
      nome: "Sanduíche Natural",
      descricao: "Um sanduíche leve e saudável, recheado com ingredientes frescos como alface, tomate, cenoura ralada e peito de peru.",
      preco: "R$ 17,00",
      imagem: "/Img/Sanduiche.jpg",
    },
    {
      nome: "Sanduíche Australiano",
      descricao: "Pão australiano macio, recheado com carne suculenta, queijo derretido e molho especial.",
      preco: "R$ 20,00",
      imagem: "/Img/sandA.jpg",
    },
    {
      nome: "Misto Quente",
      descricao: "Um clássico lanche quente com pão de forma crocante, queijo derretido e presunto.",
      preco: "R$ 18,00",
      imagem: "/Img/mistoquente.jpg",
    },
    {
      nome: "Queijo Quente",
      descricao: "Pão de forma tostado com uma generosa camada de queijo derretido, perfeito para qualquer momento do dia.",
      preco: "R$ 18,00",
      imagem: "/Img/queijo-quente.jpg",
    },
  ],
  Salgados: [
    {
      nome: "Italiano",
      descricao: "Um pão macio recheado com presunto, queijo e tomate, temperado com orégano e azeite.",
      preco: "R$ 8,00",
      imagem: "/Img/italiano.jpg",
    },
    {
      nome: "Coxinha",
      descricao: "Tradicional salgadinho brasileiro, com massa crocante e recheio cremoso de frango desfiado.",
      preco: "R$ 8,00",
      imagem: "/Img/coxinha.jpg",
    },
    {
      nome: "Kibe",
      descricao: "Delicioso bolinho de carne moída e trigo, temperado com ervas e frito até ficar crocante.",
      preco: "R$ 8,00",
      imagem: "/Img/KIBEFRITO.webp",
    },
    {
      nome: "Croissant",
      descricao: "Massa folhada leve e crocante, com recheio de queijo e presunto, perfeito para acompanhar um café.",
      preco: "R$ 10,00",
      imagem: "/Img/croissant.jpg",
    },
  ],
  Bebidas: [
    {
      nome: "Coca-Cola Lata",
      descricao: "Refrigerante clássico e refrescante, perfeito para acompanhar qualquer refeição.",
      preco: "R$ 6,00",
      imagem: "/Img/coca.jpg",
    },
    {
      nome: "Suco Natural de Laranja",
      descricao: "Suco fresco e natural, feito com laranjas selecionadas, rico em vitamina C.",
      preco: "R$ 7,50",
      imagem: "/Img/sucos.jpg",
    },
    {
      nome: "Água com Gás",
      descricao: "Água mineral levemente gaseificada, ideal para refrescar e acompanhar refeições.",
      preco: "R$ 4,00",
      imagem: "/Img/aguagas.jpg",
    },
    {
      nome: "Guaraná Antártica",
      descricao: "Refrigerante brasileiro feito com o autêntico sabor do guaraná, leve e refrescante.",
      preco: "R$ 6,00",
      imagem: "/Img/guarana.jpg",
    },
  ],
  Biscoitos: [
    {
      nome: "Doritos",
      descricao: "Tortilhas crocantes de milho com sabor intenso de queijo nacho, perfeitas para petiscar.",
      preco: "R$ 8,00",
      imagem: "/Img/doritos.jpg",
    },
    {
      nome: "Ruffles",
      descricao: "Batatas fritas onduladas com sabor clássico de churrasco, crocantes e deliciosas.",
      preco: "R$ 8,00",
      imagem: "/Img/ruffle.jpg",
    },
    {
      nome: "Cheetos",
      descricao: "Salgadinho de milho com sabor de queijo, leve e crocante, ideal para qualquer momento.",
      preco: "R$ 8,00",
      imagem: "/Img/cheetos.jpg",
    },
    {
      nome: "Torcida",
      descricao: "Salgadinho crocante com sabor de bacon, perfeito para acompanhar um refrigerante.",
      preco: "R$ 6,00",
      imagem: "/Img/torcida.jpg",
    },
  ],
};

/**
 * Componente que exibe a lista de produtos de acordo com a categoria selecionada.
 *
 * @param categoria - Categoria de produtos a ser exibida
 * @returns {JSX.Element} Lista de produtos filtrada
 */
export default function ListaProdutos({ categoria }: ListaProdutosProps) {
  const lista = produtos[categoria];
  const [showModal, setShowModal] = useState(false);
  const [selectedProduto, setSelectedProduto] = useState<Produto | null>(null);

  function openModal(item: Produto) {
    setSelectedProduto(item);
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setSelectedProduto(null);
  }

  if (lista.length === 0) {
    return (
      <p className="text-[#4E2010] text-center" role="alert">
        Nenhum item disponível nesta categoria.
      </p>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-4 max-w-6xl mx-auto w-full">
        {lista.map((item) => (
          <div
            key={item.nome}
            role="button"
            tabIndex={0}
            onClick={() => openModal(item)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") openModal(item);
            }}
            className="flex flex-row items-center rounded-2xl w-full overflow-hidden bg-[#E6C697] text-[#4E2010] shadow-[2px_2px_4px_rgba(0,0,0,0.45)] hover:shadow-lg transition-shadow cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#4E2010]/50"
          >
            <div className="relative w-40 h-40 flex-shrink-0">
              <Image
                src={item.imagem}
                alt={`Imagem do produto ${item.nome}`}
                fill
                sizes={PRODUCT_IMAGE_SIZES}
                quality={DEFAULT_IMAGE_QUALITY}
                className="object-cover"
                priority={false}
              />
            </div>

            <div className="p-4 flex flex-col justify-between w-full">
              <div className="space-y-2">
                <h2
                  className="font-bold text-xl"
                  aria-label={`Nome do produto: ${item.nome}`}
                >
                  {item.nome}
                </h2>
                <p
                  className="text-sm text-[#4E2010]/80 line-clamp-1"
                  aria-label={`Descrição: ${item.descricao}`}
                >
                  {item.descricao}
                </p>
              </div>
              <p
                className="text-lg font-extrabold mt-3"
                aria-label={`Preço: ${item.preco}`}
              >
                {item.preco}
              </p>
            </div>
          </div>
        ))}
      </div>

      <ItensModal show={showModal} produto={selectedProduto} onClose={closeModal} />
    </>
  );
}
