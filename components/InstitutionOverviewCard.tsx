"use client";

import React from "react";

type InstitutionOverviewCardProps = {
  name: string;
  logoUrl?: string;
  city?: string;
  country?: string;
  type?: string; // university, college, tvet, etc.
  description?: string;
};

export default function InstitutionOverviewCard({
  name,
  logoUrl,
  city,
  country,
  type,
  description
}: InstitutionOverviewCardProps) {
  return (
    <div className="p-6 border rounded-xl bg-white shadow-sm flex items-start gap-5">
      {logoUrl ? (
        <img
          src={logoUrl}
          alt={name}
          className="w-16 h-16 rounded object-cover border"
        />
      ) : (
        <div className="w-16 h-16 rounded bg-gray-100 border flex items-center justify-center text-gray-400 text-sm">
          No Logo
        </div>
      )}

      <div className="flex-1">
        <h2 className="text-2xl font-bold">{name}</h2>

        <div className="flex gap-4 text-sm text-gray-600 mt-1">
          {type && <p>{type}</p>}
          {city && <p>{city}</p>}
          {country && <p>{country}</p>}
        </div>

        {description && (
          <p className="text-gray-700 text-sm mt-3 leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}



