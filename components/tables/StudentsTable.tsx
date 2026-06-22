import React from 'react';
import { useStudentss } from '@/lib/hooks/useStudents';
import { LoadingState } from '../common/LoadingState';
import { ErrorState } from '../common/ErrorState';

export function StudentsTable() {
  const { data, isLoading, isError } = useStudentss();

  if (isLoading) return <LoadingState label="Loading Students..." />;
  if (isError) return <ErrorState message="Failed to load Students." />;

  return (
    <table className="min-w-full border">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-4 py-2 text-left">First Name</th>
          <th className="px-4 py-2 text-left">Last Name</th>
          <th className="px-4 py-2 text-left">Email</th>
          <th className="px-4 py-2 text-left">Phone</th>
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={item.id} className="border-t">
            <td className="px-4 py-2">{item.first_name}</td>
            <td className="px-4 py-2">{item.last_name}</td>
            <td className="px-4 py-2">{item.email}</td>
            <td className="px-4 py-2">{item.phone}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}



