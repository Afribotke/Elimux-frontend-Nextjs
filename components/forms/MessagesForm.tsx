import React, { useState } from 'react';
import { FormField } from '../common/FormField';
import { createMessages } from '@/lib/hooks/useMessages';

export function MessagesForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    sender_id: '',
    receiver_id: '',
    content: '',
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await createMessages(form);
      setForm({
        sender_id: '',
        receiver_id: '',
        content: '',
      });
    } catch (err) { setError(err.message); }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-lg font-semibold">Messages Form</h2>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <FormField label="Sender Id" name="sender_id">
        <input name="sender_id" value={form.sender_id} onChange={handleChange} className="border px-3 py-2 rounded w-full" />
      </FormField>
      <FormField label="Receiver Id" name="receiver_id">
        <input name="receiver_id" value={form.receiver_id} onChange={handleChange} className="border px-3 py-2 rounded w-full" />
      </FormField>
      <FormField label="Content" name="content">
        <input name="content" value={form.content} onChange={handleChange} className="border px-3 py-2 rounded w-full" />
      </FormField>
      <button disabled={loading} className="bg-indigo-600 text-white px-4 py-2 rounded">
        {loading ? "Saving..." : "Save"}
      </button>
    </form>
  );
}
