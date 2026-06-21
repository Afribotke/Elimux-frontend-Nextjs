import { Menu, Search, User } from 'lucide-react';
"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/DropdownMenu";
import { MoreHorizontal, FileText, Send, CheckCircle, Pencil, XCircle } from "lucide-react";

interface InvoiceActionsProps {
  invoiceId: string;
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onSend?: (id: string) => void;
  onMarkPaid?: (id: string) => void;
  onDownloadPdf?: (id: string) => void;
  onSubmitEtims?: (id: string) => void;
  onCancel?: (id: string) => void;
}

export function InvoiceActions({
  invoiceId,
  onView,
  onEdit,
  onSend,
  onMarkPaid,
  onDownloadPdf,
  onSubmitEtims,
  onCancel,
}: InvoiceActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={() => onView?.(invoiceId)}>
          <FileText className="h-4 w-4 mr-2" />
          View Invoice
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => onEdit?.(invoiceId)}>
          <Pencil className="h-4 w-4 mr-2" />
          Edit Invoice
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => onSend?.(invoiceId)}>
          <Send className="h-4 w-4 mr-2" />
          Send to Customer
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => onDownloadPdf?.(invoiceId)}>
          <FileText className="h-4 w-4 mr-2" />
          Download PDF
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => onSubmitEtims?.(invoiceId)}>
          <Send className="h-4 w-4 mr-2" />
          Submit to ETIMS
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => onMarkPaid?.(invoiceId)}>
          <CheckCircle className="h-4 w-4 mr-2" />
          Mark as Paid
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="text-red-600"
          onClick={() => onCancel?.(invoiceId)}
        >
          <XCircle className="h-4 w-4 mr-2" />
          Cancel Invoice
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}




