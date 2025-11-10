"use client";

import Link from "next/link";
import { UserRound } from "lucide-react";
import ProfileAvatar from "./ProfileAvatar";
import { useEffect, useState } from "react";
import { calcularNivel } from "@/utils/nivelSystem";

interface Conquista {
  desbloqueada: boolean;
}

export default function UserBadge({
  name,
  image,
}: {
  name?: string | null;
  image?: string | null;
}) {
  const [nivel, setNivel] = useState(1);
  const [imagemBorda, setImagemBorda] = useState<string | undefined>();

  useEffect(() => {
    // Busca o nível do usuário baseado em conquistas
    const fetchNivel = async () => {
      try {
        const response = await fetch('/api/conquistas');
        if (response.ok) {
          const conquistas: Conquista[] = await response.json();
          const conquistasDesbloqueadas = conquistas.filter(c => c.desbloqueada).length;
          const nivelInfo = calcularNivel(conquistasDesbloqueadas);
          setNivel(nivelInfo.nivel);
          setImagemBorda(nivelInfo.imagemBorda);
        }
      } catch (error) {
        console.error("Erro ao buscar nível:", error);
      }
    };

    fetchNivel();
  }, []);

  return (
    <Link
      href="/perfil"
      className="flex items-center gap-2 group cursor-pointer"
    >
      {image ? (
        <ProfileAvatar
          foto={image}
          nivel={nivel}
          size="small"
          showLevelBadge={false}
          imagemBorda={imagemBorda}
          usarBordaCustomizada={true}
        />
      ) : (
        <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 group-hover:bg-[#ff7043] group-hover:text-white transition">
          {name ? name.charAt(0).toUpperCase() : <UserRound size={18} />}
        </div>
      )}

      <span className="text-sm font-medium text-[#4E2010] group-hover:text-white transition hidden sm:block">
        {name ?? "Usuário"}
      </span>
    </Link>
  );
}
