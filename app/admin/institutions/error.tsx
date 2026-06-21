"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function InstitutionsError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error("Institutions page error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
      <h2 className="text-lg font-semibold text-slate-800">Something went wrong</h2>
      <p className="max-w-sm text-sm text-slate-500">
        We couldn't load the institutions page. This may be a temporary issue.
      </p>

      <Button onClick={reset} className="bg-sky-600 text-white hover:bg-sky-700">
        Try again
      </Button>
    </div>
  );
}
