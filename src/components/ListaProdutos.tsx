import Image from 'next/image';

type Categoria = 'Café' | 'Lanches' | 'Salgados' | 'Bebidas' | 'Biscoitos';

interface Produto {
  nome: string;
  descricao: string;
  preco: string;
  imagem: string;
}

interface ListaProdutosProps {
  categoria: Categoria;
}

const produtos: Record<Categoria, Produto[]> = {
  Café: [
    {
      nome: 'Café',
      descricao: 'Especificações do produto',
      preco: 'R$ 5,00',
      imagem: '/Img/cafepreto.jpg',
    },
    {
      nome: 'Cappuccino',
      descricao: 'Especificações do produto',
      preco: 'R$ 8,00',
      imagem: '/Img/cappo.jpg',
    },
    ],
  Lanches: [
    {
      nome: 'Sanduiche Natural',
      descricao: 'Especificações do produto',
      preco: 'R$ 17,00',
      imagem: '/Img/Sanduiche.jpg',
    },
    {
      nome: 'Sanduiche Natural Australiano',
      descricao: 'Especificações do produto',
      preco: 'R$ 20,00',
      imagem: '/Img/Sanduiche-Astraliano.jpg',
    },
      {
    nome: 'Misto Quente',
    descricao: 'Especificações do produto',
    preco: 'R$ 18,00',
    imagem: '/Img/mistoquente.jpg',
  },
  {
    nome: 'Queijo Quente',
    descricao: 'Especificações do produto',
    preco: 'R$ 18,00',
    imagem: '/Img/queijoquente.jpg',
  },
  ],
  Salgados: [
    {
      nome: 'Italiano',
      descricao: 'Especificações do produto',
      preco: 'R$ 8,00',
      imagem: '/Img/italiano.jpg',
    },
    {
      nome: 'Coxinha',
      descricao: 'Especificações do produto',
      preco: 'R$ 8,00',
      imagem: '/Img/coxinha.jpg',
    },
    {
      nome: 'Kibe',
      descricao: 'Especificações do produto',
      preco: 'R$ 8,00',
      imagem: '/Img/kibe.jpg',
    },
    {
      nome: 'Croissant',
      descricao: 'Especificações do produto',
      preco: 'R$ 10,00',
      imagem: '/Img/croissant.jpg',
    },
  ],
  Bebidas: [
    {
      nome: 'Coca-Cola Lata',
      descricao: 'Especificações do produto',
      preco: 'R$ 6,00',
      imagem: '/Img/coca.jpg',
    },
    {
      nome: 'Suco Natural de Laranja',
      descricao: 'Especificações do produto',
      preco: 'R$ 7,50',
      imagem: '/Img/sucolaranja.jpg',
    },
    {
      nome: 'Água com Gás',
      descricao: 'Especificações do produto',
      preco: 'R$ 4,00',
      imagem: '/Img/aguagas.jpg',
    },
    {
      nome: 'Guaraná Antártica',
      descricao: 'Especificações do produto',
      preco: 'R$ 6,00',
      imagem: '/Img/guarana.jpg',
    },
  ],
  Biscoitos: [
    {
      nome: 'Doritos',
      descricao: 'Especificações do produto',
      preco: 'R$ 8,00',
      imagem: '/Img/doritos.jpg',
    },
    {
      nome: 'Ruffles',
      descricao: 'Especificações do produto',
      preco: 'R$ 8,00',
      imagem: '/Img/ruffle.jpg',
    },
    {
      nome: 'Cheetos',
      descricao: 'Especificações do produto',
      preco: 'R$ 8,00',
      imagem: '/Img/cheetos.jpg',
    },
    {
      nome: 'Torcida',
      descricao: 'Especificações do produto',
      preco: 'R$ 6,00',
      imagem: '/Img/torcida.jpg',
    },
  ],
};


export default function ListaProdutos({ categoria }: ListaProdutosProps) {
  const lista = produtos[categoria];

  if (lista.length === 0) {
    return <p className="text-white">Nenhum item disponível nesta categoria.</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      {lista.map((item) => (
        <div
          key={item.nome}
          className="flex flex-col sm:flex-row rounded-xl overflow-hidden bg-white text-black shadow-md"
        >
          <div className="relative w-full sm:w-32 h-40 sm:h-32">
            <Image
              src={item.imagem}
              alt={`Imagem do produto ${item.nome}`}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-3 flex flex-col justify-between">
            <div>
              <h2 className="font-bold">{item.nome}</h2>
              <p className="text-sm text-gray-700">{item.descricao}</p>
            </div>
            <p className="text-base font-semibold">{item.preco}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
