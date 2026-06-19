param(
  [string]$ProjectRoot = (Get-Location),
  [switch]$SkipGit
)

Write-Host "==> Starting Students Dashboard automation (Option C)..." -ForegroundColor Cyan

$ProjectRoot = (Resolve-Path $ProjectRoot).Path
Write-Host "Using project root: $ProjectRoot" -ForegroundColor Yellow

# 1) Ensure folders exist
$paths = @(
  "types",
  "app/api/institutions/[id]/students",
  "app/api/institutions/[id]/students/summary",
  "app/institutions/[id]/students",
  "app/institutions/[id]/students/_components"
)

foreach ($p in $paths) {
  $full = Join-Path $ProjectRoot $p
  if (-not (Test-Path $full)) {
    Write-Host "Creating folder: $full" -ForegroundColor Yellow
    New-Item -ItemType Directory -Path $full -Force | Out-Null
  } else {
    Write-Host "Folder exists: $full" -ForegroundColor DarkGray
  }
}

function Write-File($relativePath, $content) {
  $fullPath = Join-Path $ProjectRoot $relativePath
  Write-Host "Writing: $fullPath" -ForegroundColor Green
  $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
  [System.IO.File]::WriteAllText($fullPath, $content, $utf8NoBom)
}

# 2) Types for students + summary
Write-File "types/student.ts" @'
export interface Student {
  id: string
  institution_id: string
  name: string
  email: string | null
  country: string | null
  created_at: string
}

export interface StudentSummary {
  student_id: string
  institution_id: string
  name: string
  email: string | null
  country: string | null
  total_applications: number
  total_programs: number
  created_at: string
}
'@

# 3) API: /api/institutions/[id]/students (raw list)
Write-File "app/api/institutions/[id]/students/route.ts" @'
import { NextResponse } from "next/server"
import { createSupabaseServer } from "@/lib/supabase/server"
import type { Student } from "@/types/student"

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createSupabaseServer()

  const { data, error } = await supabase
    .from("students")
    .select("*")
    .eq("institution_id", params.id)
    .order("created_at", { ascending: false })
    .returns<Student[]>()

  if (error) {
    return NextResponse.json(
      { error: "Failed to fetch students" },
      { status: 500 }
    )
  }

  return NextResponse.json(data ?? [])
}
'@

# 4) API: /api/institutions/[id]/students/summary (view)
Write-File "app/api/institutions/[id]/students/summary/route.ts" @'
import { NextResponse } from "next/server"
import { createSupabaseServer } from "@/lib/supabase/server"
import type { StudentSummary } from "@/types/student"

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createSupabaseServer()

  const { data, error } = await supabase
    .from("institution_students_summary")
    .select("*")
    .eq("institution_id", params.id)
    .order("created_at", { ascending: false })
    .returns<StudentSummary[]>()

  if (error) {
    return NextResponse.json(
      { error: "Failed to fetch student summaries" },
      { status: 500 }
    )
  }

  return NextResponse.json(data ?? [])
}
'@

# 5) UI component: StudentCard
Write-File "app/institutions/[id]/students/_components/StudentCard.tsx" @'
import type { Student, StudentSummary } from "@/types/student"

type Props = {
  student: Student
  summary?: StudentSummary
}

export function StudentCard({ student, summary }: Props) {
  return (
    <article className="rounded-lg border bg-card p-4 shadow-sm space-y-2">
      <header className="flex items-center justify-between gap-2">
        <div>
          <h3 className="font-medium">{student.name}</h3>
          <p className="text-xs text-muted-foreground">
            {student.email ?? "No email"}
          </p>
        </div>
        <span className="text-xs text-muted-foreground">
          {new Date(student.created_at).toLocaleDateString()}
        </span>
      </header>

      <div className="text-xs text-muted-foreground">
        Country:{" "}
        <span className="font-semibold">
          {student.country ?? "Unknown"}
        </span>
      </div>

      {summary && (
        <dl className="grid grid-cols-2 gap-2 text-xs mt-2">
          <div>
            <dt className="text-muted-foreground">Applications</dt>
            <dd className="font-semibold">
              {summary.total_applications}
            </dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Programs</dt>
            <dd className="font-semibold">
              {summary.total_programs}
            </dd>
          </div>
        </dl>
      )}
    </article>
  )
}
'@

# 6) UI page: /institutions/[id]/students
Write-File "app/institutions/[id]/students/page.tsx" @'
import { StudentCard } from "./_components/StudentCard"
import type { Student, StudentSummary } from "@/types/student"

async function getStudents(id: string): Promise<Student[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/institutions/${id}/students`,
    { cache: "no-store" }
  )
  if (!res.ok) throw new Error("Failed to load students")
  return res.json()
}

async function getStudentSummaries(id: string): Promise<StudentSummary[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/institutions/${id}/students/summary`,
    { cache: "no-store" }
  )
  if (!res.ok) throw new Error("Failed to load student summaries")
  return res.json()
}

export default async function InstitutionStudentsPage({
  params,
}: {
  params: { id: string }
}) {
  const [students, summaries] = await Promise.all([
    getStudents(params.id),
    getStudentSummaries(params.id),
  ])

  const summaryById = new Map(
    summaries.map((s) => [s.student_id, s])
  )

  return (
    <main className="p-6 space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          Students
        </h1>
        <p className="text-sm text-muted-foreground">
          Students associated with this institution, with basic engagement metrics.
        </p>
      </header>

      {students.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No students found for this institution.
        </p>
      ) : (
        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {students.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
              summary={summaryById.get(student.id)}
            />
          ))}
        </section>
      )}
    </main>
  )
}
'@

# 7) Git commit
if (-not $SkipGit) {
  if (Test-Path (Join-Path $ProjectRoot ".git")) {
    Write-Host "Staging changes with git..." -ForegroundColor Cyan
    git -C $ProjectRoot add .
    git -C $ProjectRoot commit -m "Add students dashboard (API + UI, Option C)" | Out-Null
  } else {
    Write-Host "No .git repo found, skipping git steps." -ForegroundColor DarkGray
  }
}

Write-Host "==> Students Dashboard automation complete." -ForegroundColor Cyan
