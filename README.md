# .GetFood

> Sistema de pedidos e fidelidade para restaurantes, feito com Next.js, TypeScript e Prisma.

## 🚀 Instalação

```bash
git clone https://github.com/Gabriel-dev10/.GetFood.git
cd .GetFood
npm install
```

## 🏃 Rodando o projeto

```bash
npm run dev
```

Acesse em [http://localhost:3000](http://localhost:3000)

## 📄 Gerando documentação

```bash
npm run docs
```

Acesse a documentação em `/docs/index.html`.

## 🧹 Rodando o lint

```bash
npm run lint
```

## 🛠️ Tecnologias

- Next.js
- TypeScript
- Prisma
- ESLint
- TSDoc/TypeDoc

## 📝 Como comentar usando TSDoc

Para documentar o código, utilize o padrão TSDoc acima de funções, componentes, tipos e variáveis importantes. Exemplos:

### Função simples

```typescript
/**
 * Soma dois números.
 * @param a - Primeiro número
 * @param b - Segundo número
 * @returns A soma de a e b
 */
function soma(a: number, b: number): number {
  return a + b;
}
```

### Componente React

```typescript
/**
 * Componente de botão customizado.
 * @param label - Texto do botão
 * @returns {JSX.Element} Elemento do botão
 */
export function Botao({ label }: { label: string }) {
  return <button>{label}</button>;
}
```

### Interface ou tipo

```typescript
/**
 * Representa um produto do cardápio.
 */
interface Produto {
  nome: string;
  preco: number;
}
```

**Dica:** Sempre explique o propósito, os parâmetros e o retorno das funções/componentes. Isso facilita a manutenção e a geração de documentação automática.
