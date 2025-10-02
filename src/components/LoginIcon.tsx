"use client";

import Link from "next/link";
import { UserRound } from "lucide-react";

export default function LoginIcon() {
  return (
    <Link
      href="/login"
      className="flex items-center gap-2 text-sm font-semibold text-[#4E2010] px-3 py-2 rounded-lg transition-all duration-300 hover:text-white hover:bg-[#4E2010]"
      aria-label="Fazer login"
    >
      <UserRound size={18} strokeWidth={2} />
      <span>Login</span>
    </Link>
  );
}
