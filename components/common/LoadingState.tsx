import React from 'react';

export function LoadingState({ label = "Loading..." }) {
  return <div className="py-10 text-center text-gray-500">{label}</div>;
}

