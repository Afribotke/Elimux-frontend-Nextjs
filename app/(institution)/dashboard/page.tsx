import { LayoutShell } from "@/components/ui/LayoutShell";
import { Badge } from "@/components/ui/Badge";
import { Card, CardBody } from "@/components/ui/Card";

export const metadata = { title: "Overview - Elimux Dashboard" };

const DEMO_STATS = [
  { label: "Active programs", value: "0", hint: "Connect data to populate" },
  { label: "Students", value: "0", hint: "Connect data to populate" },
  { label: "Profile views (30d)", value: "0", hint: "Connect data to populate" },
  { label: "Verification status", value: "Unverified", hint: "Submit details to verify" }
];

const DEMO_ACTIVITY = [
  "No live activity yet - this is sample data.",
  "Connect Supabase to stream real events.",
  "Verified institutions appear publicly in search."
];

export default function DashboardOverviewPage() {
  return (
    <LayoutShell
      title="Overview"
      subtitle="Sample dashboard - connect Supabase for live data"
    >
      <div className="mb-4 rounded-lg border border-gold-100 bg-gold-50 px-4 py-3 text-sm text-gold-600">
        These figures are <strong>sample placeholders</strong>, not real
        statistics. They populate once your institution data is connected.
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {DEMO_STATS.map((s) => (
          <Card key={s.label}>
            <CardBody>
              <p className="text-xs uppercase tracking-wide text-navy/40">
                {s.label}
              </p>
              <p className="mt-2 text-2xl font-bold text-navy">{s.value}</p>
              <p className="mt-1 text-xs text-navy/50">{s.hint}</p>
            </CardBody>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[2fr_1fr]">
        <Card>
          <CardBody>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-navy">
                Getting started
              </h2>
              <Badge tone="gold">Setup</Badge>
            </div>
            <ol className="mt-4 flex flex-col gap-3 text-sm text-navy/70">
              <li>1. Complete your institution profile in Settings.</li>
              <li>2. Add your programs so students can discover them.</li>
              <li>
                3. Submit for verification - only verified institutions appear
                publicly.
              </li>
              <li>4. Track engagement in Analytics.</li>
            </ol>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <h2 className="text-lg font-semibold text-navy">Recent activity</h2>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-navy/60">
              {DEMO_ACTIVITY.map((a, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  {a}
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>
      </div>
    </LayoutShell>
  );
}