"use client";

import React from "react";
import CountryFlag from "./CountryFlag";

type CountryOverviewCardProps = {
  code: string;
  name: string;
  region?: string;
  totalInstitutions?: number;
  totalPrograms?: number;
};

export default function CountryOverviewCard({
  code,
  name,
  region,
  totalInstitutions,
  totalPrograms
}: CountryOverviewCardProps) {
  return (
    <div className="p-5 border rounded-xl bg-white shadow-sm flex items-center gap-4">
      <CountryFlag code={code} size={40} />

      <div className="flex-1">
        <h2 className="text-xl font-bold">{name}</h2>
        {region && <p className="text-sm text-gray-500">{region}</p>}

        <div className="flex gap-6 mt-3 text-sm">
          {typeof totalInstitutions === "number" && (
            <p className="text-gray-700">
              <span className="font-semibold">{totalInstitutions}</span> Institutions
            </p>
          )}

          {typeof totalPrograms === "number" && (
            <p className="text-gray-700">
              <span className="font-semibold">{totalPrograms}</span> Programs
            </p>
          )}
        </div>
      </div>
    </div>
  );
}



