# Sistema de Níveis Baseado em Conquistas

## 🎯 Visão Geral

Implementamos um sistema completo de níveis baseado em conquistas desbloqueadas, substituindo o antigo sistema de cupons. O nível do usuário agora é determinado pela quantidade de conquistas que ele completou.

## 📊 Estrutura de Níveis

### Nível 1: ☕ Cafézinho Casual
- **Conquistas necessárias:** 0 a 2
- **Cor da borda:** Marrom (#8B7355)
- **Efeito:** Borda sólida sem animação

### Nível 2: 🥐 Degustador de Sabores
- **Conquistas necessárias:** 3 a 5
- **Cor da borda:** Bege (#D4A574)
- **Efeito:** Borda sólida sem animação

### Nível 3: 🎯 Cliente de Ouro
- **Conquistas necessárias:** 6 a 9
- **Cor da borda:** Dourado (#FFD700)
- **Efeito:** Borda animada com pulse

### Nível 4: 🏆 Mestre do Expresso
- **Conquistas necessárias:** 10 a 14
- **Cor da borda:** Prateado (#C0C0C0)
- **Efeito:** Borda animada com pulse

### Nível 5: 🔥 Café Viciado
- **Conquistas necessárias:** 15+
- **Cor da borda:** Vermelho intenso (#FF4500)
- **Efeito:** Borda animada com pulse intenso
- **Badge:** "Nível Máximo Alcançado!"

## 🎨 Componentes Criados

### 1. `ProfileAvatar.tsx`
Componente reutilizável que exibe a foto do usuário com:
- Borda colorida baseada no nível
- Badge com número do nível
- Três tamanhos: small, medium, large
- Animações de hover e pulse
- Sombras coloridas matching com o nível

**Props:**
```typescript
{
  foto: string | null;
  nivel: number;
  size?: "small" | "medium" | "large";
  onClick?: () => void;
  showLevelBadge?: boolean;
  timestamp?: number;
}
```

### 2. `nivelSystem.ts`
Arquivo de utilitários com:
- `calcularNivel()`: Calcula nível baseado em conquistas
- `getBordaNivel()`: Retorna classes CSS da borda
- Interface `NivelInfo` com todas as informações do nível

**Retorno de `calcularNivel()`:**
```typescript
{
  nivel: number;
  titulo: string;
  emoji: string;
  cor: string;
  corBorda: string;
  gradiente: string;
  conquistasNecessarias: number;
  conquistasProximoNivel: number | null;
  progresso: number; // 0-100
}
```

## 📱 Onde o Sistema Aparece

### 1. Página de Perfil (`/perfil`)
- Avatar grande com borda animada
- Card mostrando nível atual e título
- Contador de conquistas desbloqueadas
- Barra de progresso para próximo nível
- Ícone Award indicando sistema de conquistas
- Badge especial quando atinge nível máximo

### 2. Página Inicial (`/`)
- Avatar pequeno no UserBadge
- Borda colorida com badge de nível
- Mesmo sistema de cores e animações

### 3. Navegação
- Presente em qualquer lugar que use o UserBadge
- Consistência visual em toda a aplicação

## 🔄 Integração

### Na Página de Perfil:
```typescript
const conquistasDesbloqueadas = conquistas.filter(c => c.desbloqueada).length;
const nivelInfo = calcularNivel(conquistasDesbloqueadas);

<ProfileAvatar
  foto={foto}
  nivel={nivelInfo.nivel}
  size="large"
  timestamp={timestamp}
/>
```

### No UserBadge:
```typescript
const [nivel, setNivel] = useState(1);

useEffect(() => {
  const fetchNivel = async () => {
    const response = await fetch('/api/conquistas');
    const conquistas = await response.json();
    const conquistasDesbloqueadas = conquistas.filter(c => c.desbloqueada).length;
    const nivelInfo = calcularNivel(conquistasDesbloqueadas);
    setNivel(nivelInfo.nivel);
  };
  fetchNivel();
}, []);
```

## ✨ Recursos Visuais

### Animações:
- **Pulse:** Níveis 3, 4 e 5 têm animação pulse na borda
- **Hover:** Escala 1.05 ao passar o mouse
- **Badge:** Animação spring ao aparecer
- **Barra de Progresso:** Animação suave de preenchimento

### Sombras:
- Cada nível tem sombra colorida matching
- Intensidade aumenta com o nível
- Efeito glow nos níveis mais altos

### Gradientes:
- Barras de progresso usam gradiente do nível
- Cores transitam suavemente
- Visual premium para níveis altos

## 🚀 Benefícios

1. **Engajamento:** Usuários querem desbloquear conquistas para subir de nível
2. **Visual Atrativo:** Bordas coloridas e animadas chamam atenção
3. **Gamificação:** Sistema de progressão claro e motivador
4. **Status:** Nível visível para todos incentiva competição saudável
5. **Consistência:** Mesmo visual em toda a aplicação

## 🔧 Manutenção

Para adicionar novos níveis, edite `nivelSystem.ts`:
1. Adicione novo objeto no array `niveis`
2. Defina min/max de conquistas
3. Escolha cores e gradiente
4. Sistema calcula automaticamente o progresso

Para mudar cores, edite:
- `nivelSystem.ts` para as definições
- `ProfileAvatar.tsx` para ajustes visuais
- Tailwind classes são geradas dinamicamente

## 📝 Notas Técnicas

- Sistema totalmente tipado com TypeScript
- Sem dependências externas além de Framer Motion
- Performance otimizada com memoization
- Responsive em todos os tamanhos de tela
- Acessibilidade considerada (alt texts, aria-labels)
