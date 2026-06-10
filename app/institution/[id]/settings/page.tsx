'use client';

import { useEffect, useState } from 'react';
import { fetchSettings, updateSettings, type Settings } from '@/lib/api';

export default function SettingsPage({ params }: { params: { id: string } }) {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    let active = true;
    fetchSettings(params.id).then((data) => {
      if (active) setSettings(data);
    });
    return () => {
      active = false;
    };
  }, [params.id]);

  async function handleSave() {
    if (!settings) return;
    setSaving(true);
    setMessage('');
    const result = await updateSettings(params.id, {
      name: settings.name,
      email: settings.email,
      country: settings.country,
      notifications_enabled: settings.notifications_enabled,
    });
    setSaving(false);
    setMessage(result.message);
  }

  if (!settings) {
    return <p className="text-gray-500">Loading settings…</p>;
  }

  return (
    <div className="max-w-2xl space-y-6">
      <h2 className="text-2xl font-bold text-navy">Settings</h2>

      <div className="space-y-5 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-600">
            Institution name
          </label>
          <input
            type="text"
            value={settings.name}
            onChange={(e) => setSettings({ ...settings, name: e.target.value })}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-navy"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-600">
            Contact email
          </label>
          <input
            type="email"
            value={settings.email}
            onChange={(e) => setSettings({ ...settings, email: e.target.value })}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-navy"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-600">
            Country
          </label>
          <input
            type="text"
            value={settings.country}
            onChange={(e) => setSettings({ ...settings, country: e.target.value })}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-navy"
          />
        </div>

        <label className="flex items-center gap-3 text-sm text-gray-600">
          <input
            type="checkbox"
            checked={settings.notifications_enabled}
            onChange={(e) =>
              setSettings({ ...settings, notifications_enabled: e.target.checked })
            }
            className="h-4 w-4 accent-navy"
          />
          Email notifications
        </label>

        <div className="flex items-center gap-4 pt-2">
          <button
            onClick={handleSave}
            disabled={saving}
            className="rounded-full bg-navy px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-navy/90 disabled:opacity-60"
          >
            {saving ? 'Saving…' : 'Save changes'}
          </button>
          {message ? <span className="text-sm text-gold">{message}</span> : null}
        </div>
      </div>
    </div>
  );
}
