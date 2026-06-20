import React from 'react';

export function FormField({ label, name, children }) {
  return (
    <div className="flex flex-col gap-1 mb-3">
      <label className="text-sm font-medium text-gray-700" htmlFor={name}>{label}</label>
      {children}
    </div>
  );
}
