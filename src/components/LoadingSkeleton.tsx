"use client";

/**
 * Skeleton simples para header: spinner + bloco de texto animado.
 * Use no lugar do ícone enquanto `useSession` retorna status "loading".
 */
export default function LoadingSkeleton() {
  return (
    <div className="flex items-center gap-2">
      {/* spinner circular pequeno */}
      <div className="w-7 h-7 rounded-full border-2 border-t-transparent border-[#4E2010] animate-spin" />

      {/* bloco de texto curto com pulse */}
      <div className="w-14 h-3 bg-zinc-700 rounded animate-pulse" />
    </div>
  );
}
