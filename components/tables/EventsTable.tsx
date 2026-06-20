import React from 'react';
import { useEventss } from '@/lib/hooks/useEvents';
import { LoadingState } from '../common/LoadingState';
import { ErrorState } from '../common/ErrorState';

export function EventsTable() {
  const { data, isLoading, isError } = useEventss();

  if (isLoading) return <LoadingState label="Loading Events..." />;
  if (isError) return <ErrorState message="Failed to load Events." />;

  return (
    <table className="min-w-full border">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-4 py-2 text-left">Title</th>
          <th className="px-4 py-2 text-left">Date</th>
          <th className="px-4 py-2 text-left">Location</th>
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={item.id} className="border-t">
            <td className="px-4 py-2">{item.title}</td>
            <td className="px-4 py-2">{item.date}</td>
            <td className="px-4 py-2">{item.location}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}