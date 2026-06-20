"use client";

import React from "react";

type Setting = {
  key: string;
  label: string;
  value: string;
};

type AdminSettingsPanelProps = {
  settings: Setting[];
  onChange: (key: string, value: string) => void;
};

export default function AdminSettingsPanel({ settings, onChange }: AdminSettingsPanelProps) {
  return (
    <div className="p-6 border rounded-xl bg-white shadow-sm space-y-4">
      {settings.map((s) => (
        <div key={s.key} className="flex flex-col">
          <label className="text-sm font-medium mb-1">{s.label}</label>
          <input
            type="text"
            value={s.value}
            onChange={(e) => onChange(s.key, e.target.value)}
            className="p-2 border rounded-lg bg-white"
          />
        </div>
      ))}
    </div>
  );
}
