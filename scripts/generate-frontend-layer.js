const fs = require('fs');
const path = require('path');

const ENTITIES = {
  programs: {
    table: 'programs',
    fields: {
      name: 'string',
      level: 'string',
      duration_months: 'number',
      tuition_fee: 'number',
      mode: 'enum_online_onsite_hybrid'
    }
  },
  applications: {
    table: 'applications',
    fields: {
      student_id: 'string',
      program_id: 'string',
      status: 'enum_pending_approved_rejected'
    }
  },
  students: {
    table: 'students',
    fields: {
      first_name: 'string',
      last_name: 'string',
      email: 'string',
      phone: 'string'
    }
  },
  staff: {
    table: 'staff',
    fields: {
      first_name: 'string',
      last_name: 'string',
      role: 'enum_admin_staff'
    }
  },
  events: {
    table: 'events',
    fields: {
      title: 'string',
      date: 'string',
      location: 'string'
    }
  },
  messages: {
    table: 'messages',
    fields: {
      sender_id: 'string',
      receiver_id: 'string',
      content: 'string'
    }
  },
  documents: {
    table: 'documents',
    fields: {
      name: 'string',
      url: 'string',
      type: 'string'
    }
  }
};

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

const typesDir = path.join(__dirname, '..', 'types');
const validationDir = path.join(__dirname, '..', 'lib', 'validation');
const hooksDir = path.join(__dirname, '..', 'lib', 'hooks');
const adaptersDir = path.join(__dirname, '..', 'lib', 'adapters');

ensureDir(typesDir);
ensureDir(validationDir);
ensureDir(hooksDir);
ensureDir(adaptersDir);

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function writeFileSafe(filePath, content) {
  fs.writeFileSync(filePath, content, 'utf8');
}

for (const name in ENTITIES) {
  const config = ENTITIES[name];
  const cap = capitalize(name);

  // TYPES
  let typeLines = [];
  typeLines.push('export type ' + cap + ' = {');
  typeLines.push('  id: string');
  typeLines.push('  institution_id: string');
  for (const field in config.fields) {
    let t = config.fields[field];
    if (t.startsWith('enum_')) {
      const parts = t.replace('enum_', '').split('_');
      t = parts.map(p => "'" + p + "'").join(' | ');
    }
    typeLines.push('  ' + field + ': ' + t);
  }
  typeLines.push('  created_at: string');
  typeLines.push('  created_by: string');
  typeLines.push('}');
  writeFileSafe(path.join(typesDir, name + '.ts'), typeLines.join('\n'));

  // ZOD
  let zodLines = [];
  zodLines.push("import { z } from 'zod'");
  zodLines.push('');
  zodLines.push('export const ' + name + 'Schema = z.object({');
  for (const field in config.fields) {
    let t = config.fields[field];
    if (t.startsWith('enum_')) {
      const parts = t.replace('enum_', '').split('_');
      const enums = parts.map(p => '"' + p + '"').join(', ');
      zodLines.push('  ' + field + ': z.enum([' + enums + ']),');
    } else if (t === 'number') {
      zodLines.push('  ' + field + ': z.number(),');
    } else {
      zodLines.push('  ' + field + ': z.string(),');
    }
  }
  zodLines.push('})');
  writeFileSafe(path.join(validationDir, name + '.ts'), zodLines.join('\n'));

  // HOOKS
  let hook = [];
  hook.push("import useSWR from 'swr'");
  hook.push("import { " + cap + " } from '@/types/" + name + "'");
  hook.push("import { " + name + "Schema } from '@/lib/validation/" + name + "'");
  hook.push('');
  hook.push('const fetcher = (url) => fetch(url).then(res => res.json())');
  hook.push('');
  hook.push('export function use' + cap + 's() {');
  hook.push("  const { data, error, isLoading, mutate } = useSWR('/api/" + name + "', fetcher)");
  hook.push('  return {');
  hook.push('    data: data?.data ?? [],');
  hook.push('    isLoading,');
  hook.push('    isError: !!error,');
  hook.push('    refresh: () => mutate()');
  hook.push('  }');
  hook.push('}');
  hook.push('');
  hook.push('export async function create' + cap + '(input) {');
  hook.push('  const parsed = ' + name + 'Schema.parse(input)');
  hook.push('');
  hook.push("  const res = await fetch('/api/" + name + "', {");
  hook.push("    method: 'POST',");
  hook.push("    headers: { 'Content-Type': 'application/json' },");
  hook.push('    body: JSON.stringify(parsed)');
  hook.push('  })');
  hook.push('');
  hook.push("  if (!res.ok) throw new Error('Failed to create " + name + "')");
  hook.push('  return res.json()');
  hook.push('}');
  writeFileSafe(path.join(hooksDir, 'use' + cap + '.ts'), hook.join('\n'));

  // ADAPTER
  let adapter = [];
  adapter.push('export function to' + cap + 'Row(item) {');
  adapter.push('  return {');
  adapter.push('    id: item.id,');
  for (const field in config.fields) {
    adapter.push('    ' + field + ': item.' + field + ',');
  }
  adapter.push('  }');
  adapter.push('}');
  writeFileSafe(path.join(adaptersDir, name + '.ts'), adapter.join('\n'));

  console.log('Generated frontend layer for:', name);
}

console.log('STEP 7 complete.');
