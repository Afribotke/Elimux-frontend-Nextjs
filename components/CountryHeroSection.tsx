"use client";

import React from "react";
import CountryFlag from "./CountryFlag";

type CountryHeroSectionProps = {
  code: string;
  name: string;
  region?: string;
  description?: string;
};

export default function CountryHeroSection({
  code,
  name,
  region,
  description
}: CountryHeroSectionProps) {
  return (
    <section className="relative w-full mb-8">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-indigo-400 opacity-90 rounded-xl" />

      {/* Content */}
      <div className="relative p-8 text-white flex flex-col md:flex-row items-center gap-6">
        <CountryFlag code={code} size={60} />

        <div>
          <h1 className="text-3xl font-bold">{name}</h1>
          {region && (
            <p className="text-sm text-indigo-100 mt-1">{region}</p>
          )}

          {description && (
            <p className="text-sm text-indigo-100 mt-3 max-w-2xl">
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

