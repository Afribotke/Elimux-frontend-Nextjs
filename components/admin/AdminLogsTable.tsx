"use client";

import React from "react";

type Log = {
  id: string;
  action: string;
  user: string;
  timestamp: string;
};

type AdminLogsTableProps = {
  logs: Log[];
};

export default function AdminLogsTable({ logs }: AdminLogsTableProps) {
  return (
    <table className="w-full border rounded-xl bg-white shadow-sm text-sm">
      <thead className="bg-gray-50">
        <tr>
          <th className="p-3 text-left">Action</th>
          <th className="p-3 text-left">User</th>
          <th className="p-3 text-left">Timestamp</th>
        </tr>
      </thead>

      <tbody>
        {logs.map((l) => (
          <tr key={l.id} className="border-t hover:bg-gray-50">
            <td className="p-3">{l.action}</td>
            <td className="p-3">{l.user}</td>
            <td className="p-3">{l.timestamp}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}



