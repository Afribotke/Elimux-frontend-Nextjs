import Link from 'next/link';
import React from 'react';

export function Sidebar() {
  return (
    <div className='w-64 h-screen border-r bg-white p-4 flex flex-col gap-4'>
      <h1 className='text-xl font-bold text-indigo-700'>ElimuX</h1>
      <nav className='flex flex-col gap-2 text-sm'>
        <Link href='/'>Home</Link>
        <Link href='/ask'>Ask AI</Link>
        <Link href='/programs'>Programs</Link>
        <Link href='/applications'>Applications</Link>
        <Link href='/students'>Students</Link>
        <Link href='/staff'>Staff</Link>
        <Link href='/events'>Events</Link>
        <Link href='/documents'>Documents</Link>
        <Link href='/messages'>Messages</Link>
        <Link href='/admin'>Admin Dashboard</Link>
        <Link href='/institution'>Institution Dashboard</Link>
      </nav>
    </div>
  );
}

