const fs = require('fs');
const path = require('path');

// ============================================================
// ElimuX Automation Script: CRUD Injection (Admin + Institution)
// ============================================================

const root = path.join(__dirname, '..', 'app', 'api');
const crudPatternPath = path.join(__dirname, 'crud-pattern.txt');
const crudPattern = fs.readFileSync(crudPatternPath, 'utf8');

function injectCrud(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');

  // Only inject if CRUD not already present
  if (content.includes('export async function POST') ||
      content.includes('export async function PUT') ||
      content.includes('export async function DELETE')) {
    console.log('CRUD exists:', filePath);
    return;
  }

  // Assumes tenant-safe pattern already present (getTenantContext, etc.)
  const newContent = content.trimEnd() + '\n\n' + crudPattern.trimStart();
  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log('CRUD injected:', filePath);
}

function scan(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      scan(fullPath);
    } else if (entry.isFile() && entry.name === 'route.ts') {
      injectCrud(fullPath);
    }
  }
}

scan(root);

console.log('? CRUD injection complete (admin + institution).');
