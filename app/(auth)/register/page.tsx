export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-sm bg-white border rounded-lg p-6 shadow-sm">
        <h1 className="text-xl font-semibold text-slate-800 mb-4">Create Account</h1>

        <form className="space-y-4">
          <div>
            <label className="block text-sm text-slate-600 mb-1">Full Name</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2 text-sm"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-1">Email</label>
            <input
              type="email"
              className="w-full border rounded px-3 py-2 text-sm"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-1">Password</label>
            <input
              type="password"
              className="w-full border rounded px-3 py-2 text-sm"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-slate-900 text-white py-2 rounded text-sm hover:bg-slate-800"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
