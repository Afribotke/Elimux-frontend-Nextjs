"use client";

import { Payment } from "./payment-types";
import { StatusBadge } from "@/components/admin/status-badge";

interface PaymentDetailsProps {
  payment: Payment;
}

export function PaymentDetails({ payment }: PaymentDetailsProps) {
  return (
    <div className="space-y-6">
      {/* Top Summary Card */}
      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold text-slate-900">
            {payment.studentName}
          </h2>

          <p className="text-sm text-slate-500">
            Institution: {payment.institutionName}
          </p>

          <p className="text-sm text-slate-500">
            Enrollment: {payment.enrollmentLabel}
          </p>

          <StatusBadge status={payment.status} />
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="text-sm font-medium text-slate-700">Amount</h3>
          <p className="text-sm text-slate-600 mt-1">
            {payment.currency} {payment.amount.toLocaleString()}
          </p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="text-sm font-medium text-slate-700">Payment Method</h3>
          <p className="text-sm text-slate-600 mt-1 capitalize">
            {payment.method}
          </p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="text-sm font-medium text-slate-700">Reference</h3>
          <p className="text-sm text-slate-600 mt-1">{payment.reference}</p>
        </div>

        {payment.description && (
          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="text-sm font-medium text-slate-700">Description</h3>
            <p className="text-sm text-slate-600 mt-1">{payment.description}</p>
          </div>
        )}

        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="text-sm font-medium text-slate-700">Created At</h3>
          <p className="text-sm text-slate-600 mt-1">{payment.createdAt}</p>
        </div>

        {payment.updatedAt && (
          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="text-sm font-medium text-slate-700">Updated At</h3>
            <p className="text-sm text-slate-600 mt-1">{payment.updatedAt}</p>
          </div>
        )}
      </div>
    </div>
  );
}