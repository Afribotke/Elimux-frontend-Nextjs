import Link from "next/link";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">

      {/* HERO SECTION */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold">
          Discover Programs & Exams Across Africa
        </h1>
        <p className="text-gray-600 text-lg">
          Search, explore, and compare academic opportunities instantly.
        </p>

        <form action="/discover" className="mt-6">
          <input
            type="text"
            name="q"
            placeholder="Search programs or exams..."
            className="w-full border rounded px-4 py-3 text-lg"
          />
        </form>
      </section>

      {/* CATEGORY SHORTCUTS */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Browse by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {[
            { slug: "stem", label: "STEM" },
            { slug: "business", label: "Business" },
            { slug: "medicine", label: "Medicine" },
            { slug: "ict", label: "ICT" },
            { slug: "arts", label: "Arts" },
          ].map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="bg-white shadow rounded p-4 text-center font-medium"
            >
              {cat.label}
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED PROGRAMS */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Featured Programs</h2>
        <div className="space-y-3">
          <Link
            href="/discover?q=engineering"
            className="block bg-white shadow rounded p-4"
          >
            <h3 className="font-semibold">Engineering Programs</h3>
            <p className="text-sm text-gray-600">Top STEM courses</p>
          </Link>

          <Link
            href="/discover?q=business"
            className="block bg-white shadow rounded p-4"
          >
            <h3 className="font-semibold">Business & Commerce</h3>
            <p className="text-sm text-gray-600">Accounting, Finance, Marketing</p>
          </Link>
        </div>
      </section>

      {/* FEATURED INSTITUTIONS */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Featured Institutions</h2>
        <div className="space-y-3">
          <Link
            href="/discover?q=university"
            className="block bg-white shadow rounded p-4"
          >
            <h3 className="font-semibold">Top Universities</h3>
            <p className="text-sm text-gray-600">Explore leading institutions</p>
          </Link>

          <Link
            href="/discover?q=college"
            className="block bg-white shadow rounded p-4"
          >
            <h3 className="font-semibold">Accredited Colleges</h3>
            <p className="text-sm text-gray-600">Trusted learning centers</p>
          </Link>
        </div>
      </section>

    </div>
  );
}