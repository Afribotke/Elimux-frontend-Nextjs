"use client";

import React from "react";

type AdminToastProps = {
  message: string;
  type?: "success" | "error" | "info";
};

export default function AdminToast({ message, type = "info" }: AdminToastProps) {
  const colors = {
    success: "bg-green-600",
    error: "bg-red-600",
    info: "bg-indigo-600",
  };

  return (
    <div className={\ixed bottom-6 right-6 px-4 py-2 text-white rounded-lg shadow-lg \\}>
      {message}
    </div>
  );
}



