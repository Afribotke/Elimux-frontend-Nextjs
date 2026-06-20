"use client";

import React from "react";
import CountryFlag from "./CountryFlag";

type CountryBadgeProps = {
  code: string;
  name: string;
  onClick?: () => void;
  selected?: boolean;
};

export default function CountryBadge({ code, name, onClick, selected }: CountryBadgeProps) {
  return (
    <button
      onClick={onClick}
      className={
        \lex items-center gap-2 px-3 py-1 border rounded-full text-sm transition
        \\
      }
    >
      <CountryFlag code={code} size={16} />
      <span>{name}</span>
    </button>
  );
}
