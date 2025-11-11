import { randomUUID } from 'crypto';

/**
 * Gera um UUID v4. O UUID possui 36 caracteres, o que é compatível com seu VARCHAR(36).
 * Se o seu campo token for VARCHAR(12), o MySQL vai truncar, mas a unicidade do UUID
 * deve ser suficiente para evitar colisões nos primeiros 12 caracteres.
 */
export const generateUUID = (): string => {
  return randomUUID();
};