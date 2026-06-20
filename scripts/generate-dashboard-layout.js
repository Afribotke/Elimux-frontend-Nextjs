const fs = require('fs');
const path = require('path');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

const layoutDir = path.join(__dirname, '..', 'components', 'layout');
const dashboardDir = path.join(__dirname, '..', 'app', '(dashboard)');
const adminDir = path.join(dashboardDir, 'admin');
const institutionDir = path.join(dashboardDir, 'institution');

ensureDir(layoutDir);
ensureDir(dashboardDir);
ensureDir(adminDir);
ensureDir(institutionDir);

function write(file, content) {
  fs.writeFileSync(file, content, 'utf8');
}

// SIDEBAR
write(
  path.join(layoutDir, 'Sidebar.tsx'),
  [
    "import Link from 'next/link';",
    "import React from 'react';",
    "",
    "export function Sidebar() {",
    "  return (",
    "    <div className='w-64 h-screen border-r bg-white p-4 flex flex-col gap-4'>",
    "      <h1 className='text-xl font-bold text-indigo-700'>ElimuX</h1>",
    "      <nav className='flex flex-col gap-2 text-sm'>",
    "        <Link href='/'>Home</Link>",
    "        <Link href='/ask'>Ask AI</Link>",
    "        <Link href='/programs'>Programs</Link>",
    "        <Link href='/applications'>Applications</Link>",
    "        <Link href='/students'>Students</Link>",
    "        <Link href='/staff'>Staff</Link>",
    "        <Link href='/events'>Events</Link>",
    "        <Link href='/documents'>Documents</Link>",
    "        <Link href='/messages'>Messages</Link>",
    "        <Link href='/admin'>Admin Dashboard</Link>",
    "        <Link href='/institution'>Institution Dashboard</Link>",
    "      </nav>",
    "    </div>",
    "  );",
    "}",
    ""
  ].join('\n')
);

// TOPBAR
write(
  path.join(layoutDir, 'Topbar.tsx'),
  [
    "import React from 'react';",
    "",
    "export function Topbar() {",
    "  return (",
    "    <div className='w-full h-14 border-b bg-white flex items-center justify-between px-6'>",
    "      <p className='text-sm text-gray-600'>Welcome to ElimuX Dashboard</p>",
    "      <div className='flex items-center gap-4'>",
    "        <span className='text-gray-500 text-sm'>User</span>",
    "      </div>",
    "    </div>",
    "  );",
    "}",
    ""
  ].join('\n')
);

// PAGE SHELL
write(
  path.join(layoutDir, 'PageShell.tsx'),
  [
    "import React from 'react';",
    "import { Sidebar } from './Sidebar';",
    "import { Topbar } from './Topbar';",
    "",
    "export function PageShell({ children }) {",
    "  return (",
    "    <div className='flex w-full h-screen bg-gray-50'>",
    "      <Sidebar />",
    "      <div className='flex flex-col flex-1'>",
    "        <Topbar />",
    "        <main className='p-6 overflow-y-auto flex-1'>{children}</main>",
    "      </div>",
    "    </div>",
    "  );",
    "}",
    ""
  ].join('\n')
);

// GLOBAL LAYOUT
write(
  path.join(dashboardDir, 'layout.tsx'),
  [
    "import React from 'react';",
    "import { PageShell } from '@/components/layout/PageShell';",
    "",
    "export default function DashboardLayout({ children }) {",
    "  return <PageShell>{children}</PageShell>;",
    "}",
    ""
  ].join('\n')
);

// ADMIN DASHBOARD PAGE
write(
  path.join(adminDir, 'page.tsx'),
  [
    "import React from 'react';",
    "",
    "export default function AdminDashboard() {",
    "  return (",
    "    <div className='space-y-6'>",
    "      <h1 className='text-2xl font-bold'>Admin Dashboard</h1>",
    "      <p className='text-gray-600'>Overview of platform activity.</p>",
    "    </div>",
    "  );",
    "}",
    ""
  ].join('\n')
);

// INSTITUTION DASHBOARD PAGE
write(
  path.join(institutionDir, 'page.tsx'),
  [
    "import React from 'react';",
    "",
    "export default function InstitutionDashboard() {",
    "  return (",
    "    <div className='space-y-6'>",
    "      <h1 className='text-2xl font-bold'>Institution Dashboard</h1>",
    "      <p className='text-gray-600'>Manage programs, applications, and students.</p>",
    "    </div>",
    "  );",
    "}",
    ""
  ].join('\n')
);

console.log('STEP 9 dashboard layout complete.');
