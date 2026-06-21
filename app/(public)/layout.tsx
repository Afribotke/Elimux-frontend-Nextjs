import type { ReactNode } from "react";
import { Navbar } from "@/components/ui/Navbar";

export default function PublicLayout({
  children
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <footer className="border-t border-navy-100 bg-navy text-navy-100">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold text-white">Elimux</p>
            <p className="text-xs">
              Verified education discovery for Africa. Kenya-first, globally
              scalable.
            </p>
          </div>
          <p className="text-xs">
            (c) {new Date().getFullYear()} Afribot Ventures Limited - an AfriBot
            AI brand.
          </p>
        </div>
      </footer>
    </div>
  );
}



