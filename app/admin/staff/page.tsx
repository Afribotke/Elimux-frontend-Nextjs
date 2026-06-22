"use client";

import { useState } from "react";
import { StaffTable } from "@/components/admin/staff/StaffTable";
import type { StaffMember } from "@/components/admin/staff/types";

const staff: StaffMember[] = [
  {
    id: "1",
    name: "Elijah Kiptoo",
    email: "elijah@example.com",
    role: "admin",
    status: "active",
  },
  {
    id: "2",
    name: "Mary Wanjiku",
    email: "mary@example.com",
    role: "staff",
    status: "disabled",
  },
  {
    id: "3",
    name: "Brian Odhiambo",
    email: "brian@example.com",
    role: "staff",
    status: "invited",
  },
];

export default function StaffPage() {
  const [data, setData] = useState<StaffMember[]>(staff);

  const handleRoleChange = (id: string, newRole: string) => {
    setData((prev) =>
      prev.map((s) => (s.id === id ? { ...s, role: newRole } : s))
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Staff</h1>

        <button className="bg-sky-600 text-white px-4 py-2 rounded hover:bg-sky-700">
          Add Staff
        </button>
      </div>

      <StaffTable
        staff={data}
        onRoleChange={handleRoleChange}
        onView={(id) => console.log("View staff", id)}
        onRemove={(id) => console.log("Remove staff", id)}
      />
    </div>
  );
}
