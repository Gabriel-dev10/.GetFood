# Sistema de Conquistas - Guia de Implementação Backend

## 📋 Visão Geral

Sistema de conquistas automáticas que devem ser desbloqueadas conforme o usuário realiza ações no aplicativo.

## 🎯 Conquistas Implementadas (Frontend)

### Lista Completa (13 conquistas):

#### QR Code Scans (5 conquistas)
1. **Escaneie seu primeiro QR Code** 
   - Ícone: `Coffee`
   - Critério: 1 QR Code escaneado
   
2. **Escaneie 5 QR Codes**
   - Ícone: `QrCode`
   - Critério: 5 QR Codes escaneados
   
3. **Escaneie 10 QR Codes**
   - Ícone: `Scan`
   - Critério: 10 QR Codes escaneados
   
4. **Escaneie 25 QR Codes**
   - Ícone: `Medal`
   - Critério: 25 QR Codes escaneados
   
5. **Escaneie 50 QR Codes**
   - Ícone: `Trophy`
   - Critério: 50 QR Codes escaneados

#### Resgates (4 conquistas)
6. **Resgate sua primeira recompensa**
   - Ícone: `Gift`
   - Critério: 1 resgate realizado
   
7. **Resgate 5 recompensas**
   - Ícone: `Package`
   - Critério: 5 resgates realizados
   
8. **Resgate 10 recompensas**
   - Ícone: `ShoppingBag`
   - Critério: 10 resgates realizados
   
9. **Resgate 20 recompensas**
   - Ícone: `Award`
   - Critério: 20 resgates realizados

#### Pontos Acumulados (4 conquistas)
10. **Acumule 100 pontos**
    - Ícone: `Coins`
    - Critério: 100 pontos acumulados (histórico total)
    
11. **Acumule 250 pontos**
    - Ícone: `Wallet`
    - Critério: 250 pontos acumulados
    
12. **Acumule 500 pontos**
    - Ícone: `DollarSign`
    - Critério: 500 pontos acumulados
    
13. **Acumule 1000 pontos**
    - Ícone: `Flame`
    - Critério: 1000 pontos acumulados

## 🔧 Arquivos Atuais

### Frontend
- `src/app/perfil/page.tsx` - Página de perfil que exibe as conquistas
- `src/components/ConquistasList.tsx` - Componente visual das conquistas
- `src/utils/nivelSystem.ts` - Sistema de níveis baseado em conquistas

### Backend (Stubs prontos)
- `src/app/api/conquistas/route.ts` - GET endpoint (retorna lista hardcoded)
- `src/app/api/conquistas/desbloquear/route.ts` - POST endpoint (stub vazio)

## 🚀 Como Implementar o Backend

### Passo 1: Estrutura do Banco de Dados

Você precisará de 3 tabelas (provavelmente já existem):

```sql
-- Tabela de conquistas
CREATE TABLE conquistas (
  id INT PRIMARY KEY AUTO_INCREMENT,
  titulo VARCHAR(100) NOT NULL,
  descricao VARCHAR(255) NOT NULL,
  icone VARCHAR(50) NOT NULL,
  ativo BOOLEAN DEFAULT TRUE,
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de relação usuário-conquista
CREATE TABLE usuarios_conquistas (
  id INT PRIMARY KEY AUTO_INCREMENT,
  usuario_id INT NOT NULL,
  conquista_id INT NOT NULL,
  desbloqueada BOOLEAN DEFAULT FALSE,
  data_desbloqueio TIMESTAMP NULL,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
  FOREIGN KEY (conquista_id) REFERENCES conquistas(id),
  UNIQUE KEY unique_usuario_conquista (usuario_id, conquista_id)
);

-- Tabelas de rastreamento (provavelmente já existem)
-- qr_scans: registra cada scan de QR Code
-- atividades_usuario: registra atividades incluindo resgates e pontos ganhos
```

### Passo 2: Popular Conquistas no Banco

```sql
INSERT INTO conquistas (titulo, descricao, icone) VALUES
('Escaneie seu primeiro QR Code', 'Faça seu primeiro scan de QR Code', 'Coffee'),
('Resgate sua primeira recompensa', 'Resgate sua primeira recompensa no sistema', 'Gift'),
('Escaneie 5 QR Codes', 'Escaneie 5 QR Codes diferentes', 'QrCode'),
('Escaneie 10 QR Codes', 'Escaneie 10 QR Codes diferentes', 'Scan'),
('Resgate 5 recompensas', 'Resgate 5 recompensas no sistema', 'Package'),
('Acumule 100 pontos', 'Acumule 100 pontos no total', 'Coins'),
('Resgate 10 recompensas', 'Resgate 10 recompensas no sistema', 'ShoppingBag'),
('Escaneie 25 QR Codes', 'Escaneie 25 QR Codes diferentes', 'Medal'),
('Acumule 250 pontos', 'Acumule 250 pontos no total', 'Wallet'),
('Resgate 20 recompensas', 'Resgate 20 recompensas no sistema', 'Award'),
('Escaneie 50 QR Codes', 'Escaneie 50 QR Codes diferentes', 'Trophy'),
('Acumule 500 pontos', 'Acumule 500 pontos no total', 'DollarSign'),
('Acumule 1000 pontos', 'Acumule 1000 pontos no total', 'Flame');
```

### Passo 3: Implementar GET /api/conquistas

Substituir o conteúdo hardcoded por query ao banco:

```typescript
// Buscar usuário
const usuario = await prisma.usuarios.findUnique({
  where: { email: session.user.email },
  select: { id: true },
});

// Buscar todas as conquistas com status do usuário
const conquistas = await prisma.conquistas.findMany({
  where: { ativo: true },
  include: {
    usuarios_conquistas: {
      where: { usuario_id: usuario.id },
    },
  },
  orderBy: { id: 'asc' },
});

// Formatar resposta
return conquistas.map(c => ({
  id: c.id,
  titulo: c.titulo,
  descricao: c.descricao,
  icone: c.icone,
  desbloqueada: c.usuarios_conquistas[0]?.desbloqueada || false,
  data_desbloqueio: c.usuarios_conquistas[0]?.data_desbloqueio || null,
}));
```

### Passo 4: Implementar POST /api/conquistas/desbloquear

Este é o endpoint principal que verifica e desbloqueia automaticamente:

```typescript
export async function POST() {
  // 1. Autenticar usuário
  const session = await getServerSession();
  const usuario = await prisma.usuarios.findUnique({
    where: { email: session.user.email }
  });

  // 2. Calcular estatísticas do usuário
  const stats = {
    totalQrScans: await prisma.qr_scans.count({
      where: { usuario_id: usuario.id }
    }),
    
    totalResgates: await prisma.atividades_usuario.count({
      where: { 
        usuario_id: usuario.id,
        tipo_atividade: 'resgate' // Ajustar conforme seu schema
      }
    }),
    
    totalPontosAcumulados: (await prisma.atividades_usuario.aggregate({
      where: { usuario_id: usuario.id },
      _sum: { pontos_ganhos: true }
    }))._sum.pontos_ganhos || 0
  };

  // 3. Buscar todas as conquistas
  const conquistas = await prisma.conquistas.findMany({
    where: { ativo: true }
  });

  // 4. Para cada conquista, verificar se deve ser desbloqueada
  for (const conquista of conquistas) {
    // Verificar se já está desbloqueada
    const jaDesbloqueada = await prisma.usuarios_conquistas.findUnique({
      where: {
        usuario_id_conquista_id: {
          usuario_id: usuario.id,
          conquista_id: conquista.id
        }
      }
    });

    if (jaDesbloqueada?.desbloqueada) continue;

    // Lógica de verificação baseada no título
    let deveDesbloquear = false;
    const titulo = conquista.titulo.toLowerCase();

    if (titulo.includes('escaneie')) {
      const match = titulo.match(/\d+/);
      const quantidade = match ? parseInt(match[0]) : 1;
      deveDesbloquear = stats.totalQrScans >= quantidade;
    } 
    else if (titulo.includes('resgate')) {
      const match = titulo.match(/\d+/);
      const quantidade = match ? parseInt(match[0]) : 1;
      deveDesbloquear = stats.totalResgates >= quantidade;
    }
    else if (titulo.includes('acumule')) {
      const match = titulo.match(/\d+/);
      const pontos = match ? parseInt(match[0]) : 0;
      deveDesbloquear = stats.totalPontosAcumulados >= pontos;
    }

    // Se deve desbloquear, criar/atualizar registro
    if (deveDesbloquear) {
      await prisma.usuarios_conquistas.upsert({
        where: {
          usuario_id_conquista_id: {
            usuario_id: usuario.id,
            conquista_id: conquista.id
          }
        },
        create: {
          usuario_id: usuario.id,
          conquista_id: conquista.id,
          desbloqueada: true,
          data_desbloqueio: new Date()
        },
        update: {
          desbloqueada: true,
          data_desbloqueio: new Date()
        }
      });
    }
  }

  return NextResponse.json({ success: true });
}
```

### Passo 5: Chamar Automaticamente

O frontend já está configurado para chamar `/api/conquistas/desbloquear` automaticamente quando:
- Usuário acessa a página de perfil
- Pontos do usuário mudam (useEffect dependency)

## 📊 Fluxo de Funcionamento

```
1. Usuário escaneia QR Code
   ↓
2. Sistema registra em qr_scans + adiciona pontos em atividades_usuario
   ↓
3. Usuário acessa página de perfil
   ↓
4. Frontend chama POST /api/conquistas/desbloquear
   ↓
5. Backend calcula estatísticas e desbloqueia conquistas automaticamente
   ↓
6. Frontend chama GET /api/conquistas
   ↓
7. Interface exibe conquistas atualizadas
```

## 🎨 Interface

### Seções
- **Disponíveis**: Conquistas ainda não completadas (mostradas em cinza/opacidade reduzida)
- **Concluídas**: Conquistas desbloqueadas (mostradas em cores vibrantes com data)

### Comportamento
- Expansível: Mostra 6 por padrão, botão "Ver Todas" para expandir
- Animações: Hover effects e transições suaves
- Sistema de níveis: Calculado baseado no número de conquistas desbloqueadas

## 🔍 Tabelas Necessárias

Certifique-se que existem:
- `qr_scans` - Para rastrear escaneios de QR Code
- `atividades_usuario` - Para rastrear resgates e pontos
  - Campo `tipo_atividade` deve ter valor 'resgate' para resgates
  - Campo `pontos_ganhos` deve registrar pontos de cada atividade

## ⚠️ Importante

1. **Pontos Acumulados**: Use a SOMA HISTÓRICA de `atividades_usuario.pontos_ganhos`, não o saldo atual (`usuarios.pontos_total`), pois o usuário pode gastar pontos.

2. **Títulos Exatos**: A lógica de verificação usa o título da conquista. Certifique-se que os títulos no banco são EXATAMENTE como definidos neste documento.

3. **Performance**: Considere criar índices nas tabelas:
   ```sql
   CREATE INDEX idx_usuario_conquistas ON usuarios_conquistas(usuario_id, desbloqueada);
   CREATE INDEX idx_qr_scans_usuario ON qr_scans(usuario_id);
   CREATE INDEX idx_atividades_tipo ON atividades_usuario(usuario_id, tipo_atividade);
   ```

## 🧪 Testando

1. Crie um usuário de teste
2. Registre alguns QR scans manualmente no banco
3. Acesse a página de perfil
4. Verifique se as conquistas desbloqueiam automaticamente
5. Teste todos os tipos (scans, resgates, pontos)

---

**Versão**: 1.0  
**Status**: Frontend completo, Backend preparado para implementação  
**Data**: 10/11/2025
