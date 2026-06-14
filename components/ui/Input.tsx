import { forwardRef, type InputHTMLAttributes } from "react";

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

function cx(...classes: Array<string | false | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, hint, className, id, ...props },
  ref
) {
  const inputId = id || props.name || undefined;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="mb-1.5 block text-sm font-medium text-navy"
        >
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        className={cx(
          "h-11 w-full rounded-lg border bg-white px-3 text-sm text-navy",
          "placeholder:text-navy/40",
          "focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold",
          error ? "border-red-500" : "border-navy-100",
          className
        )}
        aria-invalid={error ? true : undefined}
        {...props}
      />
      {error ? (
        <p className="mt-1 text-xs text-red-600">{error}</p>
      ) : hint ? (
        <p className="mt-1 text-xs text-navy/50">{hint}</p>
      ) : null}
    </div>
  );
});