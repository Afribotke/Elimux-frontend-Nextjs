"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { StaffTable } from "@/components/admin/staff/StaffTable";
import { StaffRoleSelector } from "@/components/admin/roles/StaffRoleSelector";

const mockStaff = [
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
    role: "manager",
    status: "active",
  },
  {
    id: "3",
    name: "Brian Odhiambo",
    email: "brian@example.com",
    role: "editor",
    status: "invited",
  },
  {
    id: "4",
    name: "Grace Achieng",
    email: "grace@example.com",
    role: "viewer",
    status: "disabled",
  },
];

export default function StaffPage() {
  const [staff, setStaff] = useState(mockStaff);

  const handleRoleChange = (id: string, role: any) => {
    setStaff((prev) =>
      prev.map((member) =>
        member.id === id ? { ...member, role } : member
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Staff</h1>
          <p className="text-sm text-slate-500">
            Manage institution staff and their roles.
          </p>
        </div>

        <Button className="bg-sky-600 text-white hover:bg-sky-700">
          Add Staff
        </Button>
      </div>

      {/* Staff Table */}
      <StaffTable
        staff={staff}
        onRoleChange={handleRoleChange}
        onView={(id) => console.log("View staff", id)}
        onRemove={(id) => console.log("Remove staff", id)}
      />
    </div>
  );
}

