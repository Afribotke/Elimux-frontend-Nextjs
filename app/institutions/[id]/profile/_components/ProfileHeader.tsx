import type { InstitutionProfile } from "@/types/institution-profile"

export function ProfileHeader({ profile }: { profile: InstitutionProfile }) {
  return (
    <header className="flex items-center justify-between gap-4">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          {profile.name}
        </h1>
        <p className="text-sm text-muted-foreground">
          {profile.type.toUpperCase()} â€¢ {profile.country}
        </p>
      </div>

      {profile.logo_url && (
        <img
          src={profile.logo_url}
          alt={profile.name}
          className="h-12 w-12 rounded-md object-cover border"
        />
      )}
    </header>
  )
}