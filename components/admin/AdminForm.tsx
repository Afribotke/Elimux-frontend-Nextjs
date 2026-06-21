"use client";

import React from "react";

type Field = {
  name: string;
  label: string;
  type: string;
};

type AdminFormProps = {
  fields: Field[];
  onSubmit: (data: Record<string, any>) => void;
};

export default function AdminForm({ fields, onSubmit }: AdminFormProps) {
  const handleSubmit = (e: any) => {
    e.preventDefault();

    const formData: Record<string, any> = {};
    fields.forEach((f) => {
      formData[f.name] = e.target[f.name].value;
    });

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 border rounded-xl bg-white shadow-sm space-y-4">
      {fields.map((f) => (
        <div key={f.name} className="flex flex-col">
          <label className="text-sm font-medium mb-1">{f.label}</label>
          <input
            name={f.name}
            type={f.type}
            className="p-2 border rounded-lg bg-white"
          />
        </div>
      ))}

      <button
        type="submit"
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
      >
        Save
      </button>
    </form>
  );
}



