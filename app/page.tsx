export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* HERO */}
      <section className="pt-24 pb-16 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
          Find the Best Courses.  
          <span className="text-indigo-600"> Instantly.</span>
        </h1>

        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Ask anything. Get your top 10 options.  
          Powered by AI. Built for Africa.
        </p>

        {/* SEARCH BAR */}
        <div className="mt-10 max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="e.g. Medicine in Kenya under KES 500k"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* COUNTRY SELECTOR */}
        <div className="mt-4 max-w-xs mx-auto">
          <select className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg focus:ring-2 focus:ring-indigo-500">
            <option>Kenya</option>
            <option>Uganda</option>
            <option>Tanzania</option>
            <option>Rwanda</option>
            <option>Nigeria</option>
            <option>South Africa</option>
          </select>
        </div>

        {/* EXAMPLE QUERIES */}
        <div className="mt-6 text-gray-500 text-sm">
          Try:
          <div className="mt-2 flex flex-col md:flex-row gap-2 justify-center">
            <span className="px-3 py-1 bg-gray-100 rounded-full">
              Medicine in Kenya under KES 500k
            </span>
            <span className="px-3 py-1 bg-gray-100 rounded-full">
              MBA with scholarship in Germany
            </span>
            <span className="px-3 py-1 bg-gray-100 rounded-full">
              Best IT diploma in Nairobi
            </span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} ElimuX — AI‑Powered Course Discovery
      </footer>
    </main>
  );
}
