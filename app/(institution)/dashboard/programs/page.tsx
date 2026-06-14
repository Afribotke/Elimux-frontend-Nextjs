import { LayoutShell } from "@/components/ui/LayoutShell";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";
import { formatTuition, type Course } from "@/lib/types";

export const metadata = { title: "Programs - Elimux Dashboard" };

const DEMO_PROGRAMS: Course[] = [
  {
    id: "demo-p1",
    institution_id: "demo-inst-1",
    slug: "bsc-computer-science",
    name: "BSc Computer Science",
    level: "Undergraduate",
    field: "Computing & IT",
    duration_months: 48,
    mode: "On campus",
    tuition_fee: null,
    currency: "KES",
    min_grade: "B (Plain)",
    scholarship: true,
    is_active: true
  },
  {
    id: "demo-p2",
    institution_id: "demo-inst-1",
    slug: "diploma-business",
    name: "Diploma in Business Management",
    level: "Diploma",
    field: "Business",
    duration_months: 24,
    mode: "Hybrid",
    tuition_fee: null,
    currency: "KES",
    min_grade: "C- (Minus)",
    scholarship: false,
    is_active: false
  }
];

export default function ProgramsPage() {
  return (
    <LayoutShell
      title="Programs"
      subtitle="Add and manage the courses you offer"
      actions={
        <Button size="sm" variant="secondary">
          Add program
        </Button>
      }
    >
      <div className="mb-4 rounded-lg border border-gold-100 bg-gold-50 px-4 py-3 text-sm text-gold-600">
        These are <strong>sample programs</strong>. Where tuition is not
        provided, Elimux shows Not disclosed - never an invented figure.
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {DEMO_PROGRAMS.map((p) => (
          <Card key={p.id}>
            <CardBody>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-base font-semibold text-navy">
                    {p.name}
                  </h3>
                  <p className="mt-0.5 text-sm text-navy/60">{p.field}</p>
                </div>
                <Badge tone={p.is_active ? "green" : "gray"}>
                  {p.is_active ? "Active" : "Inactive"}
                </Badge>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                <Badge tone="navy">{p.level}</Badge>
                <Badge tone="gray">{p.mode}</Badge>
                {p.duration_months != null && (
                  <Badge tone="gray">{p.duration_months} months</Badge>
                )}
                {p.scholarship && (
                  <Badge tone="green">Scholarship</Badge>
                )}
              </div>

              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm font-semibold text-navy">
                  {formatTuition(p.tuition_fee, p.currency)}
                </p>
                <Button size="sm" variant="outline">
                  Edit
                </Button>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </LayoutShell>
  );
}