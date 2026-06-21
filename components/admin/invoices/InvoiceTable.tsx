import { Menu, Search, User } from 'lucide-react';
"use client";

import { Invoice } from "./invoice-types";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

interface InvoiceTableProps {
  invoices: Invoice[];
  onView?: (id: string) => void;
  onSend?: (id: string) => void;
  onMarkPaid?: (id: string) => void;
  onDownloadPdf?: (id: string) => void;
}

function formatCurrency(amount: number, currency: string) {
  try {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
    }).format(amount);
  } catch {
    return ${currency} ;
  }
}

function formatStatus(status: string) {
  switch (status) {
    case "draft":
      return "Draft";
    case "pending_submission":
      return "Pending Submission";
    case "submitted":
      return "Submitted";
    case "accepted":
      return "Accepted";
    case "rejected":
      return "Rejected";
    case "cancelled":
      return "Cancelled";
    default:
      return status;
  }
}

function formatEtimsStatus(etimsStatus?: string) {
  if (!etimsStatus) return "Not Submitted";
  switch (etimsStatus) {
    case "pending":
      return "Pending ETIMS";
    case "success":
      return "ETIMS Accepted";
    case "failed":
      return "ETIMS Failed";
    default:
      return etimsStatus;
  }
}

export function InvoiceTable({
  invoices,
  onView,
  onSend,
  onMarkPaid,
  onDownloadPdf,
}: InvoiceTableProps) {
  if (!invoices || invoices.length === 0) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-10 text-center text-slate-500">
        No invoices found.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      {/* Desktop table */}
      <div className="hidden md:block">
        <table className="w-full table-auto text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Invoice #</th>
              <th className="px-4 py-3 text-left font-medium">Buyer</th>
              <th className="px-4 py-3 text-left font-medium">Total</th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
              <th className="px-4 py-3 text-left font-medium">ETIMS</th>
              <th className="px-4 py-3 text-left font-medium">PRN</th>
              <th className="px-4 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 font-medium text-slate-900">
                  {invoice.invoiceNumber}
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-col">
                    <span className="text-slate-900">
                      {invoice.buyer.name}
                    </span>
                    {invoice.buyer.pin && (
                      <span className="text-xs text-slate-500">
                        PIN: {invoice.buyer.pin}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  {formatCurrency(invoice.totalAmount, invoice.currency)}
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700">
                    {formatStatus(invoice.status)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-slate-700">
                      {formatEtimsStatus(invoice.etims?.etimsStatus)}
                    </span>
                    {invoice.etims?.etimsReceiptNumber && (
                      <span className="text-xs text-slate-500">
                        Receipt: {invoice.etims.etimsReceiptNumber}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 text-xs text-slate-600">
                  {invoice.etims?.prn || "—"}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onSend?.(invoice.id)}
                    >
                      Send
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDownloadPdf?.(invoice.id)}
                    >
                      PDF
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onMarkPaid?.(invoice.id)}
                    >
                      Mark Paid
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onView?.(invoice.id)}
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden divide-y divide-slate-100">
        {invoices.map((invoice) => (
          <div key={invoice.id} className="p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-900">
                  {invoice.invoiceNumber}
                </p>
                <p className="text-xs text-slate-500">
                  {invoice.buyer.name}
                </p>
              </div>
              <p className="text-sm font-semibold">
                {formatCurrency(invoice.totalAmount, invoice.currency)}
              </p>
            </div>

            <p className="text-xs text-slate-500">
              Status: {formatStatus(invoice.status)}
            </p>
            <p className="text-xs text-slate-500">
              ETIMS: {formatEtimsStatus(invoice.etims?.etimsStatus)}
            </p>
            <p className="text-xs text-slate-500">
              PRN: {invoice.etims?.prn || "—"}
            </p>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onSend?.(invoice.id)}
              >
                Send
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDownloadPdf?.(invoice.id)}
              >
                PDF
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onView?.(invoice.id)}
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


