import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface StatCard {
  label: string;
  value: string | number;
  helper?: string;
}

interface StatsCardsProps {
  items: StatCard[];
}

export function StatsCards({ items }: StatsCardsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <Card key={item.label} className="border-slate-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-slate-500">
              {item.label}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-2xl font-semibold text-slate-900">{item.value}</p>
            {item.helper ? (
              <p className="mt-1 text-xs text-slate-500">{item.helper}</p>
            ) : null}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}