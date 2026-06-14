import { LayoutShell } from "@/components/ui/LayoutShell";
import { Card, CardBody } from "@/components/ui/Card";

export const metadata = { title: "Analytics - Elimux Dashboard" };

const DEMO_METRICS = [
  { label: "Search impressions (30d)", value: "0" },
  { label: "Profile views (30d)", value: "0" },
  { label: "Program clicks (30d)", value: "0" },
  { label: "Applications (30d)", value: "0" }
];

const DEMO_TOP_PROGRAMS = [
  { name: "BSc Computer Science", views: 0 },
  { name: "Diploma in Business Management", views: 0 },
  { name: "MSc Data Science", views: 0 }
];

export default function AnalyticsPage() {
  return (
    <LayoutShell
      title="Analytics"
      subtitle="Engagement insights for your institution"
    >
      <div className="mb-4 rounded-lg border border-gold-100 bg-gold-50 px-4 py-3 text-sm text-gold-600">
        Sample analytics shown with <strong>zeroed values</strong>. Real metrics
        populate once tracking is connected - no estimated numbers are invented.
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {DEMO_METRICS.map((m) => (
          <Card key={m.label}>
            <CardBody>
              <p className="text-xs uppercase tracking-wide text-navy/40">
                {m.label}
              </p>
              <p className="mt-2 text-2xl font-bold text-navy">{m.value}</p>
            </CardBody>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardBody>
            <h2 className="text-lg font-semibold text-navy">Top programs</h2>
            <ul className="mt-4 flex flex-col gap-3">
              {DEMO_TOP_PROGRAMS.map((p) => (
                <li
                  key={p.name}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-navy/80">{p.name}</span>
                  <span className="font-medium text-navy">
                    {p.views} views
                  </span>
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <h2 className="text-lg font-semibold text-navy">
              Engagement over time
            </h2>
            <div className="mt-4 flex h-40 items-end gap-2">
              {[0, 0, 0, 0, 0, 0, 0].map((_, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t bg-navy-50"
                  style={{ height: "8px" }}
                  aria-hidden
                />
              ))}
            </div>
            <p className="mt-3 text-xs text-navy/50">
              No data yet - chart fills as real engagement is recorded.
            </p>
          </CardBody>
        </Card>
      </div>
    </LayoutShell>
  );
}