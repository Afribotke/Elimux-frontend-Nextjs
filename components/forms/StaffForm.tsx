import React, { useState } from 'react';
import { FormField } from '../common/FormField';
import { createStaff } from '@/lib/hooks/useStaff';

export function StaffForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    role: '',
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await createStaff(form);
      setForm({
        first_name: '',
        last_name: '',
        role: '',
      });
    } catch (err) { setError(err.message); }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-lg font-semibold">Staff Form</h2>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <FormField label="First Name" name="first_name">
        <input name="first_name" value={form.first_name} onChange={handleChange} className="border px-3 py-2 rounded w-full" />
      </FormField>
      <FormField label="Last Name" name="last_name">
        <input name="last_name" value={form.last_name} onChange={handleChange} className="border px-3 py-2 rounded w-full" />
      </FormField>
      <FormField label="Role" name="role">
        <input name="role" value={form.role} onChange={handleChange} className="border px-3 py-2 rounded w-full" />
      </FormField>
      <button disabled={loading} className="bg-indigo-600 text-white px-4 py-2 rounded">
        {loading ? "Saving..." : "Save"}
      </button>
    </form>
  );
}



