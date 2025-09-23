import Image from "next/image";

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
      descricao: "Especificações do produto",
      preco: "R$ 5,00",
      imagem: "/Img/cafe-preto.webp",
    },
    {
      nome: "Cappuccino",
      descricao: "Especificações do produto",
      preco: "R$ 8,00",
      imagem: "/Img/capp.webp",
    },
  ],
  Lanches: [
    {
      nome: "Sanduiche Natural",
      descricao: "Especificações do produto",
      preco: "R$ 17,00",
      imagem: "/Img/Sanduiche.jpg",
    },
    {
      nome: "Sanduiche Natural Australiano",
      descricao: "Especificações do produto",
      preco: "R$ 20,00",
      imagem: "/Img/sandA.jpg",
    },
    {
      nome: "Misto Quente",
      descricao: "Especificações do produto",
      preco: "R$ 18,00",
      imagem: "/Img/mistoquente.jpg",
    },
    {
      nome: "Queijo Quente",
      descricao: "Especificações do produto",
      preco: "R$ 18,00",
      imagem: "/Img/queijo-quente.jpg",
    },
  ],
  Salgados: [
    {
      nome: "Italiano",
      descricao: "Especificações do produto",
      preco: "R$ 8,00",
      imagem: "/Img/italiano.jpg",
    },
    {
      nome: "Coxinha",
      descricao: "Especificações do produto",
      preco: "R$ 8,00",
      imagem: "/Img/coxinha.jpg",
    },
    {
      nome: "Kibe",
      descricao: "Especificações do produto",
      preco: "R$ 8,00",
      imagem: "/Img/KIBEFRITO.webp",
    },
    {
      nome: "Croissant",
      descricao: "Especificações do produto",
      preco: "R$ 10,00",
      imagem: "/Img/croissant.jpg",
    },
  ],
  Bebidas: [
    {
      nome: "Coca-Cola Lata",
      descricao: "Especificações do produto",
      preco: "R$ 6,00",
      imagem: "/Img/coca.jpg",
    },
    {
      nome: "Suco Natural de Laranja",
      descricao: "Especificações do produto",
      preco: "R$ 7,50",
      imagem: "/Img/sucolaranja.jpg",
    },
    {
      nome: "Água com Gás",
      descricao: "Especificações do produto",
      preco: "R$ 4,00",
      imagem: "/Img/aguagas.jpg",
    },
    {
      nome: "Guaraná Antártica",
      descricao: "Especificações do produto",
      preco: "R$ 6,00",
      imagem: "/Img/guarana.jpg",
    },
  ],
  Biscoitos: [
    {
      nome: "Doritos",
      descricao: "Especificações do produto",
      preco: "R$ 8,00",
      imagem: "/Img/doritos.jpg",
    },
    {
      nome: "Ruffles",
      descricao: "Especificações do produto",
      preco: "R$ 8,00",
      imagem: "/Img/ruffle.jpg",
    },
    {
      nome: "Cheetos",
      descricao: "Especificações do produto",
      preco: "R$ 8,00",
      imagem: "/Img/cheetos.jpg",
    },
    {
      nome: "Torcida",
      descricao: "Especificações do produto",
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

  if (lista.length === 0) {
    return (
      <p className="text-[#4E2010]">Nenhum item disponível nesta categoria.</p>
    );
  }

  return (
    <div className="flex flex-col gap-4 max-w-6xl mx-auto w-full">
      {lista.map((item) => (
        <div
          key={item.nome}
          className="flex flex-row items-center rounded-2xl w-full overflow-hidden bg-[#E6C697] text-[#4E2010] shadow-[2px_2px_4px_rgba(0,0,0,0.45)]"
        >
          <div className="relative w-43 h-41 sm:w-32 sm:h-32 md:w-40 md:h-40 flex-shrink-0">
            <Image
              src={item.imagem}
              alt={`Imagem do produto ${item.nome}`}
              fill
              className="object-cover"
            />
          </div>

          <div className="p-4 flex flex-col justify-between w-full">
            <div>
              <h2 className="font-bold text-xl">{item.nome}</h2>
              <p className="text-sm text-[#4E2010]/80 line-clamp-2">
                {item.descricao}
              </p>
            </div>
            <p className="text-lg font-extrabold mt-2">{item.preco}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
