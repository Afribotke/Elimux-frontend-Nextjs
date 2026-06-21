"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";

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



