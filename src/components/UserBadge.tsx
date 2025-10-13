"use client";

import Image from "next/image";
import Link from "next/link";
import { UserRound } from "lucide-react";

export default function UserBadge({
  name,
  image,
}: {
  name?: string | null;
  image?: string | null;
}) {
  return (
    <Link
      href="/perfil"
      className="flex items-center gap-2 group cursor-pointer"
    >
      {image ? (
        <Image
          src={`${image}?v=${Date.now()}`}
          alt={name ?? "Avatar"}
          width={36}
          height={36}
          className="rounded-full object-cover border border-gray-300 group-hover:border-[#ff7043] transition"
          style={{ width: "36px", height: "36px", objectFit: "cover" }}
        />
      ) : (
        <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 group-hover:bg-[#ff7043] group-hover:text-white transition">
          {name ? name.charAt(0).toUpperCase() : <UserRound size={18} />}
        </div>
      )}

      <span className="text-sm font-medium text-gray-700 group-hover:text-[#ff7043] transition hidden sm:block">
        {name ?? "Usuário"}
      </span>
    </Link>
  );
}
