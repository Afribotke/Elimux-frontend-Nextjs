"use client";

import React, { useState } from "react";

type AdminResetPasswordFormProps = {
  onSubmit: (email: string) => void;
};

export default function AdminResetPasswordForm({ onSubmit }: AdminResetPasswordFormProps) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit(email);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm p-6 border rounded-xl bg-white shadow-sm space-y-4"
    >
      <h2 className="text-xl font-semibold text-center">Reset Password</h2>

      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          className="p-2 border rounded-lg bg-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
      >
        Send Reset Link
      </button>
    </form>
  );
}
