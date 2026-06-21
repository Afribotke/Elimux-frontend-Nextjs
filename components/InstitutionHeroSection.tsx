"use client";

import React from "react";

type InstitutionHeroSectionProps = {
  name: string;
  logoUrl?: string;
  type?: string;        // university, college, tvet, etc.
  city?: string;
  country?: string;
  description?: string;
};

export default function InstitutionHeroSection({
  name,
  logoUrl,
  type,
  city,
  country,
  description
}: InstitutionHeroSectionProps) {
  return (
    <section className="relative w-full mb-8">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-indigo-400 opacity-90 rounded-xl" />

      {/* Content */}
      <div className="relative p-8 text-white flex flex-col md:flex-row items-center gap-6">
        {logoUrl ? (
          <img
            src={logoUrl}
            alt={name}
            className="w-20 h-20 rounded-lg object-cover border-2 border-white shadow"
          />
        ) : (
          <div className="w-20 h-20 rounded-lg bg-white/20 flex items-center justify-center text-white text-sm border border-white">
            No Logo
          </div>
        )}

        <div>
          <h1 className="text-3xl font-bold">{name}</h1>

          <div className="flex gap-4 text-indigo-100 text-sm mt-1">
            {type && <p>{type}</p>}
            {city && <p>{city}</p>}
            {country && <p>{country}</p>}
          </div>

          {description && (
            <p className="text-sm text-indigo-100 mt-3 max-w-2xl leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

