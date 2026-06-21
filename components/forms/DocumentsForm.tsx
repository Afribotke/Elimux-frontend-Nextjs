import React, { useState } from 'react';
import { FormField } from '../common/FormField';
import { createDocuments } from '@/lib/hooks/useDocuments';

export function DocumentsForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    name: '',
    url: '',
    type: '',
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await createDocuments(form);
      setForm({
        name: '',
        url: '',
        type: '',
      });
    } catch (err) { setError(err.message); }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-lg font-semibold">Documents Form</h2>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <FormField label="Name" name="name">
        <input name="name" value={form.name} onChange={handleChange} className="border px-3 py-2 rounded w-full" />
      </FormField>
      <FormField label="Url" name="url">
        <input name="url" value={form.url} onChange={handleChange} className="border px-3 py-2 rounded w-full" />
      </FormField>
      <FormField label="Type" name="type">
        <input name="type" value={form.type} onChange={handleChange} className="border px-3 py-2 rounded w-full" />
      </FormField>
      <button disabled={loading} className="bg-indigo-600 text-white px-4 py-2 rounded">
        {loading ? "Saving..." : "Save"}
      </button>
    </form>
  );
}



