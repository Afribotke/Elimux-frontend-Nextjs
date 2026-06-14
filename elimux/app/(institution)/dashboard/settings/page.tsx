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