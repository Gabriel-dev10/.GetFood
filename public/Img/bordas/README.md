# Bordas Customizadas de Níveis

## 🚀 Status Atual

**✅ Bordas SVG Ativas e Funcionando!**

O sistema está usando os SVGs criados que se adaptam perfeitamente a qualquer tamanho de tela.

### Como Funciona:
1. Foto do usuário fica no centro (com 16% de margem)
2. SVG da borda é sobreposto por cima
3. Badge de nível aparece no canto inferior direito
4. Tudo escala automaticamente

### Para Customizar:
- Edite os arquivos `.svg` nesta pasta
- Mantenha o `viewBox="0 0 300 300"`
- Deixe o centro transparente (sem círculo preenchido)
- Use cores e decorações à vontade
- O sistema aplica automaticamente

## 📝 Design Atual dos SVGs

**Nível 1 - Iniciante:**
- Anel duplo bronze (#8B7355, #6F5C45)
- 4 pontos decorativos nos cantos cardeais

**Nível 2 - Aprendiz:**
- Três anéis cobre/bege (#D4A574, #E8C4A0, #B8935F)
- Estrelas nos 4 pontos cardeais

**Nível 3 - Especialista:**
- Anéis dourados com efeito glow (#FFD700, #FFA500, #FFED4E)
- Diamantes nos pontos cardeais
- Partículas brilhantes nos cantos

**Nível 4 - Mestre:**
- Gradiente prateado (#C0C0C0, #E8E8E8, #FFFFFF)
- Efeito glow intenso
- Decorações tipo troféu

**Nível 5 - Lendário:**
- Gradiente de fogo (#FF4500, #FF6347, #DC143C)
- Glow vermelho intenso
- Chamas nos pontos cardeais
- Múltiplas partículas de fogo

## 💡 Substituir por PNG (Opcional)

Se preferir usar imagens PNG customizadas:
1. Crie PNG com fundo transparente (300x300px ou maior)
2. Mantenha centro vazio para a foto
3. Substitua os arquivos `.svg` por `.png` com mesmo nome
4. O sistema detectará automaticamente

## 📐 Especificações Técnicas

As bordas customizadas estão localizadas nesta pasta:

- `nivel-1.svg` - Borda para nível Iniciante (Bronze)
- `nivel-2.svg` - Borda para nível Aprendiz (Cobre/Bege)
- `nivel-3.svg` - Borda para nível Especialista (Ouro)
- `nivel-4.svg` - Borda para nível Mestre (Prata)
- `nivel-5.svg` - Borda para nível Lendário (Fogo)

## 🎨 Formato Atual

### SVG (Suportado e Ativo):
- **Formato:** SVG com viewBox="0 0 300 300"
- **Centro transparente:** Área circular no centro
- **Tamanho:** Escala automaticamente
- **Vantagens:** Qualidade perfeita em qualquer tamanho

### Para Substituir por PNG:
- **Tamanho único:** 300x300px a 500x500px
- **Formato:** PNG com canal alpha (transparência)
- **Centro transparente:** Aproximadamente 68% da área total
- **Compressão:** Máximo 200KB por imagem

### Design:
1. A borda deve ser **circular** ou ter formato que se adapte ao círculo
2. O **centro deve ser transparente** para mostrar a foto do usuário
3. A área transparente deve ocupar aproximadamente **84%** do centro (deixando 8% de margem em cada lado)
4. As bordas podem ter:
   - Efeitos de brilho
   - Partículas decorativas
   - Animações (se usar formato animado)
   - Gradientes

### Paleta de Cores Sugeridas:

**Nível 1 - Iniciante (Bronze):**
- Cor principal: #8B7355
- Destaques: #6F5C45

**Nível 2 - Aprendiz (Bege/Cobre):**
- Cor principal: #D4A574
- Destaques: #B8935F

**Nível 3 - Especialista (Ouro):**
- Cor principal: #FFD700
- Destaques: #FFA500
- Efeito: Brilho dourado

**Nível 4 - Mestre (Prata):**
- Cor principal: #C0C0C0
- Destaques: #E8E8E8
- Efeito: Reflexos metálicos

**Nível 5 - Lendário (Vermelho/Fogo):**
- Cor principal: #FF4500
- Destaques: #FF6347
- Efeito: Chamas, partículas de fogo

## 🖼️ Exemplo de Estrutura

```
bordas/
├── nivel-1.svg (Bronze simples)
├── nivel-2.svg (Cobre com pequeno brilho)
├── nivel-3.svg (Ouro com efeitos de luz)
├── nivel-4.svg (Prata com reflexos)
└── nivel-5.svg (Fogo com partículas animadas)
```

## 💡 Dicas de Design

1. **Mantenha consistência:** Todas as bordas devem seguir um estilo visual similar
2. **Evite muitos detalhes:** O foco deve ser na foto do usuário
3. **Use camadas:** Adicione profundidade com sombras e luzes
4. **Teste em fundos escuros:** O site usa fundo escuro, teste suas bordas nesse contexto
5. **Progressive enhancement:** Níveis superiores devem ser visivelmente mais impressionantes
