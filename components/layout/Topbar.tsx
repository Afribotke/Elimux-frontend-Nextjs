import React from 'react';

export function Topbar() {
  return (
    <div className='w-full h-14 border-b bg-white flex items-center justify-between px-6'>
      <p className='text-sm text-gray-600'>Welcome to ElimuX Dashboard</p>
      <div className='flex items-center gap-4'>
        <span className='text-gray-500 text-sm'>User</span>
      </div>
    </div>
  );
}

