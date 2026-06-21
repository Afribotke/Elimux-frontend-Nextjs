"use client";

import { MoreHorizontal, Eye, Pencil, CheckCircle, XCircle, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface EnrollmentActionsProps {
  id: string;
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onComplete?: (id: string) => void;
  onDrop?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function EnrollmentActions({
  id,
  onView,
  onEdit,
  onComplete,
  onDrop,
  onDelete,
}: EnrollmentActionsProps) {
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
          View Enrollment
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => onEdit?.(id)}>
          <Pencil className="mr-2 h-4 w-4" />
          Edit Enrollment
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => onComplete?.(id)}>
          <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
          Mark as Completed
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => onDrop?.(id)}>
          <XCircle className="mr-2 h-4 w-4 text-yellow-600" />
          Drop Enrollment
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => onDelete?.(id)}
          className="text-red-600 focus:text-red-600"
        >
          <Trash className="mr-2 h-4 w-4" />
          Delete Enrollment
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}