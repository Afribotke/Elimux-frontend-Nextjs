import * as React from "react";

export function Button({ className = "", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-md bg-slate-900 text-white px-4 py-2 text-sm hover:bg-slate-800 ${className}`}
      {...props}
    />
  );
}
