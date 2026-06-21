"use client";

export default function CoursesError() {
  return (
    <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
      <h2 className="text-lg font-semibold text-red-700">Error Loading Courses</h2>
      <p className="text-sm text-red-600 mt-2">
        Something went wrong while loading course data.
      </p>
      <button
        onClick={() => location.reload()}
        className="mt-4 bg-slate-900 text-white px-4 py-2 rounded text-sm hover:bg-slate-800"
      >
        Retry
      </button>
    </div>
  );
}
