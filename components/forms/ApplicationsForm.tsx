import React, { useState } from 'react';
import { FormField } from '../common/FormField';
import { createApplications } from '@/lib/hooks/useApplications';

export function ApplicationsForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    student_id: '',
    program_id: '',
    status: '',
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await createApplications(form);
      setForm({
        student_id: '',
        program_id: '',
        status: '',
      });
    } catch (err) { setError(err.message); }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-lg font-semibold">Applications Form</h2>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <FormField label="Student Id" name="student_id">
        <input name="student_id" value={form.student_id} onChange={handleChange} className="border px-3 py-2 rounded w-full" />
      </FormField>
      <FormField label="Program Id" name="program_id">
        <input name="program_id" value={form.program_id} onChange={handleChange} className="border px-3 py-2 rounded w-full" />
      </FormField>
      <FormField label="Status" name="status">
        <input name="status" value={form.status} onChange={handleChange} className="border px-3 py-2 rounded w-full" />
      </FormField>
      <button disabled={loading} className="bg-indigo-600 text-white px-4 py-2 rounded">
        {loading ? "Saving..." : "Save"}
      </button>
    </form>
  );
}



