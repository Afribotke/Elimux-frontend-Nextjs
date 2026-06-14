# =====================================================================
# Elimux generator - PART 1 of 2
# Creates the project root and writes: config + lib + components
# Run this FIRST, then run build-part2.ps1
# =====================================================================
$ErrorActionPreference = 'Stop'

$script:Root = Join-Path (Get-Location) 'elimux'
if (Test-Path $script:Root) { Remove-Item $script:Root -Recurse -Force }
New-Item -ItemType Directory -Path $script:Root -Force | Out-Null

function Add-File {
    param(
        [Parameter(Mandatory)][string]$Path,
        [Parameter(Mandatory)][string]$Content
    )
    $full = Join-Path $script:Root $Path
    $dir  = Split-Path $full -Parent
    if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }
    $utf8 = New-Object System.Text.UTF8Encoding($false)
    [System.IO.File]::WriteAllText($full, $Content, $utf8)
    Write-Host "  + $Path"
}

Write-Host "PART 1: writing config + lib + components..." -ForegroundColor Cyan

# --------------------------- package.json ---------------------------
Add-File 'package.json' @'
{
  "name": "elimux",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "@supabase/supabase-js": "^2.45.4",
    "next": "14.2.5",
    "react": "18.3.1",
    "react-dom": "18.3.1"
  },
  "devDependencies": {
    "@types/node": "20.14.10",
    "@types/react": "18.3.3",
    "@types/react-dom": "18.3.0",
    "autoprefixer": "10.4.19",
    "postcss": "8.4.39",
    "tailwindcss": "3.4.6",
    "typescript": "5.5.3"
  }
}
'@

# --------------------------- tsconfig.json ---------------------------
Add-File 'tsconfig.json' @'
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "forceConsistentCasingInFileNames": true,
    "noImplicitAny": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
'@

# --------------------------- next.config.js ---------------------------
Add-File 'next.config.js' @'
/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }]
  }
};

module.exports = nextConfig;
'@

# --------------------------- tailwind.config.ts ---------------------------
Add-File 'tailwind.config.ts' @'
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0D1F3C",
          50: "#E7EBF2",
          100: "#C3CDDD",
          600: "#15315E",
          700: "#0D1F3C",
          800: "#0A1830",
          900: "#070F1F"
        },
        gold: {
          DEFAULT: "#C8973A",
          50: "#FBF4E7",
          100: "#F2E0BD",
          500: "#C8973A",
          600: "#A87D2A"
        }
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "Segoe UI", "Roboto", "Arial", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
'@

# --------------------------- postcss.config.js ---------------------------
Add-File 'postcss.config.js' @'
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}
  }
};
'@

# --------------------------- .env.example ---------------------------
Add-File '.env.example' @'
# Frontend-safe Supabase keys (exposed to browser by design)
NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# NOTE: The Supabase service-role key is backend-only.
# It must NEVER be placed in this file or in any NEXT_PUBLIC_ variable.
'@

# --------------------------- .gitignore ---------------------------
Add-File '.gitignore' @'
node_modules
.next
out
.env
.env.local
.DS_Store
elimux-clean.zip
'@

# --------------------------- next-env.d.ts ---------------------------
Add-File 'next-env.d.ts' @'
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.
'@

# --------------------------- app/globals.css ---------------------------
Add-File 'app/globals.css' @'
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --navy: #0d1f3c;
  --gold: #c8973a;
}

html,
body {
  height: 100%;
}

body {
  background-color: #ffffff;
  color: var(--navy);
  -webkit-font-smoothing: antialiased;
}
'@

# --------------------------- lib/types.ts ---------------------------
Add-File 'lib/types.ts' @'
// Shared domain types for Elimux.
// These mirror the Postgres schema. Keep in sync with the database.

export type InstitutionType =
  | "University"
  | "TVET"
  | "Polytechnic"
  | "College"
  | "Examining Body";

export type InstitutionStatus =
  | "unverified"
  | "pending"
  | "verified"
  | "suspended";

export type CourseLevel =
  | "Certificate"
  | "Diploma"
  | "Undergraduate"
  | "Postgraduate"
  | "Masters"
  | "Doctorate";

export type StudyMode = "On campus" | "Online" | "Hybrid";

export interface Institution {
  id: string;
  slug: string;
  name: string;
  type: InstitutionType;
  country_code: string;
  city: string | null;
  website: string | null;
  email: string | null;
  status: InstitutionStatus;
  established_year: number | null;
}

export interface Course {
  id: string;
  institution_id: string;
  slug: string;
  name: string;
  level: CourseLevel;
  field: string;
  duration_months: number | null;
  mode: StudyMode;
  // null means "Not disclosed" - never fabricate a value.
  tuition_fee: number | null;
  currency: string;
  min_grade: string | null;
  scholarship: boolean;
  is_active: boolean;
}

export interface CourseSearchResult {
  course_id: string;
  course_slug: string;
  course_name: string;
  level: CourseLevel;
  field: string;
  duration_months: number | null;
  mode: StudyMode;
  tuition_fee: number | null;
  currency: string;
  min_grade: string | null;
  scholarship: boolean;
  institution_id: string;
  institution_slug: string;
  institution_name: string;
  institution_type: InstitutionType;
  country_code: string;
  city: string | null;
  rank: number;
}

export interface SearchParams {
  query?: string;
  country?: string;
  level?: CourseLevel | "";
  mode?: StudyMode | "";
  maxFee?: number | null;
  limit?: number;
  offset?: number;
}

/**
 * Formats a tuition fee for display.
 * When the value is null (unknown), returns "Not disclosed" - never a fabricated number.
 */
export function formatTuition(
  fee: number | null,
  currency: string | null
): string {
  if (fee === null || fee === undefined) {
    return "Not disclosed";
  }
  const cur = currency || "KES";
  return `${cur} ${fee.toLocaleString("en-KE")}`;
}
'@

# --------------------------- lib/supabase/client.ts ---------------------------
Add-File 'lib/supabase/client.ts' @'
"use client";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Browser-safe Supabase client.
 * Uses only the public anon key and URL. The service-role key is backend-only
 * and must never be referenced here or anywhere in frontend code.
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let cachedClient: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  if (!supabaseUrl || !supabaseAnonKey) {
    if (typeof window !== "undefined") {
      console.warn(
        "[Elimux] Supabase env vars are not set. " +
          "Falling back to demo data. Set NEXT_PUBLIC_SUPABASE_URL and " +
          "NEXT_PUBLIC_SUPABASE_ANON_KEY to enable live data."
      );
    }
    return null;
  }

  if (!cachedClient) {
    cachedClient = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true
      }
    });
  }

  return cachedClient;
}

export function isSupabaseConfigured(): boolean {
  return Boolean(supabaseUrl && supabaseAnonKey);
}
'@

# --------------------------- lib/api/search.ts ---------------------------
Add-File 'lib/api/search.ts' @'
import { getSupabaseClient } from "@/lib/supabase/client";
import type { CourseSearchResult, SearchParams } from "@/lib/types";

/**
 * Clearly-marked DEMO data.
 * Only used when Supabase is not configured or returns no rows, so the UI
 * always renders. Flagged via isDemo and never presented as verified data.
 * Tuition values left as null demonstrate the "Not disclosed" behaviour.
 */
const DEMO_RESULTS: CourseSearchResult[] = [
  {
    course_id: "demo-1",
    course_slug: "bsc-computer-science",
    course_name: "BSc Computer Science",
    level: "Undergraduate",
    field: "Computing & IT",
    duration_months: 48,
    mode: "On campus",
    tuition_fee: null,
    currency: "KES",
    min_grade: "B (Plain)",
    scholarship: true,
    institution_id: "demo-inst-1",
    institution_slug: "demo-university",
    institution_name: "Demo University (sample data)",
    institution_type: "University",
    country_code: "KE",
    city: "Nairobi",
    rank: 1
  },
  {
    course_id: "demo-2",
    course_slug: "diploma-electrical-engineering",
    course_name: "Diploma in Electrical Engineering",
    level: "Diploma",
    field: "Engineering",
    duration_months: 36,
    mode: "Hybrid",
    tuition_fee: null,
    currency: "KES",
    min_grade: "C- (Minus)",
    scholarship: false,
    institution_id: "demo-inst-2",
    institution_slug: "demo-tvet",
    institution_name: "Demo Technical College (sample data)",
    institution_type: "TVET",
    country_code: "KE",
    city: "Mombasa",
    rank: 2
  },
  {
    course_id: "demo-3",
    course_slug: "msc-data-science",
    course_name: "MSc Data Science",
    level: "Masters",
    field: "Computing & IT",
    duration_months: 24,
    mode: "Online",
    tuition_fee: null,
    currency: "KES",
    min_grade: "Second Class Upper",
    scholarship: true,
    institution_id: "demo-inst-1",
    institution_slug: "demo-university",
    institution_name: "Demo University (sample data)",
    institution_type: "University",
    country_code: "KE",
    city: "Nairobi",
    rank: 3
  }
];

export interface SearchResponse {
  results: CourseSearchResult[];
  isDemo: boolean;
  error: string | null;
}

function filterDemo(params: SearchParams): CourseSearchResult[] {
  const q = (params.query || "").trim().toLowerCase();
  return DEMO_RESULTS.filter((r) => {
    if (q) {
      const haystack =
        `${r.course_name} ${r.field} ${r.institution_name}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    if (params.country && r.country_code !== params.country) return false;
    if (params.level && r.level !== params.level) return false;
    if (params.mode && r.mode !== params.mode) return false;
    if (
      params.maxFee != null &&
      r.tuition_fee != null &&
      r.tuition_fee > params.maxFee
    ) {
      return false;
    }
    return true;
  });
}

/**
 * Searches courses via the Postgres search_courses RPC.
 * Signature: search_courses(p_query, p_country, p_level, p_mode, p_max_fee, p_limit, p_offset)
 * Falls back to clearly-marked demo data when unconfigured, errored, or empty.
 */
export async function searchCourses(
  params: SearchParams
): Promise<SearchResponse> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return { results: filterDemo(params), isDemo: true, error: null };
  }

  try {
    const { data, error } = await supabase.rpc("search_courses", {
      p_query: params.query ?? null,
      p_country: params.country ?? null,
      p_level: params.level ? params.level : null,
      p_mode: params.mode ? params.mode : null,
      p_max_fee: params.maxFee ?? null,
      p_limit: params.limit ?? 20,
      p_offset: params.offset ?? 0
    });

    if (error) {
      return {
        results: filterDemo(params),
        isDemo: true,
        error: error.message
      };
    }

    const rows = (data ?? []) as CourseSearchResult[];

    if (rows.length === 0) {
      return { results: filterDemo(params), isDemo: true, error: null };
    }

    return { results: rows, isDemo: false, error: null };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return { results: filterDemo(params), isDemo: true, error: message };
  }
}
'@

# --------------------------- components/ui/Button.tsx ---------------------------
Add-File 'components/ui/Button.tsx' @'
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
'@

# --------------------------- components/ui/Input.tsx ---------------------------
Add-File 'components/ui/Input.tsx' @'
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
'@

# --------------------------- components/ui/Card.tsx ---------------------------
Add-File 'components/ui/Card.tsx' @'
import type { HTMLAttributes, ReactNode } from "react";

function cx(...classes: Array<string | false | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cx(
        "rounded-xl border border-navy-100 bg-white shadow-sm",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }: CardProps) {
  return (
    <div className={cx("border-b border-navy-100 p-5", className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cx("text-lg font-semibold text-navy", className)}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardBody({ className, children, ...props }: CardProps) {
  return (
    <div className={cx("p-5", className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cx("border-t border-navy-100 p-5", className)}
      {...props}
    >
      {children}
    </div>
  );
}
'@

# --------------------------- components/ui/Badge.tsx ---------------------------
Add-File 'components/ui/Badge.tsx' @'
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
'@

# --------------------------- components/ui/Navbar.tsx ---------------------------
Add-File 'components/ui/Navbar.tsx' @'
"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/Button";

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
'@

# --------------------------- components/ui/Sidebar.tsx ---------------------------
Add-File 'components/ui/Sidebar.tsx' @'
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  label: string;
  href: string;
  icon: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Overview", href: "/dashboard", icon: "\u25E7" },
  { label: "Students", href: "/dashboard/students", icon: "\u25CD" },
  { label: "Programs", href: "/dashboard/programs", icon: "\u25A4" },
  { label: "Institutions", href: "/dashboard/institutions", icon: "\u25C8" },
  { label: "Analytics", href: "/dashboard/analytics", icon: "\u25D4" },
  { label: "Settings", href: "/dashboard/settings", icon: "\u2699" }
];

function cx(...classes: Array<string | false | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 border-r border-navy-100 bg-navy md:block">
      <div className="flex h-16 items-center gap-2 px-5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold text-sm font-bold text-navy">
          E
        </span>
        <span className="text-lg font-bold text-white">Elimux</span>
      </div>

      <nav className="flex flex-col gap-1 px-3 py-4">
        {NAV_ITEMS.map((item) => {
          const active =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cx(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-gold text-navy"
                  : "text-navy-100 hover:bg-navy-600 hover:text-white"
              )}
            >
              <span aria-hidden className="text-base">
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto px-5 py-4 text-xs text-navy-100">
        <p className="font-medium text-white">AfriBot AI</p>
        <p>Afribot Ventures Limited</p>
      </div>
    </aside>
  );
}
'@

# --------------------------- components/ui/LayoutShell.tsx ---------------------------
Add-File 'components/ui/LayoutShell.tsx' @'
"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { Sidebar } from "@/components/ui/Sidebar";

interface LayoutShellProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}

export function LayoutShell({
  title,
  subtitle,
  actions,
  children
}: LayoutShellProps) {
  return (
    <div className="flex min-h-screen bg-navy-50">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-navy-100 bg-white px-4 sm:px-6">
          <div className="min-w-0">
            <h1 className="truncate text-lg font-semibold text-navy">
              {title}
            </h1>
            {subtitle && (
              <p className="truncate text-xs text-navy/50">{subtitle}</p>
            )}
          </div>
          <div className="flex items-center gap-3">
            {actions}
            <Link
              href="/"
              className="text-sm font-medium text-navy hover:text-gold-600"
            >
              View public site
            </Link>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
'@

Write-Host ""
Write-Host "PART 1 COMPLETE. Folder created: $script:Root" -ForegroundColor Green
Write-Host "Now run build-part2.ps1 to add the app/ pages and create the ZIP." -ForegroundColor Yellow