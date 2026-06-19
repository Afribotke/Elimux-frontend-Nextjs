const fs = require('fs');
const path = require('path');

// ============================================================
// ElimuX Automation Script: Tenant-Safe Pattern Injection
// ============================================================

const root = path.join(__dirname, '..', 'app', 'api');
const patternPath = path.join(__dirname, 'tenant-pattern.txt');

// Load tenant-safe pattern as plain text
const tenantPattern = fs.readFileSync(patternPath, 'utf8');

function injectPattern(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');

  if (content.includes('getTenantContext')) {
    console.log('Exists:', filePath);
    return;
  }

  fs.writeFileSync(filePath, tenantPattern, 'utf8');
  console.log('Injected:', filePath);
}

function scan(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      scan(fullPath);
    } else if (entry.isFile() && entry.name === 'route.ts') {
      injectPattern(fullPath);
    }
  }
}

scan(root);

console.log('? Tenant-safe pattern injection complete.');
