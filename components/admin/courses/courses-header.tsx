"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, Search, User, Filter, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CoursesHeaderProps {
  total: number;
  onSearchChange?: (value: string) => void;
}

export function CoursesHeader({ total, onSearchChange }: CoursesHeaderProps) {
  const [search, setSearch] = useState("");

  const handleSearchChange = (value: string) => {
    setSearch(value);
    onSearchChange?.(value);
  };

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="space-y-1">
        <h1 className="text-xl font-semibold text-slate-900">Courses</h1>
        <p className="text-sm text-slate-500">
          Managing <span className="font-medium text-slate-700">{total}</span> academic courses.
        </p>
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-end">
        <div className="relative w-full md:w-72">
          <Search className="pointer-events-none absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search courses by name or code"
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
              <DropdownMenuItem>Active</DropdownMenuItem>
              <DropdownMenuItem>Draft</DropdownMenuItem>
              <DropdownMenuItem>Inactive</DropdownMenuItem>
              <DropdownMenuItem>Archived</DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuLabel>Level</DropdownMenuLabel>
              <DropdownMenuItem>Certificate</DropdownMenuItem>
              <DropdownMenuItem>Diploma</DropdownMenuItem>
              <DropdownMenuItem>Degree</DropdownMenuItem>
              <DropdownMenuItem>Masters</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button size="sm" className="h-9 gap-1 bg-sky-600 text-white hover:bg-sky-700">
            <Plus className="h-4 w-4" />
            <span>Add course</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
