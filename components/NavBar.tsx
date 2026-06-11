"use client";

import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="w-full px-6 py-4 border-b flex items-center justify-between">
      <h1 className="text-xl font-bold">Elimux</h1>

      <div className="flex gap-6">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <Link href="/programs" className="hover:text-blue-600">Programs</Link>
      </div>
    </nav>
  );
}
