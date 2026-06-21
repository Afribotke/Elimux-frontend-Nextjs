"use client";

import { Invoice } from "./invoice-types";
import { InvoiceActions } from "./invoice-actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface InvoiceDetailsProps {
  invoice: Invoice;
  onViewPdf?: (id: string) => void;
  onSubmitEtims?: (id: string) => void;
  onSend?: (id: string) => void;
  onMarkPaid?: (id: string) => void;
  onCancel?: (id: string) => void;
}

export function InvoiceDetails({
  invoice,
  onViewPdf,
  onSubmitEtims,
  onSend,
  onMarkPaid,
  onCancel,
}: InvoiceDetailsProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">
            Invoice {invoice.invoiceNumber}
          </h1>
          <p className="text-sm text-slate-500">
            Issued on {invoice.issueDate}
          </p>
        </div>

        <InvoiceActions
          invoiceId={invoice.id}
          onDownloadPdf={onViewPdf}
          onSubmitEtims={onSubmitEtims}
          onSend={onSend}
          onMarkPaid={onMarkPaid}
          onCancel={onCancel}
        />
      </div>

      {/* Parties */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Seller</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-1">
            <p className="font-medium">{invoice.seller.name}</p>
            <p className="text-slate-600">PIN: {invoice.seller.pin}</p>
            {invoice.seller.email && (
              <p className="text-slate-600">{invoice.seller.email}</p>
            )}
            {invoice.seller.city && (
              <p className="text-slate-600">{invoice.seller.city}</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Buyer</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-1">
            <p className="font-medium">{invoice.buyer.name}</p>
            <p className="text-slate-600">PIN: {invoice.buyer.pin}</p>
            {invoice.buyer.email && (
              <p className="text-slate-600">{invoice.buyer.email}</p>
            )}
            {invoice.buyer.city && (
              <p className="text-slate-600">{invoice.buyer.city}</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Line Items */}
      <Card>
        <CardHeader>
          <CardTitle>Line Items</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-2 text-left">Item Code</th>
                <th className="px-4 py-2 text-left">Description</th>
                <th className="px-4 py-2 text-right">Qty</th>
                <th className="px-4 py-2 text-right">Unit Price</th>
                <th className="px-4 py-2 text-right">Tax</th>
                <th className="px-4 py-2 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {invoice.lineItems.map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py-2">{item.itemCode}</td>
                  <td className="px-4 py-2">{item.description}</td>
                  <td className="px-4 py-2 text-right">{item.quantity}</td>
                  <td className="px-4 py-2 text-right">
                    {invoice.currency} {item.unitPrice.toFixed(2)}
                  </td>
                  <td className="px-4 py-2 text-right">
                    {item.taxAmount.toFixed(2)}
                  </td>
                  <td className="px-4 py-2 text-right">
                    {item.totalAmount.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Totals */}
      <Card>
        <CardHeader>
          <CardTitle>Totals</CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>
              {invoice.currency} {invoice.subTotal.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Total Tax</span>
            <span>
              {invoice.currency} {invoice.totalTax.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between font-semibold text-slate-900">
            <span>Total Amount</span>
            <span>
              {invoice.currency} {invoice.totalAmount.toFixed(2)}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* ETIMS Metadata */}
      <Card>
        <CardHeader>
          <CardTitle>ETIMS Information</CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-2">
          <p>Status: {invoice.etims?.etimsStatus || "Not Submitted"}</p>
          {invoice.etims?.etimsReceiptNumber && (
            <p>Receipt: {invoice.etims.etimsReceiptNumber}</p>
          )}
          {invoice.etims?.prn && <p>PRN: {invoice.etims.prn}</p>}
          {invoice.etims?.lastErrorMessage && (
            <p className="text-red-600">
              Error: {invoice.etims.lastErrorMessage}
            </p>
          )}
          {invoice.etims?.submissionTimestamp && (
            <p>Submitted: {invoice.etims.submissionTimestamp}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
