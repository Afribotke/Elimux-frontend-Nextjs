import { getSupabaseClient } from "@/lib/supabase/client";
import type { CourseSearchResult, SearchParams } from "@/lib/types";

/**
 * Clearly-marked DEMO data.
 * Only used when Supabase is not configured or returns no rows, so the UI
 * always renders. Flagged via isDemo and never presented as verified data.
 * Tuition values left as null demonstrate the "Not disclosed" behaviour.
 */
const DEMO_RESULTS: CourseSearchResult[] = [
  {
    course_id: "demo-1",
    course_slug: "bsc-computer-science",
    course_name: "BSc Computer Science",
    level: "Undergraduate",
    field: "Computing & IT",
    duration_months: 48,
    mode: "On campus",
    tuition_fee: null,
    currency: "KES",
    min_grade: "B (Plain)",
    scholarship: true,
    institution_id: "demo-inst-1",
    institution_slug: "demo-university",
    institution_name: "Demo University (sample data)",
    institution_type: "University",
    country_code: "KE",
    city: "Nairobi",
    rank: 1
  },
  {
    course_id: "demo-2",
    course_slug: "diploma-electrical-engineering",
    course_name: "Diploma in Electrical Engineering",
    level: "Diploma",
    field: "Engineering",
    duration_months: 36,
    mode: "Hybrid",
    tuition_fee: null,
    currency: "KES",
    min_grade: "C- (Minus)",
    scholarship: false,
    institution_id: "demo-inst-2",
    institution_slug: "demo-tvet",
    institution_name: "Demo Technical College (sample data)",
    institution_type: "TVET",
    country_code: "KE",
    city: "Mombasa",
    rank: 2
  },
  {
    course_id: "demo-3",
    course_slug: "msc-data-science",
    course_name: "MSc Data Science",
    level: "Masters",
    field: "Computing & IT",
    duration_months: 24,
    mode: "Online",
    tuition_fee: null,
    currency: "KES",
    min_grade: "Second Class Upper",
    scholarship: true,
    institution_id: "demo-inst-1",
    institution_slug: "demo-university",
    institution_name: "Demo University (sample data)",
    institution_type: "University",
    country_code: "KE",
    city: "Nairobi",
    rank: 3
  }
];

export interface SearchResponse {
  results: CourseSearchResult[];
  isDemo: boolean;
  error: string | null;
}

function filterDemo(params: SearchParams): CourseSearchResult[] {
  const q = (params.query || "").trim().toLowerCase();
  return DEMO_RESULTS.filter((r) => {
    if (q) {
      const haystack =
        `${r.course_name} ${r.field} ${r.institution_name}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    if (params.country && r.country_code !== params.country) return false;
    if (params.level && r.level !== params.level) return false;
    if (params.mode && r.mode !== params.mode) return false;
    if (
      params.maxFee != null &&
      r.tuition_fee != null &&
      r.tuition_fee > params.maxFee
    ) {
      return false;
    }
    return true;
  });
}

/**
 * Searches courses via the Postgres search_courses RPC.
 * Signature: search_courses(p_query, p_country, p_level, p_mode, p_max_fee, p_limit, p_offset)
 * Falls back to clearly-marked demo data when unconfigured, errored, or empty.
 */
export async function searchCourses(
  params: SearchParams
): Promise<SearchResponse> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return { results: filterDemo(params), isDemo: true, error: null };
  }

  try {
    const { data, error } = await supabase.rpc("search_courses", {
      p_query: params.query ?? null,
      p_country: params.country ?? null,
      p_level: params.level ? params.level : null,
      p_mode: params.mode ? params.mode : null,
      p_max_fee: params.maxFee ?? null,
      p_limit: params.limit ?? 20,
      p_offset: params.offset ?? 0
    });

    if (error) {
      return {
        results: filterDemo(params),
        isDemo: true,
        error: error.message
      };
    }

    const rows = (data ?? []) as CourseSearchResult[];

    if (rows.length === 0) {
      return { results: filterDemo(params), isDemo: true, error: null };
    }

    return { results: rows, isDemo: false, error: null };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return { results: filterDemo(params), isDemo: true, error: message };
  }
}