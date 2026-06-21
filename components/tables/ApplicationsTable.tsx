import React from 'react';
import { useApplicationss } from '@/lib/hooks/useApplications';
import { LoadingState } from '../common/LoadingState';
import { ErrorState } from '../common/ErrorState';
import { StatusBadge } from '../common/StatusBadge';

export function ApplicationsTable() {
  const { data, isLoading, isError } = useApplicationss();

  if (isLoading) return <LoadingState label="Loading Applications..." />;
  if (isError) return <ErrorState message="Failed to load Applications." />;

  return (
    <table className="min-w-full border">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-4 py-2 text-left">Student Id</th>
          <th className="px-4 py-2 text-left">Program Id</th>
          <th className="px-4 py-2 text-left">Status</th>
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={item.id} className="border-t">
            <td className="px-4 py-2">{item.student_id}</td>
            <td className="px-4 py-2">{item.program_id}</td>
            <td className="px-4 py-2"><StatusBadge status={item.status} /></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}



