"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Filter, Plus, Search } from "lucide-react";

interface PaymentsHeaderProps {
  total: number;
  onSearchChange?: (value: string) => void;
}

export function PaymentsHeader({ total, onSearchChange }: PaymentsHeaderProps) {
  const [search, setSearch] = useState("");

  const handleSearchChange = (value: string) => {
    setSearch(value);
    onSearchChange?.(value);
  };

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="space-y-1">
        <h1 className="text-xl font-semibold text-slate-900">Payments</h1>
        <p className="text-sm text-slate-500">
          Tracking <span className="font-medium text-slate-700">{total}</span> payments across institutions.
        </p>
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-end">
        <div className="relative w-full md:w-72">
          <Search className="pointer-events-none absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search by student, method, or status"
            className="h-9 pl-8 text-sm"
          />
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9 gap-1">
                <Filter className="h-4 w-4" />
                <span className="hidden sm:inline">Filters</span>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuLabel>Status</DropdownMenuLabel>
              <DropdownMenuItem>Paid</DropdownMenuItem>
              <DropdownMenuItem>Pending</DropdownMenuItem>
              <DropdownMenuItem>Failed</DropdownMenuItem>
              <DropdownMenuItem>Refunded</DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuLabel>Method</DropdownMenuLabel>
              <DropdownMenuItem>MPESA</DropdownMenuItem>
              <DropdownMenuItem>Card</DropdownMenuItem>
              <DropdownMenuItem>Bank</DropdownMenuItem>
              <DropdownMenuItem>Cash</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button size="sm" className="h-9 gap-1 bg-sky-600 text-white hover:bg-sky-700">
            <Plus className="h-4 w-4" />
            <span>Add payment</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
