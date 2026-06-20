"use client";

import React, { useState } from "react";

type CountryFlagProps = {
  code: string;
  size?: number;
  rounded?: boolean;
};

export default function CountryFlag({ code, size = 20, rounded = true }: CountryFlagProps) {
  const [error, setError] = useState(false);

  const getEmojiFlag = (countryCode: string) => {
    return countryCode
      .toUpperCase()
      .replace(/./g, char => String.fromCodePoint(127397 + char.charCodeAt(0)));
  };

  if (error) {
    return (
      <span style={{ fontSize: size * 0.9 }}>
        {getEmojiFlag(code)}
      </span>
    );
  }

  return (
    <img
      src={https://flagcdn.com/.svg}
      alt={${code.toUpperCase()} flag}
      height={size}
      width={size * 1.5}
      onError={() => setError(true)}
      style={{
        borderRadius: rounded ? 4 : 0,
        objectFit: "cover",
        display: "inline-block",
      }}
    />
  );
}
