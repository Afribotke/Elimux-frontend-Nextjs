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



