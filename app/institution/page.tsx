export default function InstitutionDashboard() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Institution Dashboard</h1>
      <p className="text-slate-600">
        Welcome to your ElimuX institution control panel.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded shadow">Programs</div>
        <div className="p-4 bg-white rounded shadow">Courses</div>
        <div className="p-4 bg-white rounded shadow">Students</div>
      </div>
    </div>
  );
}
