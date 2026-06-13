"use client";

import { useState } from "react";

export const ThemeToggle = () => {
  const [dark, setDark] = useState(false);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
    >
      Toggle Theme ({dark ? "Dark" : "Light"})
    </button>
  );
};
