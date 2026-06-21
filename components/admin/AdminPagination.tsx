"use client";

import React from "react";

type AdminPaginationProps = {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
};

export default function AdminPagination({ page, totalPages, onChange }: AdminPaginationProps) {
  return (
    <div className="flex items-center gap-4 mt-6">
      <button
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        className="px-4 py-2 border rounded-lg disabled:opacity-40"
      >
        Previous
      </button>

      <p className="text-sm">
        Page {page} of {totalPages}
      </p>

      <button
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
        className="px-4 py-2 border rounded-lg disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
}



