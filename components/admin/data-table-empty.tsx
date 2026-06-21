import { ReactNode } from "react";

interface DataTableEmptyProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export function DataTableEmpty({ title, description, action }: DataTableEmptyProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
      <p className="text-sm font-medium text-slate-700">{title}</p>
      {description ? (
        <p className="max-w-md text-xs text-slate-500">{description}</p>
      ) : null}
      {action ? <div className="mt-3">{action}</div> : null}
    </div>
  );
}

