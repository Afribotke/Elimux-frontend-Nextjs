"use client";

import { UserRole } from "./role-types";
import { StaffRoleBadge } from "./StaffRoleBadge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

interface StaffRoleSelectorProps {
  value: UserRole;
  onChange: (role: UserRole) => void;
}

const ROLE_OPTIONS: UserRole[] = [
  "owner",
  "admin",
  "manager",
  "editor",
  "viewer",
];

export function StaffRoleSelector({ value, onChange }: StaffRoleSelectorProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 h-9"
        >
          <StaffRoleBadge role={value} />
          <ChevronDown className="h-4 w-4 text-slate-500" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>Select Role</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {ROLE_OPTIONS.map((role) => (
          <DropdownMenuItem
            key={role}
            onClick={() => onChange(role)}
            className="flex items-center gap-2"
          >
            <StaffRoleBadge role={role} />
            <span className="capitalize">{role}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}