type Props = {
  label: string
  value: number
}

export function StatCard({ label, value }: Props) {
  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="text-2xl font-semibold">{value}</div>
    </div>
  )
}
