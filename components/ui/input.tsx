import * as React from "react";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className = "", ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus-visible:ring-2 focus-visible:ring-slate-400 ${className}`}
        {...props}
      />
    );
  }
);
