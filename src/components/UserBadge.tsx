"use client";

import Image from "next/image";
import Link from "next/link";

export default function UserBadge({
  name,
  image,
}: {
  name?: string | null;
  image?: string | null;
}) {
  return (
  <div className="flex items-center gap-2">
    <Link href="/perfil">
      {image ? (
        <Image
          src={image}
          alt={name ?? "Avatar"}
          width={36}
          height={36}
          className="rounded-full object-cover cursor-pointer"
        />
      ) : (
        <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-sm text-gray-700 cursor-pointer">
          {name ? name.charAt(0).toUpperCase() : "U"}
        </div>
      )}
    </Link>
  </div>
);
}
