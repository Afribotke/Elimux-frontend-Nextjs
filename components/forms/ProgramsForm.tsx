import React, { useState } from 'react';
import { FormField } from '../common/FormField';
import { createPrograms } from '@/lib/hooks/usePrograms';

export function ProgramsForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    name: '',
    level: '',
    duration_months: '',
    tuition_fee: '',
    mode: '',
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await createPrograms(form);
      setForm({
        name: '',
        level: '',
        duration_months: '',
        tuition_fee: '',
        mode: '',
      });
    } catch (err) { setError(err.message); }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-lg font-semibold">Programs Form</h2>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <FormField label="Name" name="name">
        <input name="name" value={form.name} onChange={handleChange} className="border px-3 py-2 rounded w-full" />
      </FormField>
      <FormField label="Level" name="level">
        <input name="level" value={form.level} onChange={handleChange} className="border px-3 py-2 rounded w-full" />
      </FormField>
      <FormField label="Duration Months" name="duration_months">
        <input name="duration_months" value={form.duration_months} onChange={handleChange} className="border px-3 py-2 rounded w-full" />
      </FormField>
      <FormField label="Tuition Fee" name="tuition_fee">
        <input name="tuition_fee" value={form.tuition_fee} onChange={handleChange} className="border px-3 py-2 rounded w-full" />
      </FormField>
      <FormField label="Mode" name="mode">
        <input name="mode" value={form.mode} onChange={handleChange} className="border px-3 py-2 rounded w-full" />
      </FormField>
      <button disabled={loading} className="bg-indigo-600 text-white px-4 py-2 rounded">
        {loading ? "Saving..." : "Save"}
      </button>
    </form>
  );
}

