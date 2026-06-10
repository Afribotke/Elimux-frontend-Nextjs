type TopbarProps = {
  title: string;
  institutionName: string;
};

export default function Topbar({ title, institutionName }: TopbarProps) {
  return (
    <header className="flex items-center justify-between border-b border-gray-200 bg-white px-8 py-4">
      <h1 className="text-xl font-semibold text-ink">{title}</h1>
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-500">{institutionName}</span>
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy text-sm font-semibold text-white">
          {institutionName.charAt(0)}
        </span>
      </div>
    </header>
  );
}
