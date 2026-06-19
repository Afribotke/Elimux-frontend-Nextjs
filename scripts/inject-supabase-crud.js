const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', 'app', 'api');
const templatePath = path.join(__dirname, 'crud-template.txt');

const template = fs.readFileSync(templatePath, 'utf8');

const tableMap = {
  programs: 'programs',
  applications: 'applications',
  students: 'students',
  staff: 'staff',
  events: 'events',
  messages: 'messages',
  documents: 'documents',
  analytics: 'analytics',
  verification: 'institution_verification',
  onboarding: 'institution_onboarding'
};

function injectCRUD(filePath, table, isAdmin) {
  let content = fs.readFileSync(filePath, 'utf8');

  if (content.includes('AUTO_CRUD_TEMPLATE_START')) {
    console.log('CRUD exists:', filePath);
    return;
  }

  let block = template
    .replace(/__TABLE__/g, table)
    .replace(/__IS_ADMIN__/g, isAdmin ? 'true' : 'false')
    .replace(/__INSTITUTION_FIELD__/g, isAdmin ? '' : 'institution_id: ctx.institution_id,');

  content += '\\n\\n' + block;

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('CRUD injected:', filePath);
}

function scan(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      scan(fullPath);
    } else if (entry.isFile() && entry.name === 'route.ts') {
      const parts = fullPath.split(path.sep);
      const folder = parts[parts.length - 2];

      const table = tableMap[folder];
      if (table) {
        const isAdmin = fullPath.includes('admin');
        injectCRUD(fullPath, table, isAdmin);
      }
    }
  }
}

scan(root);

console.log('? STEP 6 complete — Supabase CRUD injected.');
