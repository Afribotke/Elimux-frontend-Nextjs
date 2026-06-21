import { Menu, Search, User } from 'lucide-react';
"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  MoreHorizontal,
  Eye,
  Pencil,
  ShieldOff,
  ShieldCheck,
  KeyRound,
  Trash2,
} from "lucide-react";
import type { AdminUser } from "./user-types";

type DangerousAction = "suspend" | "activate" | "reset-password" | "delete";

interface UserActionsProps {
  user: AdminUser;
}

export function UserActions({ user }: UserActionsProps) {
  const [open, setOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<DangerousAction | null>(null);
  const [isPending, startTransition] = useTransition();

  const labelForAction = (action: DangerousAction) => {
    switch (action) {
      case "suspend":
        return "Suspend user";
      case "activate":
        return "Activate user";
      case "reset-password":
        return "Reset password";
      case "delete":
        return "Delete user";
      default:
        return "";
    }
  };

  const descriptionForAction = (action: DangerousAction) => {
    switch (action) {
      case "suspend":
        return "The user will be prevented from signing in until reactivated.";
      case "activate":
        return "The user will regain access to the platform.";
      case "reset-password":
        return "A password reset flow will be initiated for this user.";
      case "delete":
        return "This action is permanent and cannot be undone.";
      default:
        return "";
    }
  };

  const handleDangerousAction = (action: DangerousAction) => {
    setPendingAction(action);
    setOpen(true);
  };

  const confirmAction = () => {
    if (!pendingAction) return;

    startTransition(async () => {
      // TODO: Connect to real API endpoint
      await new Promise((resolve) => setTimeout(resolve, 800));
      setOpen(false);
      setPendingAction(null);
    });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-slate-500 hover:text-slate-700"
            aria-label={\Open actions for \\}
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-44">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem className="gap-2">
            <Eye className="h-4 w-4" />
            <span>View details</span>
          </DropdownMenuItem>

          <DropdownMenuItem className="gap-2">
            <Pencil className="h-4 w-4" />
            <span>Edit user</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="gap-2 text-amber-700 focus:text-amber-700"
            onSelect={(e) => {
              e.preventDefault();
              handleDangerousAction("suspend");
            }}
          >
            <ShieldOff className="h-4 w-4" />
            <span>Suspend user</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="gap-2 text-emerald-700 focus:text-emerald-700"
            onSelect={(e) => {
              e.preventDefault();
              handleDangerousAction("activate");
            }}
          >
            <ShieldCheck className="h-4 w-4" />
            <span>Activate user</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="gap-2 text-sky-700 focus:text-sky-700"
            onSelect={(e) => {
              e.preventDefault();
              handleDangerousAction("reset-password");
            }}
          >
            <KeyRound className="h-4 w-4" />
            <span>Reset password</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="gap-2 text-rose-700 focus:text-rose-700"
            onSelect={(e) => {
              e.preventDefault();
              handleDangerousAction("delete");
            }}
          >
            <Trash2 className="h-4 w-4" />
            <span>Delete user</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>
              {pendingAction ? labelForAction(pendingAction) : ""}
            </DialogTitle>
            <DialogDescription>
              {pendingAction ? descriptionForAction(pendingAction) : ""}
            </DialogDescription>
          </DialogHeader>

          <div className="rounded-md bg-slate-50 px-3 py-2 text-xs text-slate-600">
            <p className="font-medium text-slate-700">
              {user.name ?? user.email}
            </p>
            <p>{user.email}</p>
          </div>

          <DialogFooter className="mt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>

            <Button
              size="sm"
              className="bg-rose-600 text-white hover:bg-rose-700"
              onClick={confirmAction}
              disabled={isPending}
            >
              {isPending ? "Processing..." : "Confirm"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}


