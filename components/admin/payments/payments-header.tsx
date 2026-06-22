"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export function PaymentsHeader() {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-semibold">Payments</h2>
      <Button>
        <Download className="mr-2 h-4 w-4" />
        Export
      </Button>
    </div>
  );
}
