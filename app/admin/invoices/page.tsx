"use client";

import { useState } from "react";
import { InvoicesHeader } from "@/components/admin/invoices/invoices-header";
import { InvoiceTable } from "@/components/admin/invoices/InvoiceTable";
import { Invoice } from "@/components/admin/invoices/invoice-types";

const mockInvoices: Invoice[] = [
  {
    id: "1",
    invoiceNumber: "001/2026/000001",
    branchCode: "001",
    sequenceNumber: 1,
    financialYear: 2026,
    seller: {
      name: "SportX Academy",
      pin: "P051234567A",
      email: "billing@sportx.co.ke",
      city: "Nairobi",
      country: "Kenya",
    },
    buyer: {
      name: "John Mwangi",
      pin: "A123456789B",
      email: "john@example.com",
      city: "Nairobi",
      country: "Kenya",
    },
    issueDate: "2026-06-20",
    createdAt: "2026-06-20T10:00:00Z",
    updatedAt: "2026-06-20T10:00:00Z",
    status: "accepted",
    currency: "KES",
    subTotal: 10000,
    totalTax: 1600,
    totalAmount: 11600,
    lineItems: [
      {
        id: "li1",
        itemCode: "TUIT001",
        description: "Term 2 Tuition Fee",
        quantity: 1,
        unitPrice: 10000,
        taxType: "vat",
        taxRate: 16,
        taxAmount: 1600,
        totalAmount: 11600,
      },
    ],
    etims: {
      etimsStatus: "success",
      etimsReceiptNumber: "ETR-998877",
      submissionTimestamp: "2026-06-20T10:05:00Z",
    },
  },
  {
    id: "2",
    invoiceNumber: "001/2026/000002",
    branchCode: "001",
    sequenceNumber: 2,
    financialYear: 2026,
    seller: {
      name: "SportX Academy",
      pin: "P051234567A",
    },
    buyer: {
      name: "Mary Wanjiku",
      pin: "A987654321C",
    },
    issueDate: "2026-06-19",
    createdAt: "2026-06-19T09:00:00Z",
    updatedAt: "2026-06-19T09:00:00Z",
    status: "pending_submission",
    currency: "KES",
    subTotal: 5000,
    totalTax: 800,
    totalAmount: 5800,
    lineItems: [
      {
        id: "li2",
        itemCode: "REGFEE",
        description: "Registration Fee",
        quantity: 1,
        unitPrice: 5000,
        taxType: "vat",
        taxRate: 16,
        taxAmount: 800,
        totalAmount: 5800,
      },
    ],
    etims: {
      etimsStatus: "pending",
    },
  },
  {
    id: "3",
    invoiceNumber: "001/2026/000003",
    branchCode: "001",
    sequenceNumber: 3,
    financialYear: 2026,
    seller: {
      name: "SportX Academy",
      pin: "P051234567A",
    },
    buyer: {
      name: "Brian Otieno",
      pin: "A112233445D",
    },
    issueDate: "2026-06-18",
    createdAt: "2026-06-18T08:00:00Z",
    updatedAt: "2026-06-18T08:00:00Z",
    status: "rejected",
    currency: "KES",
    subTotal: 8000,
    totalTax: 1280,
    totalAmount: 9280,
    lineItems: [
      {
        id: "li3",
        itemCode: "KIT001",
        description: "Sports Kit",
        quantity: 1,
        unitPrice: 8000,
        taxType: "vat",
        taxRate: 16,
        taxAmount: 1280,
        totalAmount: 9280,
      },
    ],
    etims: {
      etimsStatus: "failed",
      lastErrorMessage: "Invalid buyer PIN",
    },
  },
];

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const filteredInvoices = invoices.filter((inv) => {
    const matchesSearch =
      inv.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.buyer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.etims?.prn?.toLowerCase().includes(searchQuery.toLowerCase() || "");

    const matchesStatus = statusFilter ? inv.status === statusFilter : true;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <InvoicesHeader
        onSearch={setSearchQuery}
        onStatusFilter={setStatusFilter}
        onCreateInvoice={() => console.log("Create invoice")}
      />

      <InvoiceTable
        invoices={filteredInvoices}
        onView={(id) => console.log("View invoice", id)}
        onSend={(id) => console.log("Send invoice", id)}
        onMarkPaid={(id) => console.log("Mark paid", id)}
        onDownloadPdf={(id) => console.log("Download PDF", id)}
      />
    </div>
  );
}

