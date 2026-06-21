import React from 'react';
import { useDocumentss } from '@/lib/hooks/useDocuments';
import { LoadingState } from '../common/LoadingState';
import { ErrorState } from '../common/ErrorState';

export function DocumentsTable() {
  const { data, isLoading, isError } = useDocumentss();

  if (isLoading) return <LoadingState label="Loading Documents..." />;
  if (isError) return <ErrorState message="Failed to load Documents." />;

  return (
    <table className="min-w-full border">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-4 py-2 text-left">Name</th>
          <th className="px-4 py-2 text-left">Url</th>
          <th className="px-4 py-2 text-left">Type</th>
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={item.id} className="border-t">
            <td className="px-4 py-2">{item.name}</td>
            <td className="px-4 py-2">{item.url}</td>
            <td className="px-4 py-2">{item.type}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
