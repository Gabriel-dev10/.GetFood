// src/app/page.tsx (NOVO ARQUIVO)

import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import InicioClient from './InicioClient'; // Importando seu componente renomeado

/**
 * Componente de fallback (carregamento) para o Suspense.
 * Estamos usando o mesmo loader da sua página.
 */
function Loading() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#292929]/84 to-black/65">
      <Loader2 className="animate-spin text-[#4E2010]" size={60} />
    </main>
  );
}

/**
 * Esta é a nova página principal (Server Component).
 * Ela "suspende" o carregamento do componente cliente,
 * permitindo que o Next.js faça o build corretamente.
 */
export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <InicioClient />
    </Suspense>
  );
}