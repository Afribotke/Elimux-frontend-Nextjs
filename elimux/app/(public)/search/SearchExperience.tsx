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