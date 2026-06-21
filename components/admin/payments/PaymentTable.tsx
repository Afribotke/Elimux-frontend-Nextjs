"use client";

import { useMemo } from "react";
import { Payment } from "./payment-types";
import { StatusBadge } from "@/components/admin/status-badge";
import { DataTableEmpty } from "@/components/admin/data-table-empty";
import { DataTableSkeleton } from "@/components/admin/data-table-skeleton";

interface PaymentTableProps {
  payments: Payment[];
  loading?: boolean;
  searchQuery?: string;
}

export function PaymentTable({
  payments,
  loading = false,
  searchQuery = "",
}: PaymentTableProps) {
  const filtered = useMemo(() => {
    if (!searchQuery) return payments;
    const q = searchQuery.toLowerCase();
    return payments.filter(
      (p) =>
        p.studentName.toLowerCase().includes(q) ||
        p.method.toLowerCase().includes(q) ||
        p.status.toLowerCase().includes(q) ||
        p.institutionName.toLowerCase().includes(q)
    );
  }, [payments, searchQuery]);

  if (loading) {
    return <DataTableSkeleton rows={6} columns={6} />;
  }

  if (filtered.length === 0) {
    return (
      <DataTableEmpty
        title="No payments found"
        description="Try adjusting your search or filters."
      />
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">

      {/* Desktop Table */}
      <div className="hidden md:block">
        <table className="w-full table-auto text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Student</th>
              <th className="px-4 py-3 text-left font-medium">Institution</th>
              <th className="px-4 py-3 text-left font-medium">Amount</th>
              <th className="px-4 py-3 text-left font-medium">Method</th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
              <th className="px-4 py-3 text-left font-medium">Date</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {filtered.map((payment) => (
              <tr key={payment.id} className="hover:bg-slate-50">
                <td className="px-4 py-3">{payment.studentName}</td>
                <td className="px-4 py-3">{payment.institutionName}</td>
                <td className="px-4 py-3">
                  {payment.currency} {payment.amount.toLocaleString()}
                </td>
                <td className="px-4 py-3 capitalize">{payment.method}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={payment.status} />
                </td>
                <td className="px-4 py-3">{payment.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden divide-y divide-slate-100">
        {filtered.map((payment) => (
          <div key={payment.id} className="p-4 space-y-2">

            <p className="font-medium">{payment.studentName}</p>

            <p className="text-xs text-slate-500">{payment.institutionName}</p>

            <p className="text-xs text-slate-500">
              Amount: {payment.currency} {payment.amount.toLocaleString()}
            </p>

            <p className="text-xs text-slate-500">Method: {payment.method}</p>

            <div className="flex items-center justify-between pt-1">
              <span className="text-xs capitalize text-slate-600">
                {payment.status}
              </span>
              <StatusBadge status={payment.status} />
            </div>

            <p className="text-xs text-slate-500">Date: {payment.createdAt}</p>

          </div>
        ))}
      </div>

    </div>
  );
}

