"use client";

interface UsersHeaderProps {
  total: number;
}

export default function UsersHeader({ total }: UsersHeaderProps) {
  return (
    <div className="flex items-center justify-between py-2">
      <h1 className="text-xl font-semibold">UsersHeader</h1>
      <p className="text-sm text-muted-foreground">Total: {total}</p>
    </div>
  );
}
