import { OnboardingProgress } from "./_components/OnboardingProgress"
import type { InstitutionOnboarding } from "@/types/institution-onboarding"

async function getOnboarding(id: string): Promise<InstitutionOnboarding> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/institutions/${id}/onboarding`,
    { cache: "no-store" }
  )
  if (!res.ok) throw new Error("Failed to load onboarding state")
  return res.json()
}

export default async function InstitutionOnboardingPage({
  params,
}: {
  params: { id: string }
}) {
  const onboarding = await getOnboarding(params.id)

  return (
    <main className="p-6 space-y-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-semibold tracking-tight">
        Onboarding Progress
      </h1>

      <OnboardingProgress status={onboarding.verification_status} />

      <section className="space-y-2">
        <h2 className="text-sm font-semibold">Institution Info</h2>
        <p className="text-sm text-muted-foreground">
          {onboarding.name} â€¢ {onboarding.type} â€¢ {onboarding.country}
        </p>
      </section>
    </main>
  )
}