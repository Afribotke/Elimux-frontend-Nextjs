import { LayoutShell } from "@/components/ui/LayoutShell";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";
import type { Institution, InstitutionStatus } from "@/lib/types";

export const metadata = { title: "Institutions - Elimux Dashboard" };

const DEMO_INSTITUTIONS: Institution[] = [
  {
    id: "demo-inst-1",
    slug: "demo-university",
    name: "Demo University (sample data)",
    type: "University",
    country_code: "KE",
    city: "Nairobi",
    website: "https://example.org",
    email: "admin@example.org",
    status: "unverified",
    established_year: 1998
  }
];

function statusTone(status: InstitutionStatus) {
  switch (status) {
    case "verified":
      return "green" as const;
    case "pending":
      return "gold" as const;
    case "suspended":
      return "red" as const;
    default:
      return "gray" as const;
  }
}

export default function InstitutionsPage() {
  return (
    <LayoutShell
      title="Institutions"
      subtitle="Your institution profile and verification"
      actions={
        <Button size="sm" variant="secondary">
          Submit for verification
        </Button>
      }
    >
      <div className="mb-4 rounded-lg border border-gold-100 bg-gold-50 px-4 py-3 text-sm text-gold-600">
        Sample profile shown. Only <strong>verified</strong> institutions appear
        publicly in Elimux search.
      </div>

      <div className="grid gap-4">
        {DEMO_INSTITUTIONS.map((inst) => (
          <Card key={inst.id}>
            <CardBody>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-navy">
                      {inst.name}
                    </h3>
                    <Badge tone={statusTone(inst.status)}>
                      {inst.status}
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm text-navy/60">
                    {inst.type} - {inst.city ?? "-"} - {inst.country_code}
                  </p>

                  <dl className="mt-4 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
                    <div>
                      <dt className="text-navy/40">Website</dt>
                      <dd className="text-navy/80">
                        {inst.website ?? "Not disclosed"}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-navy/40">Email</dt>
                      <dd className="text-navy/80">
                        {inst.email ?? "Not disclosed"}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-navy/40">Established</dt>
                      <dd className="text-navy/80">
                        {inst.established_year ?? "Not disclosed"}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-navy/40">Slug</dt>
                      <dd className="text-navy/80">{inst.slug}</dd>
                    </div>
                  </dl>
                </div>

                <Button size="sm" variant="outline">
                  Edit profile
                </Button>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </LayoutShell>
  );
}