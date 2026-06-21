"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
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
