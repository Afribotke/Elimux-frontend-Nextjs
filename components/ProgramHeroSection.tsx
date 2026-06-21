"use client";

import React from "react";

type ProgramHeroSectionProps = {
  name: string;
  level?: string;
  institutionName?: string;
  description?: string;
};

export default function ProgramHeroSection({
  name,
  level,
  institutionName,
  description
}: ProgramHeroSectionProps) {
  return (
    <section className="relative w-full mb-8">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-indigo-400 opacity-90 rounded-xl" />

      <div className="relative p-8 text-white">
        <h1 className="text-3xl font-bold">{name}</h1>

        <div className="flex gap-4 text-indigo-100 text-sm mt-1">
          {level && <p>{level}</p>}
          {institutionName && <p>{institutionName}</p>}
        </div>

        {description && (
          <p className="text-sm text-indigo-100 mt-3 max-w-2xl leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}



