import Image from 'next/image';

type Categoria = 'Lanches' | 'Salgados' | 'Biscoitos' | 'Bebidas' | 'Cervejas';

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
  Lanches: [
    {
      nome: 'croissant',
      descricao: 'delicioso croissant com queijo e presunto',
      preco: 'R$ 6,00',
      imagem: '/img/salgado1.png',
    },
    {
      nome: 'Mussarela',
      descricao: 'queijo mussarela, orégano e tomate',
      preco: 'R$ 52,00',
      imagem: '/Img/pizzamussarela.jpg',
    },
      {
    nome: 'Calabresa',
    descricao: 'calabresa fatiada, cebola roxa e orégano',
    preco: 'R$ 58,00',
    imagem: '/Img/pizzacalabresa.jpg',
  },
  {
    nome: 'Quatro Queijos',
    descricao: 'mussarela, provolone, parmesão e gorgonzola',
    preco: 'R$ 62,00',
    imagem: '/Img/pizza4queijo.jpg',
  },
  ],
  Salgados: [
    {
      nome: 'Feijoada',
      descricao: 'com arroz, farofa e couve',
      preco: 'R$ 35,00',
      imagem: '/Img/feijoada.jpg',
    },
    {
      nome: 'Estrogonofe de Frango',
      descricao: 'com arroz branco e batata palha',
      preco: 'R$ 32,00',
      imagem: '/Img/strogonoff.jpg',
    },
    {
      nome: 'Lasanha à Bolonhesa',
      descricao: 'massa fresca com molho bolonhesa e queijo gratinado',
      preco: 'R$ 39,00',
      imagem: '/Img/lasanha.jpg',
    },
    {
      nome: 'Prato Executivo',
      descricao: 'bife grelhado, arroz, feijão e batata frita',
      preco: 'R$ 29,00',
      imagem: '/Img/pratoexecutivo.jpg',
    },
  ],
  Biscoitos: [
    {
      nome: 'Coca-Cola Lata',
      descricao: 'Refrigerante 350ml',
      preco: 'R$ 6,00',
      imagem: '/Img/cocacola.jpg',
    },
    {
      nome: 'Suco Natural de Laranja',
      descricao: '300ml, feito na hora',
      preco: 'R$ 7,50',
      imagem: '/Img/sucolaranja.jpg',
    },
    {
      nome: 'Água com Gás',
      descricao: 'Garrafa 500ml',
      preco: 'R$ 4,00',
      imagem: '/Img/aguagas.jpg',
    },
    {
      nome: 'Guaraná Antártica',
      descricao: 'Refrigerante 350ml',
      preco: 'R$ 6,00',
      imagem: '/Img/guarana.jpg',
    },
  ],
  Bebidas: [
    {
      nome: 'Pudim de Leite',
      descricao: 'clássico pudim com calda de caramelo',
      preco: 'R$ 9,00',
      imagem: '/pudim.jpg',
    },
    {
      nome: 'Brownie com Sorvete',
      descricao: 'brownie de chocolate com bola de sorvete',
      preco: 'R$ 12,00',
      imagem: '/brownie.jpg',
    },
    {
      nome: 'Mousse de Maracujá',
      descricao: 'mousse leve e cremosa',
      preco: 'R$ 8,00',
      imagem: '/mousse.jpg',
    },
    {
      nome: 'Torta de Limão',
      descricao: 'com merengue gratinado',
      preco: 'R$ 10,00',
      imagem: '/torta-limao.jpg',
    },
  ],
  Cervejas: [
    {
      nome: 'Batata Frita',
      descricao: 'porção média com sal e ervas',
      preco: 'R$ 14,00',
      imagem: '/batata-frita.jpg',
    },
    {
      nome: 'Anéis de Cebola',
      descricao: 'crocantes e dourados',
      preco: 'R$ 13,00',
      imagem: '/aneis-cebola.jpg',
    },
    {
      nome: 'Farofa de Bacon',
      descricao: 'farofa crocante com bacon artesanal',
      preco: 'R$ 7,00',
      imagem: '/farofa.jpg',
    },
    {
      nome: 'Salada Verde',
      descricao: 'alface, rúcula e tomate cereja',
      preco: 'R$ 9,00',
      imagem: '/salada.jpg',
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
