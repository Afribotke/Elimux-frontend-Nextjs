"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="min-h-screen flex flex-col items-center justify-center px-4 text-center space-y-4">
        <h1 className="text-3xl font-bold">Critical error</h1>
        <p className="text-gray-600">
          A critical error occurred. Please try again.
        </p>
        <button
          onClick={() => reset()}
          className="px-4 py-2 rounded bg-blue-600 text-white font-medium"
        >
          Reload
        </button>
      </body>
    </html>
  );
}



