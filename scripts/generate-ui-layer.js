const fs = require('fs');
const path = require('path');

const ENTITIES = {
  programs: { label: 'Programs', fields: ['name', 'level', 'duration_months', 'tuition_fee', 'mode'] },
  applications: { label: 'Applications', fields: ['student_id', 'program_id', 'status'] },
  students: { label: 'Students', fields: ['first_name', 'last_name', 'email', 'phone'] },
  staff: { label: 'Staff', fields: ['first_name', 'last_name', 'role'] },
  events: { label: 'Events', fields: ['title', 'date', 'location'] },
  messages: { label: 'Messages', fields: ['sender_id', 'receiver_id', 'content'] },
  documents: { label: 'Documents', fields: ['name', 'url', 'type'] }
};

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

const componentsDir = path.join(__dirname, '..', 'components');
const formsDir = path.join(componentsDir, 'forms');
const tablesDir = path.join(componentsDir, 'tables');
const commonDir = path.join(componentsDir, 'common');

ensureDir(componentsDir);
ensureDir(formsDir);
ensureDir(tablesDir);
ensureDir(commonDir);

function writeFileSafe(filePath, content) {
  fs.writeFileSync(filePath, content, 'utf8');
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function toTitle(str) {
  return str.split('_').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
}

// COMMON COMPONENTS
writeFileSafe(
  path.join(commonDir, 'FormField.tsx'),
  [
    "import React from 'react';",
    '',
    'export function FormField({ label, name, children }) {',
    '  return (',
    '    <div className="flex flex-col gap-1 mb-3">',
    '      <label className="text-sm font-medium text-gray-700" htmlFor={name}>{label}</label>',
    '      {children}',
    '    </div>',
    '  );',
    '}',
    ''
  ].join('\n')
);

writeFileSafe(
  path.join(commonDir, 'LoadingState.tsx'),
  [
    "import React from 'react';",
    '',
    'export function LoadingState({ label = "Loading..." }) {',
    '  return <div className="py-10 text-center text-gray-500">{label}</div>;',
    '}',
    ''
  ].join('\n')
);

writeFileSafe(
  path.join(commonDir, 'ErrorState.tsx'),
  [
    "import React from 'react';",
    '',
    'export function ErrorState({ message = "Something went wrong." }) {',
    '  return <div className="py-10 text-center text-red-600">{message}</div>;',
    '}',
    ''
  ].join('\n')
);

writeFileSafe(
  path.join(commonDir, 'StatusBadge.tsx'),
  [
    "import React from 'react';",
    '',
    'export function StatusBadge({ status }) {',
    '  const base = "px-2 py-1 rounded-full text-xs font-medium";',
    '  let color = "bg-gray-200 text-gray-800";',
    '  if (status === "approved") color = "bg-green-200 text-green-800";',
    '  if (status === "pending") color = "bg-yellow-200 text-yellow-800";',
    '  if (status === "rejected") color = "bg-red-200 text-red-800";',
    '  return <span className={base + " " + color}>{status}</span>;',
    '}',
    ''
  ].join('\n')
);

// ENTITY COMPONENTS
for (const name in ENTITIES) {
  const config = ENTITIES[name];
  const cap = capitalize(name);
  const label = config.label;
  const fields = config.fields;

  // FORM
  let form = [];
  form.push("import React, { useState } from 'react';");
  form.push("import { FormField } from '../common/FormField';");
  form.push("import { create" + cap + " } from '@/lib/hooks/use" + cap + "';");
  form.push('');
  form.push('export function ' + cap + 'Form() {');
  form.push('  const [loading, setLoading] = useState(false);');
  form.push('  const [error, setError] = useState(null);');
  form.push('  const [form, setForm] = useState({');
  fields.forEach(f => form.push('    ' + f + ": '',"));
  form.push('  });');
  form.push('');
  form.push('  function handleChange(e) {');
  form.push('    setForm({ ...form, [e.target.name]: e.target.value });');
  form.push('  }');
  form.push('');
  form.push('  async function handleSubmit(e) {');
  form.push('    e.preventDefault();');
  form.push('    setLoading(true);');
  form.push('    setError(null);');
  form.push('    try {');
  form.push('      await create' + cap + '(form);');
  form.push('      setForm({');
  fields.forEach(f => form.push('        ' + f + ": '',"));
  form.push('      });');
  form.push('    } catch (err) { setError(err.message); }');
  form.push('    setLoading(false);');
  form.push('  }');
  form.push('');
  form.push('  return (');
  form.push('    <form onSubmit={handleSubmit} className="space-y-4">');
  form.push('      <h2 className="text-lg font-semibold">' + label + ' Form</h2>');
  form.push('      {error && <p className="text-red-600 text-sm">{error}</p>}');
  fields.forEach(f => {
    form.push('      <FormField label="' + toTitle(f) + '" name="' + f + '">');
    form.push('        <input name="' + f + '" value={form.' + f + '} onChange={handleChange} className="border px-3 py-2 rounded w-full" />');
    form.push('      </FormField>');
  });
  form.push('      <button disabled={loading} className="bg-indigo-600 text-white px-4 py-2 rounded">');
  form.push('        {loading ? "Saving..." : "Save"}');
  form.push('      </button>');
  form.push('    </form>');
  form.push('  );');
  form.push('}');
  writeFileSafe(path.join(formsDir, cap + 'Form.tsx'), form.join('\n'));

  // TABLE
  let table = [];
  table.push("import React from 'react';");
  table.push("import { use" + cap + "s } from '@/lib/hooks/use" + cap + "';");
  table.push("import { LoadingState } from '../common/LoadingState';");
  table.push("import { ErrorState } from '../common/ErrorState';");
  if (name === 'applications') table.push("import { StatusBadge } from '../common/StatusBadge';");
  table.push('');
  table.push('export function ' + cap + 'Table() {');
  table.push('  const { data, isLoading, isError } = use' + cap + 's();');
  table.push('');
  table.push('  if (isLoading) return <LoadingState label="Loading ' + label + '..." />;');
  table.push('  if (isError) return <ErrorState message="Failed to load ' + label + '." />;');
  table.push('');
  table.push('  return (');
  table.push('    <table className="min-w-full border">');
  table.push('      <thead className="bg-gray-100">');
  table.push('        <tr>');
  fields.forEach(f => table.push('          <th className="px-4 py-2 text-left">' + toTitle(f) + '</th>'));
  table.push('        </tr>');
  table.push('      </thead>');
  table.push('      <tbody>');
  table.push('        {data.map(item => (');
  table.push('          <tr key={item.id} className="border-t">');
  fields.forEach(f => {
    if (name === 'applications' && f === 'status') {
      table.push('            <td className="px-4 py-2"><StatusBadge status={item.status} /></td>');
    } else {
      table.push('            <td className="px-4 py-2">{item.' + f + '}</td>');
    }
  });
  table.push('          </tr>');
  table.push('        ))}');
  table.push('      </tbody>');
  table.push('    </table>');
  table.push('  );');
  table.push('}');
  writeFileSafe(path.join(tablesDir, cap + 'Table.tsx'), table.join('\n'));

  console.log('Generated UI layer for:', name);
}

console.log('STEP 8 UI layer complete.');
