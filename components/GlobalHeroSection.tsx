"use client";

import React from "react";

export default function GlobalHeroSection() {
  return (
    <section className="relative w-full mb-10">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-indigo-500 opacity-90 rounded-xl" />

      <div className="relative p-10 text-white text-center">
        <h1 className="text-4xl font-bold">Explore Global Education</h1>
        <p className="text-indigo-100 text-sm mt-3 max-w-2xl mx-auto">
          Discover institutions, programs, and opportunities across the world — powered by Afribot AI.
        </p>
      </div>
    </section>
  );
}
