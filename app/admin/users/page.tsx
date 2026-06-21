import { UsersHeader } from "@/components/admin/users/users-header";
import { StatsCards } from "@/components/admin/stats-cards";
import { UserTable } from "@/components/admin/UserTable";

const mockUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "admin",
    status: "active",
    createdAt: "2024-01-10",
  },
  {
    id: "2",
    name: "Mary Wanjiku",
    email: "mary@example.com",
    role: "staff",
    status: "pending",
    createdAt: "2024-02-14",
  },
  {
    id: "3",
    name: "Kevin Otieno",
    email: "kevin@example.com",
    role: "student",
    status: "suspended",
    createdAt: "2024-03-01",
  },
];

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <UsersHeader totalUsers={mockUsers.length} />

      <StatsCards
        items={[
          { label: "Total Users", value: mockUsers.length },
          { label: "Active", value: 1 },
          { label: "Pending", value: 1 },
          { label: "Suspended", value: 1 },
        ]}
      />

      <UserTable users={mockUsers} />
    </div>
  );
}



