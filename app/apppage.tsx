=== app/page.tsx ===
export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="max-w-xl text-center space-y-4">
        <h1 className="text-3xl font-bold">ElimuX Admin Portal</h1>
        <p className="text-slate-600">
          Use the institution dashboard to manage programs, courses, and students.
        </p>
      </div>
    </main>
  );
}
