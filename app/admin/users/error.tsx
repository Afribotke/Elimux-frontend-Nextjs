"use client";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <h2 className="text-xl font-semibold text-red-600">Something went wrong</h2>
      <p className="text-muted-foreground mt-2">
        An unexpected error occurred while loading this page.
      </p>

      <button
        onClick={reset}
        className="mt-4 bg-sky-600 text-white px-4 py-2 rounded hover:bg-sky-700"
      >
        Try again
      </button>
    </div>
  );
}
