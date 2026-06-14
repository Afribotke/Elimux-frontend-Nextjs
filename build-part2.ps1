# =====================================================================
# Elimux generator - PART 2 of 2
# Appends all app/ pages, then creates elimux-clean.zip
# Run this AFTER build-part1.ps1
# =====================================================================
$ErrorActionPreference = 'Stop'

$script:Root = Join-Path (Get-Location) 'elimux'
if (-not (Test-Path $script:Root)) {
    throw "Project folder not found. Run build-part1.ps1 first (in this same directory)."
}

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

Write-Host "PART 2: writing app/ pages..." -ForegroundColor Cyan

# --------------------------- app/layout.tsx ---------------------------
Add-File 'app/layout.tsx' @'
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Elimux - Discover courses & institutions across Africa",
  description:
    "Elimux helps students discover verified institutions and courses using real data. By AfriBot AI, an Afribot Ventures Limited brand.",
  metadataBase: new URL("https://elimux.app"),
  openGraph: {
    title: "Elimux",
    description:
      "Discover verified institutions and courses across Africa with real data.",
    siteName: "Elimux",
    type: "website"
  }
};

export default function RootLayout({
  children
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
'@

# --------------------------- app/(public)/layout.tsx ---------------------------
Add-File 'app/(public)/layout.tsx' @'
import type { ReactNode } from "react";
import { Navbar } from "@/components/ui/Navbar";

export default function PublicLayout({
  children
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <footer className="border-t border-navy-100 bg-navy text-navy-100">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold text-white">Elimux</p>
            <p className="text-xs">
              Verified education discovery for Africa. Kenya-first, globally
              scalable.
            </p>
          </div>
          <p className="text-xs">
            (c) {new Date().getFullYear()} Afribot Ventures Limited - an AfriBot
            AI brand.
          </p>
        </div>
      </footer>
    </div>
  );
}
'@

# --------------------------- app/(public)/page.tsx ---------------------------
Add-File 'app/(public)/page.tsx' @'
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";
import { HeroSearch } from "@/app/(public)/HeroSearch";

const FEATURES = [
  {
    title: "Verified institutions only",
    body: "We only show universities, TVETs and colleges that pass verification - so your decision rests on real data."
  },
  {
    title: "Honest fees",
    body: "When an institution has not disclosed tuition, we show Not disclosed - never an invented number."
  },
  {
    title: "Kenya-first, globally scalable",
    body: "Built for African students, with bilingual (English/Swahili) context and worldwide reach."
  }
];

export default function HomePage() {
  return (
    <div>
      <section className="bg-navy text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
          <div className="max-w-3xl">
            <span className="inline-flex items-center rounded-full bg-gold/15 px-3 py-1 text-xs font-medium text-gold">
              By AfriBot AI
            </span>
            <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-5xl">
              Discover the right course at the right institution.
            </h1>
            <p className="mt-4 max-w-2xl text-base text-navy-100 sm:text-lg">
              Elimux helps you search verified institutions and courses across
              Africa using real, accurate data. Make life decisions with
              confidence.
            </p>
          </div>

          <div className="mt-8 max-w-3xl">
            <HeroSearch />
          </div>
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-bold text-navy">Why Elimux</h2>
        <p className="mt-2 max-w-2xl text-navy/60">
          A student may make a life decision based on what Elimux shows. That is
          why accuracy is non-negotiable.
        </p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <Card key={f.title}>
              <CardBody>
                <h3 className="text-lg font-semibold text-navy">{f.title}</h3>
                <p className="mt-2 text-sm text-navy/60">{f.body}</p>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-gold-50">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-4 px-4 py-12 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-navy">
              Are you an institution?
            </h2>
            <p className="mt-1 text-navy/60">
              List your programs, manage students, and reach more applicants.
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/register">
              <Button variant="secondary">List your institution</Button>
            </Link>
            <Link href="/login">
              <Button variant="outline">Institution login</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
'@

# --------------------------- app/(public)/HeroSearch.tsx ---------------------------
Add-File 'app/(public)/HeroSearch.tsx' @'
"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";

export function HeroSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (country) params.set("country", country);
    router.push(`/search?${params.toString()}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 rounded-xl bg-white p-3 shadow-lg sm:flex-row"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search courses, fields or institutions..."
        className="h-12 flex-1 rounded-lg border border-navy-100 px-4 text-sm text-navy placeholder:text-navy/40 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold"
        aria-label="Search courses"
      />
      <select
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        className="h-12 rounded-lg border border-navy-100 px-3 text-sm text-navy focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold"
        aria-label="Country"
      >
        <option value="">All countries</option>
        <option value="KE">Kenya</option>
        <option value="UG">Uganda</option>
        <option value="TZ">Tanzania</option>
        <option value="RW">Rwanda</option>
        <option value="NG">Nigeria</option>
        <option value="GH">Ghana</option>
        <option value="ZA">South Africa</option>
      </select>
      <Button type="submit" size="lg" variant="secondary">
        Search
      </Button>
    </form>
  );
}
'@

# --------------------------- app/(public)/search/page.tsx ---------------------------
Add-File 'app/(public)/search/page.tsx' @'
import { Suspense } from "react";
import { SearchExperience } from "@/app/(public)/search/SearchExperience";

export const metadata = {
  title: "Search courses - Elimux"
};

export default function SearchPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <h1 className="text-2xl font-bold text-navy">Find your course</h1>
      <p className="mt-1 text-navy/60">
        Results come from verified institutions. Where fees are unknown, we show
        Not disclosed.
      </p>

      <Suspense
        fallback={
          <p className="mt-8 text-sm text-navy/50">Loading search...</p>
        }
      >
        <SearchExperience />
      </Suspense>
    </div>
  );
}
'@

# --------------------------- app/(public)/search/SearchExperience.tsx ---------------------------
Add-File 'app/(public)/search/SearchExperience.tsx' @'
"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { searchCourses } from "@/lib/api/search";
import {
  formatTuition,
  type CourseLevel,
  type CourseSearchResult,
  type StudyMode
} from "@/lib/types";

const LEVELS: CourseLevel[] = [
  "Certificate",
  "Diploma",
  "Undergraduate",
  "Postgraduate",
  "Masters",
  "Doctorate"
];

const MODES: StudyMode[] = ["On campus", "Online", "Hybrid"];

export function SearchExperience() {
  const sp = useSearchParams();

  const [query, setQuery] = useState(sp.get("q") ?? "");
  const [country, setCountry] = useState(sp.get("country") ?? "");
  const [level, setLevel] = useState<CourseLevel | "">("");
  const [mode, setMode] = useState<StudyMode | "">("");
  const [maxFee, setMaxFee] = useState<string>("");

  const [results, setResults] = useState<CourseSearchResult[]>([]);
  const [isDemo, setIsDemo] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function runSearch() {
    setLoading(true);
    setError(null);
    const res = await searchCourses({
      query,
      country,
      level,
      mode,
      maxFee: maxFee ? Number(maxFee) : null,
      limit: 30,
      offset: 0
    });
    setResults(res.results);
    setIsDemo(res.isDemo);
    setError(res.error);
    setLoading(false);
  }

  useEffect(() => {
    void runSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    void runSearch();
  }

  return (
    <div className="mt-6 grid gap-6 lg:grid-cols-[280px_1fr]">
      <Card className="h-fit">
        <CardBody>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              label="Keyword"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. Computer Science"
            />

            <div>
              <label className="mb-1.5 block text-sm font-medium text-navy">
                Country
              </label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="h-11 w-full rounded-lg border border-navy-100 px-3 text-sm text-navy focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold"
              >
                <option value="">All countries</option>
                <option value="KE">Kenya</option>
                <option value="UG">Uganda</option>
                <option value="TZ">Tanzania</option>
                <option value="RW">Rwanda</option>
                <option value="NG">Nigeria</option>
                <option value="GH">Ghana</option>
                <option value="ZA">South Africa</option>
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-navy">
                Level
              </label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value as CourseLevel | "")}
                className="h-11 w-full rounded-lg border border-navy-100 px-3 text-sm text-navy focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold"
              >
                <option value="">Any level</option>
                {LEVELS.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-navy">
                Study mode
              </label>
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value as StudyMode | "")}
                className="h-11 w-full rounded-lg border border-navy-100 px-3 text-sm text-navy focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold"
              >
                <option value="">Any mode</option>
                {MODES.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            <Input
              label="Max tuition (optional)"
              type="number"
              min={0}
              value={maxFee}
              onChange={(e) => setMaxFee(e.target.value)}
              placeholder="e.g. 200000"
              hint="Courses with undisclosed fees are still shown."
            />

            <Button type="submit" fullWidth variant="secondary">
              Apply filters
            </Button>
          </form>
        </CardBody>
      </Card>

      <div>
        {isDemo && (
          <div className="mb-4 rounded-lg border border-gold-100 bg-gold-50 px-4 py-3 text-sm text-gold-600">
            Showing <strong>sample demo data</strong>. Connect Supabase to see
            live, verified institutions. Demo data is clearly labelled and is
            not real institution information.
          </div>
        )}

        {error && (
          <div className="mb-4 rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
            Search notice: {error}
          </div>
        )}

        {loading ? (
          <p className="text-sm text-navy/50">Searching...</p>
        ) : results.length === 0 ? (
          <Card>
            <CardBody>
              <p className="text-sm text-navy/60">
                No matching courses found. Try broadening your filters.
              </p>
            </CardBody>
          </Card>
        ) : (
          <div className="flex flex-col gap-4">
            <p className="text-sm text-navy/50">
              {results.length} result{results.length === 1 ? "" : "s"}
            </p>
            {results.map((r) => (
              <Card key={r.course_id}>
                <CardBody>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <h3 className="text-lg font-semibold text-navy">
                        {r.course_name}
                      </h3>
                      <p className="mt-0.5 text-sm text-navy/60">
                        {r.institution_name}
                        {r.city ? ` - ${r.city}` : ""} - {r.country_code}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2">
                        <Badge tone="navy">{r.level}</Badge>
                        <Badge tone="gray">{r.field}</Badge>
                        <Badge tone="gray">{r.mode}</Badge>
                        {r.duration_months != null && (
                          <Badge tone="gray">
                            {r.duration_months} months
                          </Badge>
                        )}
                        {r.scholarship && (
                          <Badge tone="green">Scholarship available</Badge>
                        )}
                      </div>
                    </div>

                    <div className="shrink-0 text-left sm:text-right">
                      <p className="text-xs uppercase tracking-wide text-navy/40">
                        Tuition
                      </p>
                      <p className="text-base font-semibold text-navy">
                        {formatTuition(r.tuition_fee, r.currency)}
                      </p>
                      {r.min_grade && (
                        <p className="mt-1 text-xs text-navy/50">
                          Min grade: {r.min_grade}
                        </p>
                      )}
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
'@

# --------------------------- app/(auth)/layout.tsx ---------------------------
Add-File 'app/(auth)/layout.tsx' @'
import Link from "next/link";
import type { ReactNode } from "react";

export default function AuthLayout({
  children
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-navy-50">
      <header className="flex h-16 items-center px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy text-sm font-bold text-gold">
            E
          </span>
          <span className="text-lg font-bold text-navy">Elimux</span>
        </Link>
      </header>
      <main className="flex flex-1 items-center justify-center px-4 py-10">
        {children}
      </main>
    </div>
  );
}
'@

# --------------------------- app/(auth)/login/page.tsx ---------------------------
Add-File 'app/(auth)/login/page.tsx' @'
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setNotice(null);

    const supabase = getSupabaseClient();
    if (!supabase) {
      setNotice(
        "Authentication is not configured yet. Set your Supabase env vars to enable login."
      );
      return;
    }

    setLoading(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    setLoading(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }

    router.push("/dashboard");
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Institution login</CardTitle>
        <p className="mt-1 text-sm text-navy/50">
          Access your Elimux dashboard.
        </p>
      </CardHeader>
      <CardBody>
        {!isSupabaseConfigured() && (
          <div className="mb-4 rounded-lg border border-gold-100 bg-gold-50 px-3 py-2 text-xs text-gold-600">
            Demo mode: Supabase is not configured. Login is disabled until env
            vars are set.
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@institution.ac.ke"
          />
          <Input
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
          />

          {error && <p className="text-sm text-red-600">{error}</p>}
          {notice && <p className="text-sm text-gold-600">{notice}</p>}

          <Button type="submit" fullWidth disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-navy/60">
          No account?{" "}
          <Link href="/register" className="font-medium text-gold-600">
            List your institution
          </Link>
        </p>
      </CardBody>
    </Card>
  );
}
'@

# --------------------------- app/(auth)/register/page.tsx ---------------------------
Add-File 'app/(auth)/register/page.tsx' @'
"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase/client";

export default function RegisterPage() {
  const [institution, setInstitution] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setNotice(null);

    const supabase = getSupabaseClient();
    if (!supabase) {
      setNotice(
        "Registration is not configured yet. Set your Supabase env vars to enable sign-up."
      );
      return;
    }

    setLoading(true);
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { institution_name: institution }
      }
    });
    setLoading(false);

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    setSuccess(
      "Account created. Please check your email to confirm, then sign in. Your institution will appear publicly only after verification."
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>List your institution</CardTitle>
        <p className="mt-1 text-sm text-navy/50">
          Create an account to manage your programs on Elimux.
        </p>
      </CardHeader>
      <CardBody>
        {!isSupabaseConfigured() && (
          <div className="mb-4 rounded-lg border border-gold-100 bg-gold-50 px-3 py-2 text-xs text-gold-600">
            Demo mode: Supabase is not configured. Sign-up is disabled until env
            vars are set.
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Institution name"
            name="institution"
            required
            value={institution}
            onChange={(e) => setInstitution(e.target.value)}
            placeholder="e.g. Nairobi Technical College"
          />
          <Input
            label="Work email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@institution.ac.ke"
          />
          <Input
            label="Password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 8 characters"
            hint="Use a strong, unique password."
          />

          {error && <p className="text-sm text-red-600">{error}</p>}
          {success && <p className="text-sm text-green-700">{success}</p>}
          {notice && <p className="text-sm text-gold-600">{notice}</p>}

          <Button type="submit" fullWidth disabled={loading}>
            {loading ? "Creating account..." : "Create account"}
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-navy/60">
          Already registered?{" "}
          <Link href="/login" className="font-medium text-gold-600">
            Sign in
          </Link>
        </p>
      </CardBody>
    </Card>
  );
}
'@

# --------------------------- app/(institution)/layout.tsx ---------------------------
Add-File 'app/(institution)/layout.tsx' @'
import type { ReactNode } from "react";

export default function InstitutionLayout({
  children
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
'@

# --------------------------- app/(institution)/dashboard/page.tsx ---------------------------
Add-File 'app/(institution)/dashboard/page.tsx' @'
import { LayoutShell } from "@/components/ui/LayoutShell";
import { Badge } from "@/components/ui/Badge";
import { Card, CardBody } from "@/components/ui/Card";

export const metadata = { title: "Overview - Elimux Dashboard" };

const DEMO_STATS = [
  { label: "Active programs", value: "0", hint: "Connect data to populate" },
  { label: "Students", value: "0", hint: "Connect data to populate" },
  { label: "Profile views (30d)", value: "0", hint: "Connect data to populate" },
  { label: "Verification status", value: "Unverified", hint: "Submit details to verify" }
];

const DEMO_ACTIVITY = [
  "No live activity yet - this is sample data.",
  "Connect Supabase to stream real events.",
  "Verified institutions appear publicly in search."
];

export default function DashboardOverviewPage() {
  return (
    <LayoutShell
      title="Overview"
      subtitle="Sample dashboard - connect Supabase for live data"
    >
      <div className="mb-4 rounded-lg border border-gold-100 bg-gold-50 px-4 py-3 text-sm text-gold-600">
        These figures are <strong>sample placeholders</strong>, not real
        statistics. They populate once your institution data is connected.
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {DEMO_STATS.map((s) => (
          <Card key={s.label}>
            <CardBody>
              <p className="text-xs uppercase tracking-wide text-navy/40">
                {s.label}
              </p>
              <p className="mt-2 text-2xl font-bold text-navy">{s.value}</p>
              <p className="mt-1 text-xs text-navy/50">{s.hint}</p>
            </CardBody>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[2fr_1fr]">
        <Card>
          <CardBody>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-navy">
                Getting started
              </h2>
              <Badge tone="gold">Setup</Badge>
            </div>
            <ol className="mt-4 flex flex-col gap-3 text-sm text-navy/70">
              <li>1. Complete your institution profile in Settings.</li>
              <li>2. Add your programs so students can discover them.</li>
              <li>
                3. Submit for verification - only verified institutions appear
                publicly.
              </li>
              <li>4. Track engagement in Analytics.</li>
            </ol>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <h2 className="text-lg font-semibold text-navy">Recent activity</h2>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-navy/60">
              {DEMO_ACTIVITY.map((a, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  {a}
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>
      </div>
    </LayoutShell>
  );
}
'@

# --------------------------- app/(institution)/dashboard/students/page.tsx ---------------------------
Add-File 'app/(institution)/dashboard/students/page.tsx' @'
import { LayoutShell } from "@/components/ui/LayoutShell";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";

export const metadata = { title: "Students - Elimux Dashboard" };

interface DemoStudent {
  id: string;
  name: string;
  program: string;
  status: "Applied" | "Enrolled" | "Graduated";
  email: string;
}

const DEMO_STUDENTS: DemoStudent[] = [
  {
    id: "demo-s1",
    name: "Sample Student A",
    program: "BSc Computer Science",
    status: "Enrolled",
    email: "sample-a@example.org"
  },
  {
    id: "demo-s2",
    name: "Sample Student B",
    program: "Diploma in Electrical Engineering",
    status: "Applied",
    email: "sample-b@example.org"
  }
];

function statusTone(status: DemoStudent["status"]) {
  if (status === "Enrolled") return "green" as const;
  if (status === "Graduated") return "navy" as const;
  return "gold" as const;
}

export default function StudentsPage() {
  return (
    <LayoutShell
      title="Students"
      subtitle="Manage applicants and enrolled students"
      actions={
        <Button size="sm" variant="secondary">
          Add student
        </Button>
      }
    >
      <div className="mb-4 rounded-lg border border-gold-100 bg-gold-50 px-4 py-3 text-sm text-gold-600">
        The rows below are <strong>sample demo records</strong> and do not
        represent real students.
      </div>

      <Card>
        <CardBody className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-navy-100 bg-navy-50 text-xs uppercase tracking-wide text-navy/50">
                <tr>
                  <th className="px-5 py-3 font-medium">Name</th>
                  <th className="px-5 py-3 font-medium">Program</th>
                  <th className="px-5 py-3 font-medium">Email</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {DEMO_STUDENTS.map((s) => (
                  <tr
                    key={s.id}
                    className="border-b border-navy-100 last:border-0"
                  >
                    <td className="px-5 py-3 font-medium text-navy">
                      {s.name}
                    </td>
                    <td className="px-5 py-3 text-navy/70">{s.program}</td>
                    <td className="px-5 py-3 text-navy/70">{s.email}</td>
                    <td className="px-5 py-3">
                      <Badge tone={statusTone(s.status)}>{s.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </LayoutShell>
  );
}
'@

# --------------------------- app/(institution)/dashboard/programs/page.tsx ---------------------------
Add-File 'app/(institution)/dashboard/programs/page.tsx' @'
import { LayoutShell } from "@/components/ui/LayoutShell";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";
import { formatTuition, type Course } from "@/lib/types";

export const metadata = { title: "Programs - Elimux Dashboard" };

const DEMO_PROGRAMS: Course[] = [
  {
    id: "demo-p1",
    institution_id: "demo-inst-1",
    slug: "bsc-computer-science",
    name: "BSc Computer Science",
    level: "Undergraduate",
    field: "Computing & IT",
    duration_months: 48,
    mode: "On campus",
    tuition_fee: null,
    currency: "KES",
    min_grade: "B (Plain)",
    scholarship: true,
    is_active: true
  },
  {
    id: "demo-p2",
    institution_id: "demo-inst-1",
    slug: "diploma-business",
    name: "Diploma in Business Management",
    level: "Diploma",
    field: "Business",
    duration_months: 24,
    mode: "Hybrid",
    tuition_fee: null,
    currency: "KES",
    min_grade: "C- (Minus)",
    scholarship: false,
    is_active: false
  }
];

export default function ProgramsPage() {
  return (
    <LayoutShell
      title="Programs"
      subtitle="Add and manage the courses you offer"
      actions={
        <Button size="sm" variant="secondary">
          Add program
        </Button>
      }
    >
      <div className="mb-4 rounded-lg border border-gold-100 bg-gold-50 px-4 py-3 text-sm text-gold-600">
        These are <strong>sample programs</strong>. Where tuition is not
        provided, Elimux shows Not disclosed - never an invented figure.
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {DEMO_PROGRAMS.map((p) => (
          <Card key={p.id}>
            <CardBody>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-base font-semibold text-navy">
                    {p.name}
                  </h3>
                  <p className="mt-0.5 text-sm text-navy/60">{p.field}</p>
                </div>
                <Badge tone={p.is_active ? "green" : "gray"}>
                  {p.is_active ? "Active" : "Inactive"}
                </Badge>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                <Badge tone="navy">{p.level}</Badge>
                <Badge tone="gray">{p.mode}</Badge>
                {p.duration_months != null && (
                  <Badge tone="gray">{p.duration_months} months</Badge>
                )}
                {p.scholarship && (
                  <Badge tone="green">Scholarship</Badge>
                )}
              </div>

              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm font-semibold text-navy">
                  {formatTuition(p.tuition_fee, p.currency)}
                </p>
                <Button size="sm" variant="outline">
                  Edit
                </Button>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </LayoutShell>
  );
}
'@

# --------------------------- app/(institution)/dashboard/institutions/page.tsx ---------------------------
Add-File 'app/(institution)/dashboard/institutions/page.tsx' @'
import { LayoutShell } from "@/components/ui/LayoutShell";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";
import type { Institution, InstitutionStatus } from "@/lib/types";

export const metadata = { title: "Institutions - Elimux Dashboard" };

const DEMO_INSTITUTIONS: Institution[] = [
  {
    id: "demo-inst-1",
    slug: "demo-university",
    name: "Demo University (sample data)",
    type: "University",
    country_code: "KE",
    city: "Nairobi",
    website: "https://example.org",
    email: "admin@example.org",
    status: "unverified",
    established_year: 1998
  }
];

function statusTone(status: InstitutionStatus) {
  switch (status) {
    case "verified":
      return "green" as const;
    case "pending":
      return "gold" as const;
    case "suspended":
      return "red" as const;
    default:
      return "gray" as const;
  }
}

export default function InstitutionsPage() {
  return (
    <LayoutShell
      title="Institutions"
      subtitle="Your institution profile and verification"
      actions={
        <Button size="sm" variant="secondary">
          Submit for verification
        </Button>
      }
    >
      <div className="mb-4 rounded-lg border border-gold-100 bg-gold-50 px-4 py-3 text-sm text-gold-600">
        Sample profile shown. Only <strong>verified</strong> institutions appear
        publicly in Elimux search.
      </div>

      <div className="grid gap-4">
        {DEMO_INSTITUTIONS.map((inst) => (
          <Card key={inst.id}>
            <CardBody>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-navy">
                      {inst.name}
                    </h3>
                    <Badge tone={statusTone(inst.status)}>
                      {inst.status}
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm text-navy/60">
                    {inst.type} - {inst.city ?? "-"} - {inst.country_code}
                  </p>

                  <dl className="mt-4 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
                    <div>
                      <dt className="text-navy/40">Website</dt>
                      <dd className="text-navy/80">
                        {inst.website ?? "Not disclosed"}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-navy/40">Email</dt>
                      <dd className="text-navy/80">
                        {inst.email ?? "Not disclosed"}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-navy/40">Established</dt>
                      <dd className="text-navy/80">
                        {inst.established_year ?? "Not disclosed"}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-navy/40">Slug</dt>
                      <dd className="text-navy/80">{inst.slug}</dd>
                    </div>
                  </dl>
                </div>

                <Button size="sm" variant="outline">
                  Edit profile
                </Button>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </LayoutShell>
  );
}
'@

# --------------------------- app/(institution)/dashboard/analytics/page.tsx ---------------------------
Add-File 'app/(institution)/dashboard/analytics/page.tsx' @'
import { LayoutShell } from "@/components/ui/LayoutShell";
import { Card, CardBody } from "@/components/ui/Card";

export const metadata = { title: "Analytics - Elimux Dashboard" };

const DEMO_METRICS = [
  { label: "Search impressions (30d)", value: "0" },
  { label: "Profile views (30d)", value: "0" },
  { label: "Program clicks (30d)", value: "0" },
  { label: "Applications (30d)", value: "0" }
];

const DEMO_TOP_PROGRAMS = [
  { name: "BSc Computer Science", views: 0 },
  { name: "Diploma in Business Management", views: 0 },
  { name: "MSc Data Science", views: 0 }
];

export default function AnalyticsPage() {
  return (
    <LayoutShell
      title="Analytics"
      subtitle="Engagement insights for your institution"
    >
      <div className="mb-4 rounded-lg border border-gold-100 bg-gold-50 px-4 py-3 text-sm text-gold-600">
        Sample analytics shown with <strong>zeroed values</strong>. Real metrics
        populate once tracking is connected - no estimated numbers are invented.
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {DEMO_METRICS.map((m) => (
          <Card key={m.label}>
            <CardBody>
              <p className="text-xs uppercase tracking-wide text-navy/40">
                {m.label}
              </p>
              <p className="mt-2 text-2xl font-bold text-navy">{m.value}</p>
            </CardBody>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardBody>
            <h2 className="text-lg font-semibold text-navy">Top programs</h2>
            <ul className="mt-4 flex flex-col gap-3">
              {DEMO_TOP_PROGRAMS.map((p) => (
                <li
                  key={p.name}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-navy/80">{p.name}</span>
                  <span className="font-medium text-navy">
                    {p.views} views
                  </span>
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <h2 className="text-lg font-semibold text-navy">
              Engagement over time
            </h2>
            <div className="mt-4 flex h-40 items-end gap-2">
              {[0, 0, 0, 0, 0, 0, 0].map((_, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t bg-navy-50"
                  style={{ height: "8px" }}
                  aria-hidden
                />
              ))}
            </div>
            <p className="mt-3 text-xs text-navy/50">
              No data yet - chart fills as real engagement is recorded.
            </p>
          </CardBody>
        </Card>
      </div>
    </LayoutShell>
  );
}
'@

# --------------------------- app/(institution)/dashboard/settings/page.tsx ---------------------------
Add-File 'app/(institution)/dashboard/settings/page.tsx' @'
"use client";

import { useState, type FormEvent } from "react";
import { LayoutShell } from "@/components/ui/LayoutShell";
import { Button } from "@/components/ui/Button";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { getSupabaseClient } from "@/lib/supabase/client";
import type { InstitutionType } from "@/lib/types";

const TYPES: InstitutionType[] = [
  "University",
  "TVET",
  "Polytechnic",
  "College",
  "Examining Body"
];

export default function SettingsPage() {
  const [name, setName] = useState("");
  const [type, setType] = useState<InstitutionType>("University");
  const [country, setCountry] = useState("KE");
  const [city, setCity] = useState("");
  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage(null);

    const supabase = getSupabaseClient();
    if (!supabase) {
      setMessage(
        "Demo mode: Supabase is not configured, so changes are not saved."
      );
      return;
    }

    setSaving(true);
    const { error } = await supabase.from("institutions").upsert({
      name,
      type,
      country_code: country,
      city: city || null,
      website: website || null,
      email: email || null
    });
    setSaving(false);

    setMessage(
      error
        ? `Could not save: ${error.message}`
        : "Profile saved. Your institution appears publicly only after verification."
    );
  }

  function handleLogout() {
    const supabase = getSupabaseClient();
    if (supabase) {
      void supabase.auth.signOut();
    }
    setMessage("Signed out (where Supabase is configured).");
  }

  return (
    <LayoutShell
      title="Settings"
      subtitle="Manage your institution profile and account"
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Institution profile</CardTitle>
            <p className="mt-1 text-sm text-navy/50">
              Provide accurate details. Leave a field empty rather than
              guessing - Elimux shows Not disclosed for missing values.
            </p>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Input
                label="Institution name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="e.g. Nairobi Technical College"
              />

              <div>
                <label className="mb-1.5 block text-sm font-medium text-navy">
                  Type
                </label>
                <select
                  value={type}
                  onChange={(e) =>
                    setType(e.target.value as InstitutionType)
                  }
                  className="h-11 w-full rounded-lg border border-navy-100 px-3 text-sm text-navy focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold"
                >
                  {TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-navy">
                    Country
                  </label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="h-11 w-full rounded-lg border border-navy-100 px-3 text-sm text-navy focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold"
                  >
                    <option value="KE">Kenya</option>
                    <option value="UG">Uganda</option>
                    <option value="TZ">Tanzania</option>
                    <option value="RW">Rwanda</option>
                    <option value="NG">Nigeria</option>
                    <option value="GH">Ghana</option>
                    <option value="ZA">South Africa</option>
                  </select>
                </div>
                <Input
                  label="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Nairobi"
                />
              </div>

              <Input
                label="Website"
                type="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://institution.ac.ke"
              />
              <Input
                label="Contact email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@institution.ac.ke"
              />

              {message && (
                <p className="text-sm text-gold-600">{message}</p>
              )}

              <Button type="submit" disabled={saving}>
                {saving ? "Saving..." : "Save profile"}
              </Button>
            </form>
          </CardBody>
        </Card>

        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Account</CardTitle>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <p className="text-sm text-navy/60">
              Sign out of the Elimux dashboard on this device.
            </p>
            <Button variant="outline" onClick={handleLogout}>
              Sign out
            </Button>
          </CardBody>
        </Card>
      </div>
    </LayoutShell>
  );
}
'@

# =====================================================================
# Create the ZIP at the project root
# =====================================================================
Write-Host ""
Write-Host "Creating elimux-clean.zip..." -ForegroundColor Cyan

$zipFinal = Join-Path $script:Root 'elimux-clean.zip'
$zipTemp  = Join-Path (Get-Location) 'elimux-clean.zip'

if (Test-Path $zipTemp)  { Remove-Item $zipTemp  -Force }
if (Test-Path $zipFinal) { Remove-Item $zipFinal -Force }

# Build the archive from the project contents (excludes any stray prior zip),
# then place the finished zip at the project root.
Compress-Archive -Path (Join-Path $script:Root '*') -DestinationPath $zipTemp -Force
Move-Item $zipTemp $zipFinal -Force

Write-Host ""
Write-Host "PART 2 COMPLETE." -ForegroundColor Green
Write-Host "Project : $script:Root" -ForegroundColor Green
Write-Host "Archive : $zipFinal" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "  cd elimux"
Write-Host "  npm install"
Write-Host "  copy .env.example .env.local   (then add your Supabase keys)"
Write-Host "  npm run dev"