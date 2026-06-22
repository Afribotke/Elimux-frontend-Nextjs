import { Menu, Search, User } from 'lucide-react';
"use client";

import { MoreHorizontal, Eye, Pencil, RotateCcw, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";

interface PaymentActionsProps {
  id: string;
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onRefund?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function PaymentActions({
  id,
  onView,
  onEdit,
  onRefund,
  onDelete,
}: PaymentActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>

        <DropdownMenuItem onClick={() => onView?.(id)}>
          <Eye className="mr-2 h-4 w-4" />
          View Payment
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => onEdit?.(id)}>
          <Pencil className="mr-2 h-4 w-4" />
          Edit Payment
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => onRefund?.(id)}>
          <RotateCcw className="mr-2 h-4 w-4 text-yellow-600" />
          Refund Payment
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => onDelete?.(id)}
          className="text-red-600 focus:text-red-600"
        >
          <Trash className="mr-2 h-4 w-4" />
          Delete Payment
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}




