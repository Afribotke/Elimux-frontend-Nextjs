"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function ProgramsPage() {
  const supabase = createClientComponentClient();
  const [programs, setPrograms] = useState([]);

  async function loadPrograms() {
    const { data } = await supabase.from("programs").select("*");
    setPrograms(data || []);
  }

  useEffect(() => {
    loadPrograms();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Programs</h1>

      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b bg-slate-50">
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Category</th>
          </tr>
        </thead>
        <tbody>
          {programs.map((p) => (
            <tr key={p.id} className="border-b">
              <td className="p-3">{p.name}</td>
              <td className="p-3">{p.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
