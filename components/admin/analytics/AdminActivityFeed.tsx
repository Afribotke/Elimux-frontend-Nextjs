"use client";

import React from "react";

type Activity = {
  id: string;
  message: string;
  timestamp: string;
};

type AdminActivityFeedProps = {
  activities: Activity[];
};

export default function AdminActivityFeed({ activities }: AdminActivityFeedProps) {
  if (!activities || activities.length === 0) {
    return <p className="text-gray-500 text-sm">No recent activity.</p>;
  }

  return (
    <div className="p-4 border rounded-xl bg-white shadow-sm space-y-3">
      <h3 className="font-semibold mb-2">Recent Activity</h3>

      <ul className="space-y-2 text-sm">
        {activities.map((a) => (
          <li key={a.id} className="border-b pb-2">
            <p>{a.message}</p>
            <p className="text-xs text-gray-500">{a.timestamp}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
