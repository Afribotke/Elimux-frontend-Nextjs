"use client";

interface PaymentsHeaderProps {
  total: number;
}

export default function PaymentsHeader({ total }: PaymentsHeaderProps) {
  return (
    <div className="flex items-center justify-between py-2">
      <h1 className="text-xl font-semibold">Payments</h1>
      <p className="text-sm text-muted-foreground">Total: {total}</p>
    </div>
  );
}
