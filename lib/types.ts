// Shared domain types for Elimux.
// These mirror the Postgres schema. Keep in sync with the database.

export type InstitutionType =
  | "University"
  | "TVET"
  | "Polytechnic"
  | "College"
  | "Examining Body";

export type InstitutionStatus =
  | "unverified"
  | "pending"
  | "verified"
  | "suspended";

export type CourseLevel =
  | "Certificate"
  | "Diploma"
  | "Undergraduate"
  | "Postgraduate"
  | "Masters"
  | "Doctorate";

export type StudyMode = "On campus" | "Online" | "Hybrid";

export interface Institution {
  id: string;
  slug: string;
  name: string;
  type: InstitutionType;
  country_code: string;
  city: string | null;
  website: string | null;
  email: string | null;
  status: InstitutionStatus;
  established_year: number | null;
}

export interface Course {
  id: string;
  institution_id: string;
  slug: string;
  name: string;
  level: CourseLevel;
  field: string;
  duration_months: number | null;
  mode: StudyMode;
  // null means "Not disclosed" - never fabricate a value.
  tuition_fee: number | null;
  currency: string;
  min_grade: string | null;
  scholarship: boolean;
  is_active: boolean;
}

export interface CourseSearchResult {
  course_id: string;
  course_slug: string;
  course_name: string;
  level: CourseLevel;
  field: string;
  duration_months: number | null;
  mode: StudyMode;
  tuition_fee: number | null;
  currency: string;
  min_grade: string | null;
  scholarship: boolean;
  institution_id: string;
  institution_slug: string;
  institution_name: string;
  institution_type: InstitutionType;
  country_code: string;
  city: string | null;
  rank: number;
}

export interface SearchParams {
  query?: string;
  country?: string;
  level?: CourseLevel | "";
  mode?: StudyMode | "";
  maxFee?: number | null;
  limit?: number;
  offset?: number;
}

/**
 * Formats a tuition fee for display.
 * When the value is null (unknown), returns "Not disclosed" - never a fabricated number.
 */
export function formatTuition(
  fee: number | null,
  currency: string | null
): string {
  if (fee === null || fee === undefined) {
    return "Not disclosed";
  }
  const cur = currency || "KES";
  return `${cur} ${fee.toLocaleString("en-KE")}`;
}



