import Link from "next/link";
import { MENU } from "@/lib/dashboard/menu";

export const Sidebar = () => {
  return (
    <aside className="w-64 bg-white border-r h-full p-4">
      <h2 className="text-xl font-bold mb-6">ElimuX</h2>
      <nav className="space-y-3">
        {MENU.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="block px-3 py-2 rounded hover:bg-gray-100"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};
