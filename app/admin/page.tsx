import React from "react";

async function fetchCount(endpoint: string) {
  try {
    const res = await fetch(`http://localhost:3000/api/admin/${endpoint}`, {
      cache: "no-store",
    });
    const data = await res.json();
    return Array.isArray(data) ? data.length : 0;
  } catch (e) {
    return 0;
  }
}

export default async function AdminDashboardPage() {
  const [users, institutions, programs, countries] = await Promise.all([
    fetchCount("users"),
    fetchCount("institutions"),
    fetchCount("programs"),
    fetchCount("countries"),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">
          Dashboard Overview
        </h1>
        <p className="text-sm text-slate-500">
          High-level view of ElimuX activity and configuration.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Users
          </p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">{users}</p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Institutions
          </p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">{institutions}</p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Programs
          </p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">{programs}</p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Countries
          </p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">{countries}</p>
        </div>
      </div>
    </div>
  );
}

