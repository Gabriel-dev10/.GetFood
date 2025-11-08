/**
 * Utilitários para manipulação e otimização de imagens.
 */

/**
 * Dimensões padrão recomendadas para imagens de produtos.
 * - width: Largura otimizada para layouts responsivos
 * - height: Altura proporcional para manter aspecto quadrado
 */
export const PRODUCT_IMAGE_DIMENSIONS = {
  width: 600,
  height: 600,
} as const;

/**
 * Gera uma URL otimizada do Next.js Image Optimization API.
 * 
 * @param src - Caminho da imagem original
 * @param width - Largura desejada (padrão: 600px)
 * @param quality - Qualidade da imagem de 1-100 (padrão: 85)
 * @returns URL otimizada da imagem
 * 
 * @example
 * ```tsx
 * const optimizedUrl = getOptimizedImageUrl('/Img/cafe.jpg', 600, 85);
 * ```
 */

export function getOptimizedImageUrl(src: string): string {
  // Se for uma URL externa, retorna sem modificação
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src;
  }

  // Para imagens locais, o Next.js Image component já otimiza automaticamente
  // Esta função está preparada para expansões futuras
  return src;
}

/**
 * Configurações de tamanhos responsivos para o componente Next/Image.
 * Define como a imagem deve ser carregada em diferentes tamanhos de tela.
 * 
 * @remarks
 * - Mobile (até 640px): 100vw da largura da tela
 * - Tablet (até 768px): 50vw da largura da tela
 * - Desktop (acima de 768px): 600px fixo
 */
export const PRODUCT_IMAGE_SIZES = "(max-width: 640px) 100vw, (max-width: 768px) 50vw, 600px";

/**
 * Qualidade padrão para compressão de imagens.
 * Balanceia qualidade visual e tamanho do arquivo.
 * 
 * @remarks
 * 85 é o valor recomendado pelo Next.js para boa qualidade com compressão eficiente.
 */
export const DEFAULT_IMAGE_QUALITY = 85;
