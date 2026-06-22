"use client";

interface CoursesHeaderProps {
  total: number;
}

export default function CoursesHeader({ total }: CoursesHeaderProps) {
  return (
    <div className="flex items-center justify-between py-2">
      <h1 className="text-xl font-semibold">Courses</h1>
      <p className="text-sm text-muted-foreground">Total: {total}</p>
    </div>
  );
}
