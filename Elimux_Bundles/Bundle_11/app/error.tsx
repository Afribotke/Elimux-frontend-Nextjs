'use client';

export default function Error({ error }: { error: Error }) {
  return (
    <div className='flex items-center justify-center h-screen text-red-600'>
      <p>Something went wrong: {error.message}</p>
    </div>
  );
}
