"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Filter, Plus, ChevronDown } from "lucide-react";

interface InvoicesHeaderProps {
  onSearch?: (value: string) => void;
  onStatusFilter?: (status: string | null) => void;
  onCreateInvoice?: () => void;
}

const STATUS_OPTIONS = [
  { label: "All", value: null },
  { label: "Draft", value: "draft" },
  { label: "Pending Submission", value: "pending_submission" },
  { label: "Submitted", value: "submitted" },
  { label: "Accepted", value: "accepted" },
  { label: "Rejected", value: "rejected" },
  { label: "Cancelled", value: "cancelled" },
];

export function InvoicesHeader({
  onSearch,
  onStatusFilter,
  onCreateInvoice,
}: InvoicesHeaderProps) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  const handleStatusChange = (value: string | null) => {
    setStatus(value);
    onStatusFilter?.(value);
  };

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      {/* Left: Search */}
      <div className="flex items-center gap-3 w-full md:w-auto">
        <Input
          placeholder="Search invoices..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            onSearch?.(e.target.value);
          }}
          className="w-full md:w-64"
        />
      </div>

      {/* Right: Filters + Create */}
      <div className="flex items-center gap-3">
        {/* Status Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              {status ? STATUS_OPTIONS.find((s) => s.value === status)?.label : "Status"}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
            <DropdownMenuSeparator />

            {STATUS_OPTIONS.map((opt) => (
              <DropdownMenuItem
                key={opt.label}
                onClick={() => handleStatusChange(opt.value)}
              >
                {opt.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Create Invoice */}
        <Button
          className="bg-sky-600 text-white hover:bg-sky-700 flex items-center gap-2"
          onClick={onCreateInvoice}
        >
          <Plus className="h-4 w-4" />
          Create Invoice
        </Button>
      </div>
    </div>
  );
}