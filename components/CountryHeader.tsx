"use client";

import React from "react";
import CountryFlag from "./CountryFlag";

type CountryHeaderProps = {
  code: string;
  name: string;
  region?: string;
};

export default function CountryHeader({ code, name, region }: CountryHeaderProps) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <CountryFlag code={code} size={36} />
      <div>
        <h1 className="text-2xl font-bold">{name}</h1>
        {region && (
          <p className="text-sm text-gray-500">{region}</p>
        )}
      </div>
    </div>
  );
}

