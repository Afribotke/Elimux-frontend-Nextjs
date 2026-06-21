"use client";

import { MoreHorizontal, Eye, Pencil, Ban, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface StudentActionsProps {
  id: string;
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onSuspend?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function StudentActions({
  id,
  onView,
  onEdit,
  onSuspend,
  onDelete,
}: StudentActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>

        <DropdownMenuItem onClick={() => onView?.(id)}>
          <Eye className="mr-2 h-4 w-4" />
          View Student
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => onEdit?.(id)}>
          <Pencil className="mr-2 h-4 w-4" />
          Edit Student
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => onSuspend?.(id)}>
          <Ban className="mr-2 h-4 w-4" />
          Suspend
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => onDelete?.(id)}
          className="text-red-600 focus:text-red-600"
        >
          <Trash className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
