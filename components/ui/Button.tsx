import { forwardRef, type ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-navy text-white hover:bg-navy-600 focus-visible:ring-navy disabled:bg-navy/50",
  secondary:
    "bg-gold text-navy hover:bg-gold-600 focus-visible:ring-gold disabled:bg-gold/50",
  outline:
    "border border-navy text-navy bg-transparent hover:bg-navy-50 focus-visible:ring-navy",
  ghost: "text-navy bg-transparent hover:bg-navy-50 focus-visible:ring-navy"
};

const sizeClasses: Record<Size, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-7 text-base"
};

function cx(...classes: Array<string | false | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = "primary",
      size = "md",
      fullWidth = false,
      className,
      type = "button",
      children,
      ...props
    },
    ref
  ) {
    return (
      <button
        ref={ref}
        type={type}
        className={cx(
          "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-70",
          variantClasses[variant],
          sizeClasses[size],
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);