"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";

export function UsersHeader() {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-semibold">Users</h2>
      <Button>
        <UserPlus className="mr-2 h-4 w-4" />
        Add User
      </Button>
    </div>
  );
}
