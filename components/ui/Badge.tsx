import type { HTMLAttributes, ReactNode } from "react";

type Tone = "navy" | "gold" | "green" | "red" | "gray";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
  children: ReactNode;
}

const toneClasses: Record<Tone, string> = {
  navy: "bg-navy-50 text-navy",
  gold: "bg-gold-50 text-gold-600",
  green: "bg-green-50 text-green-700",
  red: "bg-red-50 text-red-700",
  gray: "bg-gray-100 text-gray-700"
};

function cx(...classes: Array<string | false | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export function Badge({
  tone = "navy",
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        toneClasses[tone],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}