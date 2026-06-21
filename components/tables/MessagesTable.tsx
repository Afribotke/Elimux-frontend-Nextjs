import React from 'react';
import { useMessagess } from '@/lib/hooks/useMessages';
import { LoadingState } from '../common/LoadingState';
import { ErrorState } from '../common/ErrorState';

export function MessagesTable() {
  const { data, isLoading, isError } = useMessagess();

  if (isLoading) return <LoadingState label="Loading Messages..." />;
  if (isError) return <ErrorState message="Failed to load Messages." />;

  return (
    <table className="min-w-full border">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-4 py-2 text-left">Sender Id</th>
          <th className="px-4 py-2 text-left">Receiver Id</th>
          <th className="px-4 py-2 text-left">Content</th>
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={item.id} className="border-t">
            <td className="px-4 py-2">{item.sender_id}</td>
            <td className="px-4 py-2">{item.receiver_id}</td>
            <td className="px-4 py-2">{item.content}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

