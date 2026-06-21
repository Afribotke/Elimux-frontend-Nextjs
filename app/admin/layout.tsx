export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="font-bold">ElimuX Admin</h1>
          <nav className="flex gap-4 text-sm">
            <a href="/admin/institutions">Institutions</a>
            <a href="/admin/programs">Programs</a>
            <a href="/admin/exams">Exams</a>
          </nav>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
}