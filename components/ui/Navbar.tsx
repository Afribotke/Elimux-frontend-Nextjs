"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-navy-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy text-sm font-bold text-gold">
            E
          </span>
          <span className="text-lg font-bold text-navy">
            Elimux
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/search"
            className="text-sm font-medium text-navy hover:text-gold-600"
          >
            Find Courses
          </Link>
          <Link
            href="/#how-it-works"
            className="text-sm font-medium text-navy hover:text-gold-600"
          >
            How it works
          </Link>
          <Link
            href="/login"
            className="text-sm font-medium text-navy hover:text-gold-600"
          >
            Institution login
          </Link>
          <Link href="/register">
            <Button size="sm" variant="secondary">
              List your institution
            </Button>
          </Link>
        </nav>

        <button
          type="button"
          aria-label="Toggle menu"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-navy md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="text-xl">{open ? "\u2715" : "\u2630"}</span>
        </button>
      </div>

      {open && (
        <div className="border-t border-navy-100 bg-white md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
            <Link
              href="/search"
              className="rounded-lg px-3 py-2 text-sm font-medium text-navy hover:bg-navy-50"
              onClick={() => setOpen(false)}
            >
              Find Courses
            </Link>
            <Link
              href="/login"
              className="rounded-lg px-3 py-2 text-sm font-medium text-navy hover:bg-navy-50"
              onClick={() => setOpen(false)}
            >
              Institution login
            </Link>
            <Link
              href="/register"
              className="rounded-lg px-3 py-2 text-sm font-medium text-navy hover:bg-navy-50"
              onClick={() => setOpen(false)}
            >
              List your institution
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
