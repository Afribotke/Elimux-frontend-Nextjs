import Link from "next/link";

export function Navbar() {
  return (
    <nav className="w-full bg-white border-b shadow-sm px-4 py-3 flex items-center justify-between">
      <Link href="/" className="text-lg font-semibold text-slate-800">
        ElimuX
      </Link>

      <div className="flex items-center gap-4 text-sm">
        <Link href="/discover" className="text-slate-600 hover:text-slate-900">
          Discover
        </Link>
        <Link href="/programs" className="text-slate-600 hover:text-slate-900">
          Programs
        </Link>
        <Link href="/login" className="text-slate-600 hover:text-slate-900">
          Login
        </Link>
      </div>
    </nav>
  );
}
