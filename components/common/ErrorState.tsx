import React from 'react';

export function ErrorState({ message = "Something went wrong." }) {
  return <div className="py-10 text-center text-red-600">{message}</div>;
}

