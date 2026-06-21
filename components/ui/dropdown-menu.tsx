import * as React from "react";

export function DropdownMenu({ children }: { children: React.ReactNode }) {
  return <div className="relative inline-block">{children}</div>;
}

export function DropdownMenuTrigger({ children }: { children: React.ReactNode }) {
  return <div className="cursor-pointer">{children}</div>;
}

export function DropdownMenuContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute mt-2 w-40 rounded-md border bg-white shadow-lg p-2 z-50">
      {children}
    </div>
  );
}

export function DropdownMenuItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-2 py-1 text-sm rounded hover:bg-slate-100 cursor-pointer">
      {children}
    </div>
  );
}
