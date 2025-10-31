"use client";

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
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`${image}?v=${Date.now()}`}
          alt={name ?? "Avatar"}
          className="rounded-full object-cover border border-[#4E2010] group-hover:border-white transition"
          style={{ width: "36px", height: "36px", objectFit: "cover" }}
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
