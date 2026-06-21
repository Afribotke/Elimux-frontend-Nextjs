"use client";

import { useEffect, useState } from "react";
import { getSupabaseClient } from "@/lib/supabaseClient";

export default function DashboardPage() {
  const supabase = getSupabaseClient();
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    async function loadUser() {
      if (!supabase) return;
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) setUserEmail(user.email ?? null);
    }
    loadUser();
  }, [supabase]);

  async function handleLogout() {
    if (!supabase) return;
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      {userEmail ? (
        <p className="text-gray-700">Logged in as: {userEmail}</p>
      ) : (
        <p className="text-gray-500">Loading user...</p>
      )}
      <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}
