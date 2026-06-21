import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardBody } from "@/components/ui/Card";
import { HeroSearch } from "@/app/(public)/HeroSearch";

const FEATURES = [
  {
    title: "Verified institutions only",
    body: "We only show universities, TVETs and colleges that pass verification - so your decision rests on real data."
  },
  {
    title: "Honest fees",
    body: "When an institution has not disclosed tuition, we show Not disclosed - never an invented number."
  },
  {
    title: "Kenya-first, globally scalable",
    body: "Built for African students, with bilingual (English/Swahili) context and worldwide reach."
  }
];

export default function HomePage() {
  return (
    <div>
      <section className="bg-navy text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
          <div className="max-w-3xl">
            <span className="inline-flex items-center rounded-full bg-gold/15 px-3 py-1 text-xs font-medium text-gold">
              By AfriBot AI
            </span>
            <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-5xl">
              Discover the right course at the right institution.
            </h1>
            <p className="mt-4 max-w-2xl text-base text-navy-100 sm:text-lg">
              Elimux helps you search verified institutions and courses across
              Africa using real, accurate data. Make life decisions with
              confidence.
            </p>
          </div>

          <div className="mt-8 max-w-3xl">
            <HeroSearch />
          </div>
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-bold text-navy">Why Elimux</h2>
        <p className="mt-2 max-w-2xl text-navy/60">
          A student may make a life decision based on what Elimux shows. That is
          why accuracy is non-negotiable.
        </p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <Card key={f.title}>
              <CardBody>
                <h3 className="text-lg font-semibold text-navy">{f.title}</h3>
                <p className="mt-2 text-sm text-navy/60">{f.body}</p>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-gold-50">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-4 px-4 py-12 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-navy">
              Are you an institution?
            </h2>
            <p className="mt-1 text-navy/60">
              List your programs, manage students, and reach more applicants.
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/register">
              <Button variant="secondary">List your institution</Button>
            </Link>
            <Link href="/login">
              <Button variant="outline">Institution login</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
