import { PaymentsHeader } from "@/components/admin/payments/payments-header";
import { StatsCards } from "@/components/admin/stats-cards";
import { PaymentTable } from "@/components/admin/payments/PaymentTable";

const mockPayments = [
  {
    id: "1",
    studentId: "1",
    studentName: "Elijah Kiptoo",
    enrollmentId: "1",
    enrollmentLabel: "Diploma in IT - Jan 2024",
    institutionId: "1",
    institutionName: "Nairobi Technical University",
    amount: 15000,
    currency: "KES",
    method: "mpesa",
    status: "paid",
    reference: "MPESA123456",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    studentId: "2",
    studentName: "Mary Wanjiku",
    enrollmentId: "2",
    enrollmentLabel: "Business Management - Feb 2024",
    institutionId: "2",
    institutionName: "Mombasa College",
    amount: 8000,
    currency: "KES",
    method: "card",
    status: "pending",
    reference: "CARD998877",
    createdAt: "2024-02-20",
  },
  {
    id: "3",
    studentId: "3",
    studentName: "Brian Odhiambo",
    enrollmentId: "3",
    enrollmentLabel: "Software Engineering - Sept 2023",
    institutionId: "1",
    institutionName: "Nairobi Technical University",
    amount: 25000,
    currency: "KES",
    method: "bank",
    status: "failed",
    reference: "BANK445566",
    createdAt: "2023-09-05",
  },
];

export default function PaymentsPage() {
  return (
    <div className="space-y-6">
      <PaymentsHeader total={mockPayments.length} />

      <StatsCards
        items={[
          { label: "Total Payments", value: mockPayments.length },
          { label: "Paid", value: 1 },
          { label: "Pending", value: 1 },
          { label: "Failed", value: 1 },
        ]}
      />

      <PaymentTable payments={mockPayments} />
    </div>
  );
}
