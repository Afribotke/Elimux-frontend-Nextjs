"use client";

import React from "react";

export default function AdminTopbar() {
  return (
    <header className="w-full h-16 border-b bg-white flex items-center justify-between px-6">
      <h1 className="text-lg font-semibold">Admin Dashboard</h1>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">Admin</span>
        <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center">
          A
        </div>
      </div>
    </header>
  );
}



