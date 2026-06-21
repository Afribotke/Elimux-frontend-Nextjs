import React from 'react';
import { useStaffs } from '@/lib/hooks/useStaff';
import { LoadingState } from '../common/LoadingState';
import { ErrorState } from '../common/ErrorState';

export function StaffTable() {
  const { data, isLoading, isError } = useStaffs();

  if (isLoading) return <LoadingState label="Loading Staff..." />;
  if (isError) return <ErrorState message="Failed to load Staff." />;

  return (
    <table className="min-w-full border">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-4 py-2 text-left">First Name</th>
          <th className="px-4 py-2 text-left">Last Name</th>
          <th className="px-4 py-2 text-left">Role</th>
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={item.id} className="border-t">
            <td className="px-4 py-2">{item.first_name}</td>
            <td className="px-4 py-2">{item.last_name}</td>
            <td className="px-4 py-2">{item.role}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}



