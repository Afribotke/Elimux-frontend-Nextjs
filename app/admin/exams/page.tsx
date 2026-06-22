"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/Badge";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function ExamsPage() {
  const supabase = createClientComponentClient();
  const [exams, setExams] = useState<any[]>([]);

  async function loadExams() {
    const { data } = await supabase.from("exams").select("*");
    setExams(data || []);
  }

  useEffect(() => {
    loadExams();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Exams</h1>

      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b bg-slate-50">
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {exams.map((exam) => (
            <tr key={exam.id} className="border-b">
              <td className="p-3">{exam.name}</td>
              <td className="p-3">
                <Badge className={exam.active ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}>
                  {exam.active ? "Active" : "Inactive"}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

