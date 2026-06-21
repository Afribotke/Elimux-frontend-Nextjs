import React from 'react';
import { useProgramss } from '@/lib/hooks/usePrograms';
import { LoadingState } from '../common/LoadingState';
import { ErrorState } from '../common/ErrorState';

export function ProgramsTable() {
  const { data, isLoading, isError } = useProgramss();

  if (isLoading) return <LoadingState label="Loading Programs..." />;
  if (isError) return <ErrorState message="Failed to load Programs." />;

  return (
    <table className="min-w-full border">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-4 py-2 text-left">Name</th>
          <th className="px-4 py-2 text-left">Level</th>
          <th className="px-4 py-2 text-left">Duration Months</th>
          <th className="px-4 py-2 text-left">Tuition Fee</th>
          <th className="px-4 py-2 text-left">Mode</th>
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={item.id} className="border-t">
            <td className="px-4 py-2">{item.name}</td>
            <td className="px-4 py-2">{item.level}</td>
            <td className="px-4 py-2">{item.duration_months}</td>
            <td className="px-4 py-2">{item.tuition_fee}</td>
            <td className="px-4 py-2">{item.mode}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

