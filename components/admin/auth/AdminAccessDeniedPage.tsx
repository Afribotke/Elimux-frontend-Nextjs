"use client";

import React from "react";
import Link from "next/link";

export default function AdminAccessDeniedPage() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-3xl font-bold mb-3">Access Denied</h1>
      <p className="text-gray-600 mb-6">
        You do not have permission to access this page.
      </p>

      <Link
        href="/admin/login"
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
      >
        Go to Login
      </Link>
    </div>
  );
}
