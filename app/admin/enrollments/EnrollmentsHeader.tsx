"use client";

interface EnrollmentsHeaderProps {
  total: number;
}

export default function EnrollmentsHeader({ total }: EnrollmentsHeaderProps) {
  return (
    <div className="flex items-center justify-between py-2">
      <h1 className="text-xl font-semibold">Enrollments</h1>
      <p className="text-sm text-muted-foreground">Total: {total}</p>
    </div>
  );
}
