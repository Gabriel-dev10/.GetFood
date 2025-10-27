// app/login/redefinir-senha/page.tsx (NOVO ARQUIVO)

import { Suspense } from 'react';
import RedefinirSenhaClient from './RedefinirSenhaClient'; // Importando seu componente
import { Loader2 } from 'lucide-react'; // Usando um loader

/**
 * Componente de fallback (carregamento) para o Suspense.
 */
function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-6">
      <Loader2 className="animate-spin text-white" size={40} />
    </div>
  );
}

/**
 * Esta é a nova página (Server Component).
 * Ela "suspende" o carregamento do componente cliente,
 * permitindo que o Next.js faça o build corretamente.
 */
export default function RedefinirSenhaPage() {
  return (
    <Suspense fallback={<Loading />}>
      <RedefinirSenhaClient />
    </Suspense>
  );
}