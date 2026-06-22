"use client";

import React from "react";
import { Button } from "@/components/ui/button";

export default function HeroSearch() {
  return (
    <form className="flex gap-2">
      <select className="border p-2 rounded">
        <option value="KE">Kenya</option>
        <option value="UG">Uganda</option>
        <option value="TZ">Tanzania</option>
        <option value="ZA">South Africa</option>
      </select>

      <Button type="submit">
        Search
      </Button>
    </form>
  );
}
