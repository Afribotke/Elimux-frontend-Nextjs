import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center space-y-4">
      <h1 className="text-3xl font-bold">Page not found</h1>
      <p className="text-gray-600">
        The page you are looking for does not exist or may have been moved.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 mt-4">
        <Link
          href="/"
          className="px-4 py-2 rounded bg-blue-600 text-white font-medium"
        >
          Go to Home
        </Link>
        <Link
          href="/discover"
          className="px-4 py-2 rounded border border-gray-300 text-gray-700 font-medium"
        >
          Browse Programs & Exams
        </Link>
      </div>
    </div>
  );
}