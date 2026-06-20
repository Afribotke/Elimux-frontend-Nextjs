import React from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

export function PageShell({ children }) {
  return (
    <div className='flex w-full h-screen bg-gray-50'>
      <Sidebar />
      <div className='flex flex-col flex-1'>
        <Topbar />
        <main className='p-6 overflow-y-auto flex-1'>{children}</main>
      </div>
    </div>
  );
}
