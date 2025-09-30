"use client";

import Link from "next/link";
import { LogIn } from "lucide-react";

export default function LoginIcon() {
  return (
    <Link
      href="/login"
      className="flex items-center gap-2 font-bold text-xs cursor-pointer hover:text-white hover:underline text-[#4E2010] px-2 py-1 rounded-lg transition duration-300"
    >
      <LogIn size={20} />
    </Link>
  );
}
