"use client"

import { useState } from "react"

export default function InstitutionOnboardPage() {
  const [loading, setLoading] = useState(false)

  async function submitForm(e: any) {
    e.preventDefault()
    setLoading(true)

    const form = new FormData(e.target)
    const payload = Object.fromEntries(form.entries())

    await fetch("/api/institutions/onboard", {
      method: "POST",
      body: JSON.stringify(payload),
    })

    setLoading(false)
    alert("Institution onboarding started successfully.")
  }

  return (
    <main className="p-6 max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">
        Institution Onboarding
      </h1>

      <form onSubmit={submitForm} className="space-y-4">
        <input name="name" placeholder="Institution Name" className="input" required />
        <input name="type" placeholder="Type (University, College, etc.)" className="input" required />
        <input name="country" placeholder="Country" className="input" required />
        <input name="email" placeholder="Email" className="input" required />
        <input name="phone" placeholder="Phone" className="input" />
        <input name="website" placeholder="Website" className="input" />

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full"
        >
          {loading ? "Submitting..." : "Start Onboarding"}
        </button>
      </form>
    </main>
  )
}