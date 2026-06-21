"use client";

import { Badge } from "@/components/ui/badge";

export function InvoiceTable({ invoices }) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b bg-slate-50">
            <th className="p-3 text-left">Invoice #</th>
            <th className="p-3 text-left">Amount</th>
            <th className="p-3 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {invoices?.map((inv) => (
            <tr key={inv.id} className="border-b">
              <td className="p-3">{inv.id}</td>
              <td className="p-3">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: inv.currency || "USD",
                  minimumFractionDigits: 2,
                }).format(inv.amount)}
              </td>
              <td className="p-3">
                <Badge variant={inv.status === "paid" ? "success" : "warning"}>
                  {inv.status}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
