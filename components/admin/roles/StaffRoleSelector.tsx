"use client";

import { UserRole } from "./role-types";
import { StaffRoleBadge } from "./StaffRoleBadge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
      <DropdownMenuTrigger>
        <Button className="flex items-center gap-2 h-9 bg-white text-slate-900 border border-slate-300 hover:bg-slate-50">
          <StaffRoleBadge role={value} />
          <ChevronDown className="h-4 w-4 text-slate-500" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        {ROLE_OPTIONS.map((role) => (
          <DropdownMenuItem key={role}>
            <button
              type="button"
              onClick={() => onChange(role)}
              className="flex w-full items-center gap-2 text-left"
            >
              <StaffRoleBadge role={role} />
              <span className="capitalize">{role}</span>
            </button>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
