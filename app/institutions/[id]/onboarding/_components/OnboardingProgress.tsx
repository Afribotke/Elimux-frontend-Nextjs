export function OnboardingProgress({
  status,
}: {
  status: "pending" | "approved" | "rejected"
}) {
  const steps = [
    { label: "Account Created", done: true },
    { label: "Documents Submitted", done: status !== "pending" },
    { label: "Verification Complete", done: status === "approved" },
  ]

  return (
    <ul className="space-y-3">
      {steps.map((s, i) => (
        <li key={i} className="flex items-center gap-3">
          <div
            className={`h-4 w-4 rounded-full ${
              s.done ? "bg-green-500" : "bg-gray-300"
            }`}
          />
          <span className="text-sm">{s.label}</span>
        </li>
      ))}
    </ul>
  )
}