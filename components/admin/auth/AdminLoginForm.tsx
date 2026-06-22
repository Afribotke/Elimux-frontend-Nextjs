"use client";

import React, { useState } from "react";

type AdminLoginFormProps = {
  onSubmit: (email: string, password: string) => void;
};

export default function AdminLoginForm({ onSubmit }: AdminLoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm p-6 border rounded-xl bg-white shadow-sm space-y-4"
    >
      <h2 className="text-xl font-semibold text-center">Admin Login</h2>

      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          className="p-2 border rounded-lg bg-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">Password</label>
        <input
          type="password"
          className="p-2 border rounded-lg bg-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
      >
        Login
      </button>
    </form>
  );
}



