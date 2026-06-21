export default function SearchExperience() {
  return (
    <div className="p-6 bg-white border rounded-lg shadow-sm">
      <h1 className="text-xl font-semibold text-slate-800 mb-4">Search</h1>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Search programs or institutions..."
          className="w-full border rounded px-3 py-2 text-sm"
        />

        <button className="bg-slate-900 text-white px-4 py-2 rounded text-sm hover:bg-slate-800">
          Search
        </button>
      </div>
    </div>
  );
}
