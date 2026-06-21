"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center space-y-4">
      <h1 className="text-3xl font-bold">Something went wrong</h1>
      <p className="text-gray-600">
        An unexpected error occurred while loading this page.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 mt-4">
        <button
          onClick={() => reset()}
          className="px-4 py-2 rounded bg-blue-600 text-white font-medium"
        >
          Try again
        </button>
        <Link
          href="/"
          className="px-4 py-2 rounded border border-gray-300 text-gray-700 font-medium"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}
