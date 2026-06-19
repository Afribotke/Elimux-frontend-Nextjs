import { ProfileHeader } from "./_components/ProfileHeader"
import { ProfileStats } from "./_components/ProfileStats"
import type { InstitutionProfile, InstitutionProfileStats } from "@/types/institution-profile"

async function getProfile(id: string): Promise<InstitutionProfile> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/institutions/${id}/profile`,
    { cache: "no-store" }
  )
  if (!res.ok) throw new Error("Failed to load profile")
  return res.json()
}

async function getStats(id: string): Promise<InstitutionProfileStats> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/institutions/${id}/profile/stats`,
    { cache: "no-store" }
  )
  if (!res.ok) throw new Error("Failed to load stats")
  return res.json()
}

export default async function InstitutionProfilePage({ params }: { params: { id: string } }) {
  const [profile, stats] = await Promise.all([
    getProfile(params.id),
    getStats(params.id),
  ])

  return (
    <main className="p-6 space-y-6">
      <ProfileHeader profile={profile} />
      <ProfileStats stats={stats} />

      <section className="space-y-2">
        <h2 className="text-sm font-semibold">About</h2>
        <p className="text-sm text-muted-foreground">
          {profile.description ?? "No description provided."}
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-semibold">Contact</h2>
        <p className="text-sm text-muted-foreground">
          {profile.contact_name ?? "N/A"} â€¢ {profile.contact_email ?? "N/A"} â€¢ {profile.contact_phone ?? "N/A"}
        </p>
      </section>
    </main>
  )
}