import { LayoutShell } from "@/components/ui/LayoutShell";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";

export const metadata = { title: "Students - Elimux Dashboard" };

interface DemoStudent {
  id: string;
  name: string;
  program: string;
  status: "Applied" | "Enrolled" | "Graduated";
  email: string;
}

const DEMO_STUDENTS: DemoStudent[] = [
  {
    id: "demo-s1",
    name: "Sample Student A",
    program: "BSc Computer Science",
    status: "Enrolled",
    email: "sample-a@example.org"
  },
  {
    id: "demo-s2",
    name: "Sample Student B",
    program: "Diploma in Electrical Engineering",
    status: "Applied",
    email: "sample-b@example.org"
  }
];

function statusTone(status: DemoStudent["status"]) {
  if (status === "Enrolled") return "green" as const;
  if (status === "Graduated") return "navy" as const;
  return "gold" as const;
}

export default function StudentsPage() {
  return (
    <LayoutShell
      title="Students"
      subtitle="Manage applicants and enrolled students"
      actions={
        <Button size="sm" variant="secondary">
          Add student
        </Button>
      }
    >
      <div className="mb-4 rounded-lg border border-gold-100 bg-gold-50 px-4 py-3 text-sm text-gold-600">
        The rows below are <strong>sample demo records</strong> and do not
        represent real students.
      </div>

      <Card>
        <CardBody className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-navy-100 bg-navy-50 text-xs uppercase tracking-wide text-navy/50">
                <tr>
                  <th className="px-5 py-3 font-medium">Name</th>
                  <th className="px-5 py-3 font-medium">Program</th>
                  <th className="px-5 py-3 font-medium">Email</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {DEMO_STUDENTS.map((s) => (
                  <tr
                    key={s.id}
                    className="border-b border-navy-100 last:border-0"
                  >
                    <td className="px-5 py-3 font-medium text-navy">
                      {s.name}
                    </td>
                    <td className="px-5 py-3 text-navy/70">{s.program}</td>
                    <td className="px-5 py-3 text-navy/70">{s.email}</td>
                    <td className="px-5 py-3">
                      <Badge tone={statusTone(s.status)}>{s.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </LayoutShell>
  );
}