'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type SidebarProps = {
  institutionId: string;
};

const NAV = [
  { label: 'Dashboard', segment: 'dashboard', icon: '▦' },
  { label: 'Programs', segment: 'programs', icon: '◆' },
  { label: 'Analytics', segment: 'analytics', icon: '◈' },
  { label: 'Settings', segment: 'settings', icon: '⚙' },
];

export default function Sidebar({ institutionId }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-60 flex-col bg-navy text-white">
      <div className="flex items-center gap-2 px-6 py-5">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold text-navy font-bold">
          E
        </span>
        <span className="text-lg font-semibold">Elimux</span>
      </div>

      <nav className="mt-4 flex flex-col gap-1 px-3">
        {NAV.map((item) => {
          const href = `/institution/${institutionId}/${item.segment}`;
          const active = pathname === href;
          return (
            <Link
              key={item.segment}
              href={href}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition-colors ${
                active
                  ? 'bg-gold text-navy font-semibold'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span aria-hidden>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto px-6 py-5 text-xs text-white/40">
        AfriBot AI · Elimux
      </div>
    </aside>
  );
}
