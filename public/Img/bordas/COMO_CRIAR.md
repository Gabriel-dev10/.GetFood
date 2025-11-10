# 🎨 Como Criar Suas Bordas de Nível

## Passo a Passo no Photoshop/Figma

### 1️⃣ Criar Novo Documento
- **Tamanho:** 400x400px (ou maior, múltiplo de 100)
- **Resolução:** 150 DPI
- **Modo de cor:** RGB
- **Fundo:** Transparente ✅

### 2️⃣ Estrutura da Borda

```
┌─────────────────────────┐
│  Borda Decorativa       │  ← Sua arte aqui
│  ┌─────────────────┐    │
│  │                 │    │
│  │   TRANSPARENTE  │    │  ← Centro vazio (foto do usuário)
│  │                 │    │
│  └─────────────────┘    │
│                         │
└─────────────────────────┘
```

### 3️⃣ Dimensões Críticas

Para imagem 400x400px:
- **Centro transparente:** 288x288px (círculo centralizado)
- **Margem da borda:** 56px de cada lado (14% da largura total)

Fórmula: Centro = 72% do total

### 4️⃣ Camadas Sugeridas

```
Camada 5: Efeitos externos (partículas, brilho)
Camada 4: Borda externa principal
Camada 3: Detalhes decorativos
Camada 2: Borda interna (opcional)
Camada 1: Guia do círculo interno (deletar antes de exportar)
```

### 5️⃣ Guia Visual (Criar e depois deletar)

1. Crie um círculo de 288x288px no centro (serve como guia)
2. Pinte de vermelho ou qualquer cor chamativa
3. Crie sua borda AO REDOR desse círculo
4. **ANTES DE EXPORTAR:** Delete ou deixe invisível a camada guia
5. O centro deve ficar 100% transparente

### 6️⃣ Estilos por Nível

#### Nível 1 - Iniciante (Bronze)
- Cores: #8B7355, #6F5C45
- Estilo: Simples, anel duplo
- Efeitos: Sombra suave
- Decorações: Pontos ou pequenas estrelas

#### Nível 2 - Aprendiz (Cobre/Bege)
- Cores: #D4A574, #B8935F, #E8C4A0
- Estilo: Anel triplo com ornamentos
- Efeitos: Brilho discreto
- Decorações: Estrelas nos 4 cantos

#### Nível 3 - Especialista (Ouro)
- Cores: #FFD700, #FFA500, #FFED4E
- Estilo: Ornamentado com detalhes
- Efeitos: Outer glow dourado
- Decorações: Diamantes, partículas brilhantes

#### Nível 4 - Mestre (Prata)
- Cores: #C0C0C0, #E8E8E8, #FFFFFF
- Estilo: Elegante e metálico
- Efeitos: Reflexos, gradiente metálico
- Decorações: Formas geométricas, troféu

#### Nível 5 - Lendário (Fogo)
- Cores: #FF4500, #FF6347, #DC143C
- Estilo: Intenso e dinâmico
- Efeitos: Glow vermelho/laranja intenso
- Decorações: Chamas, partículas de fogo, energia

### 7️⃣ Exportar

**Photoshop:**
1. File → Export → Export As
2. Formato: PNG
3. ✅ Transparency
4. ❌ Interlaced
5. Compressão: 75-85%
6. Salvar como `nivel-X.png`

**Figma:**
1. Selecione todas as camadas (exceto guia)
2. Export → PNG
3. 2x ou 3x para qualidade
4. Download
5. Renomear para `nivel-X.png`

### 8️⃣ Otimização

Use [TinyPNG](https://tinypng.com/) para comprimir:
- Meta: < 150KB por imagem
- Qualidade: Manter transparência
- Compressão: 70-80%

### 9️⃣ Testar

1. Salve as imagens em `public/Img/bordas/`
2. Nomes: `nivel-1.png`, `nivel-2.png`, etc.
3. Ative no código (veja README.md)
4. Teste no navegador

## 💡 Dicas Pro

1. **Use formas vetoriais** no Photoshop/Figma para bordas mais nítidas
2. **Layer styles são seus amigos:** Outer Glow, Drop Shadow, Stroke
3. **Teste em fundo escuro:** O site usa `bg-[#C9A882]` e `black/50`
4. **Considere animação futura:** Mantenha elementos separados em camadas
5. **Mantenha consistência:** Todas as bordas devem ter estilo similar
6. **Progressive enhancement:** Cada nível deve ser visivelmente mais impressionante

## 🎯 Checklist Final

- [ ] Imagem 400x400px ou maior
- [ ] Formato PNG com transparência
- [ ] Centro completamente transparente (círculo ~72%)
- [ ] Cores matching com o tema do nível
- [ ] Testado em fundo escuro
- [ ] Tamanho < 150KB
- [ ] Nomeado corretamente (`nivel-1.png` a `nivel-5.png`)
- [ ] Copiado para `/public/Img/bordas/`
- [ ] Código ativado (`usarBordaCustomizada={true}`)
- [ ] Testado no navegador

## 📦 Recursos Úteis

- **Ícones gratuitos:** [Flaticon](https://flaticon.com), [Icons8](https://icons8.com)
- **Texturas:** [Textures.com](https://textures.com)
- **Compressão:** [TinyPNG](https://tinypng.com), [Squoosh](https://squoosh.app)
- **Inspiração:** Dribbble, Behance (buscar "level border", "rank badge")

## ❓ Problemas Comuns

**Borda não aparece:**
- Verifique se `usarBordaCustomizada={true}`
- Confirme o nome do arquivo
- Limpe o cache do navegador (Ctrl+Shift+R)

**Centro não transparente:**
- Verifique se deletou a camada guia
- Confirme que salvou com transparência
- Teste abrindo o PNG em um visualizador

**Borda cortada:**
- Aumente o tamanho da imagem
- Reduza decorações nas bordas
- Deixe margem de segurança de 5%

**Qualidade ruim:**
- Exporte em resolução maior (800x800px)
- Use shapes vetoriais ao invés de rasterizadas
- Evite compressão muito agressiva
