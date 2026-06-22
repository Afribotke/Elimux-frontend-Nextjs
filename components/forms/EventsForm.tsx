import React, { useState } from 'react';
import { FormField } from '../common/FormField';
import { createEvents } from '@/lib/hooks/useEvents';

export function EventsForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    title: '',
    date: '',
    location: '',
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await createEvents(form);
      setForm({
        title: '',
        date: '',
        location: '',
      });
    } catch (err) { setError(err.message); }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-lg font-semibold">Events Form</h2>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <FormField label="Title" name="title">
        <input name="title" value={form.title} onChange={handleChange} className="border px-3 py-2 rounded w-full" />
      </FormField>
      <FormField label="Date" name="date">
        <input name="date" value={form.date} onChange={handleChange} className="border px-3 py-2 rounded w-full" />
      </FormField>
      <FormField label="Location" name="location">
        <input name="location" value={form.location} onChange={handleChange} className="border px-3 py-2 rounded w-full" />
      </FormField>
      <button disabled={loading} className="bg-indigo-600 text-white px-4 py-2 rounded">
        {loading ? "Saving..." : "Save"}
      </button>
    </form>
  );
}



