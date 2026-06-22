"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Plus } from "lucide-react";

export function CoursesHeader() {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-semibold">Courses</h2>
      <Button>
        <Plus className="mr-2 h-4 w-4" />
        Add Course
      </Button>
    </div>
  );
}
